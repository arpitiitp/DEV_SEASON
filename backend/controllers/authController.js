const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt_secret = process.env.JWT_SECRET;

async function register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (await Users.findOne({ email })) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await new Users({ firstName, lastName, email, password: hashed }).save();
    res.status(201).json({ message: 'User registered successfully' });
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await Users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
        jwt_secret,
        { expiresIn: '1d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: 'Login successful' });
}

function logout(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
    });
    res.json({ message: 'Logout successful' });
}

async function getMe(req, res) {
    try {
        const user = await Users.findById(req.userId, 'firstName lastName email').lean();
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch {
        res.status(500).json({ error: 'Fetch failed' });
    }
}

async function forgetPassword(req, res) {
    try {
        const { email, firstName, lastName } = req.body;
       const user= await Users.findOne({email})
       if(!user){
        res.status(400).send({"error":"Invalid Email"})
       }
       if(user.firstName===firstName && user.lastName===lastName){
           
       }else{
        res.status(400).send({"error":"wrong FirstName or LastName"})
       }
       
        res.json(user);
    } catch (error) {
        res.status(501).json({ "error": error })
    }
}
module.exports = { register, login, logout, getMe, forgetPassword };