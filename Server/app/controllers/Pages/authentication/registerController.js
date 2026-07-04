const{render}=require('ejs')
const Admin=require('../../../models/admin')
const bcrypt=require('bcryptjs')
const { sendLoginEmail } = require('../../../helper/emailVerify')
const fs=require('fs')
const path=require('path')
const createToken = require('../../../helper/AdminToken/CreateToken')

class RegisterController{
    // ============ Register view ================
    async register(req,res) {
        try {
            res.render('register',{
                title:'Register'
            })
        } catch (error) {
            console.log(error)
        }
    }
    // ============= create register==================
    async registerCreate(req,res){
        try{
            const {role,name,email,phone,password}=req.body
            const admin=new Admin({
                role,
                name,
                email,
                phone,
                password:bcrypt.hashSync(password,bcrypt.genSaltSync(10))
            })
            if(req.file){
                admin.image=req.file.path
            }
            await admin.save();
            // console.log('data',result);

            if(role=="admin"){
                return res.status(400).json({message:"This is Admin creadintial",data:admin})
            } else await sendLoginEmail(email, password,name);
           return  res.redirect('/')
            // return res.status(201).json({ message: "User created and email sent",data:admin });           
        
            
            
        }catch(err){
            console.log(err);            
            res.redirect('/')
        }
    }
    // =================== login view ========================
    async login(req,res) {
        try {
            res.render('login',{
                title:'Login'
            })
        } catch (error) {
            console.log(error)
        }
    }
    // ================= login create =====================
    async loginCreate(req, res) {
        try {
            // Get user input
            const { email, password } = req.body;

            // Validate user input
            if (!(email && password)) {
                console.log('All input is required');
               return  res.redirect('/login');
            }
            // Validate if user exist in our database
            const admin = await Admin.findOne({ email });

            if (admin && (await bcrypt.compare(password, admin.password))) {
                // Create token
                const tokendata = await createToken(
                    {
                        id: admin._id,
                        name: admin?.name,
                        email: admin?.email,
                    }
                )
                if (tokendata) {
                    res.cookie('adminToken', tokendata)
                    res.cookie('adminName', admin.name)
                    res.cookie('adminRole', admin.role)
                    res.cookie('adminImg', admin.image)
                    res.cookie('email', admin.email)
                    console.log("Login successfully")
                   return  res.redirect('/');
                } else {
                    console.log('login failed');
                
                }
            }
            console.log('login failed');
            return res.redirect('/login');
        } catch (err) {
            console.log(err)
        }
    }
     // ============= Log out ===============
     async logout(req, res) {
        try {
            res.clearCookie('adminToken')
            res.clearCookie('adminName')
            res.clearCookie('adminRole')
            res.clearCookie('eamil')
            return res.redirect('/login')
        } catch (err) {
            console.log(err)
        }
    }
    // =========== CheckAuth ================
    async CheckAuth(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }
    // =========== Top bar ==================
    async topbar(req,res) {
            try {
                res.render('topbar',{
                    title:req.cookies.adminName,
                    image:req.cookies.adminImg,
                })
            } catch (error) {
                console.log(error)
            }
        }

}
module.exports=new RegisterController()