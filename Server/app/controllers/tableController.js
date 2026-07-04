 
 class TableController{
    async table(req,res) {
        try {
            res.render('table',{
                title:'Table',
                title: req.cookies.adminName,
        role:req.cookies.adminRole,
        image:req.cookies.adminImg
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new TableController()