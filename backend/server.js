const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const { DBconnection } = require('./database/db.js');
const Users = require('./models/User.js');
const jwt_secret = process.env.JWT_SECRET;
DBconnection();

const app = express();
app.use(express.json()); // parse body content in json


const PORT = process.env.PORT || 3000; // listning port of backend

//this middleware ensures the user is authenticated before accessing any route except the login and register routes
app.use(async (req, res, next) => {
    // console.log(typeof(req.path));

    if (req.path === '/login' || req.path === '/register') {
        next();
    } else {
        try {
            const token = req.headers.cookie.substring(6);
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            await jwt.verify(token, jwt_secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                // console.log((decoded));

                // req.user = decoded;
                next();

            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error or Unauthorized' });

        }
    }

});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //check user exist alredy or not
        const existingUser = await Users.findOne({ firstName, lastName, email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //ecrypt the password
        var hashedPassword = await bcrypt.hash(password, 10);
        //create new user
        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newUser.save();
        // // generate a token and send to user using jwt
        // const token=jwt.sign({email:email,firstName:firstName,lastName:lastName},jwt_secret,{expiresIn:'24h'});
        // res.cookie("token", token,{expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true});
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        //check user exist alredy or not
        const existingUser = await Users.findOne({ email }); // details of that user
        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        //compare password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // generate a token and send to user using jwt
        const token = jwt.sign({ email: email, firstName: existingUser.firstName, lastName: existingUser.lastName }, jwt_secret, { expiresIn: '24h' });
        res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
});
app.get('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the cookie
//   res.redirect('/');
   return res.status(200).json({ message: 'Logout successful' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});