const { generateToken } = require('../helper/jwt');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

class AuthController {
    // ======== Register ==============
    async register(req, res) {
        const { name, email, password,phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user1 = new User({ name, email,phone, password: hashedPassword });
        if(req.file){
            user1.image=req.file.path
        }
        const user=await user1.save();
        // const token = generateToken(user);

        res.status(201).json({ data:user,message:"Registration successfully" });
    }
    // ============ Log in ===========
    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = generateToken(user);
        res.status(200).json({message:"Login successfully", data:user, token });
    }
    // ============ Profile ===========
    async Profile  (req, res) {
    try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
    }
    };
}

module.exports = new AuthController();