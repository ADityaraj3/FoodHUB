const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

const salt= bcrypt.genSaltSync(10);
const secret= 'gv1g4v42h1g4v1jhgc1hg2c4';

mongoose.connect('mongodb+srv://FoodHub:FoodHubMongoPass@cluster0.ardlywk.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc= await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
            height:"120",
            weight:"50",
        });
        res.json(userDoc);
    }catch(e){
        console.log(e);
        res.status(400).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        //logged in
        jwt.sign({username, id:userDoc._id, height:userDoc.height, weight:userDoc.weight}, secret, {}, (err, token) =>{
            if(err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
                height:userDoc.height,
                weight:userDoc.weight,
            });
        });
    } else {
        res.status(400).json('wrong credentials');
    }
  });

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})

app.put('/update', async (req, res) => {
  // res.json(req);
  const { username, password, newHeight, newWeight } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { password: bcrypt.hashSync(password, salt), height: newHeight, weight: newWeight },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
    }

    else res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(4000);

