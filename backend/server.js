const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get("/Auth",(req, res) => {
    const { username, password } = req.body;
   try {
    if (username === 'admin' && password === 'password') {
        res.status(200).json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Internal server error' });
    
   }
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});