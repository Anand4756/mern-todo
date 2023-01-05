require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const auth = require("./middleware/isAuthenticated")


const app = express()
app.use(cors())
app.use(express.json())



const mongocompass = "mongodb://localhost:27017/todoDB"

try {
    mongoose.connect(
        mongocompass,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected...")
    )
} catch (e) {
    console.log(e)
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,


})

const User = new mongoose.model("User", userSchema)

const todoSchema = new mongoose.Schema({
title:  String,
content: String,
user: String,
checked: {
    type:Boolean,
    default:false,
}
});

const Todo = new mongoose.model("Todo", todoSchema)


app.get('/',(req, res)=>{
    res.send('backend is working');
})


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })
    if (user) {
        return res.json("ACCOUNT ALREADY EXISTS")
    }

    const hashed_pass = await bcrypt.hash(password, 10)

    const newuser = new User({
        name,
        email,
        password: hashed_pass
    })
    await newuser.save()
    return res.json("REGISTRATION SUCCESSFUL")

    console.log(req.body.name)

    // res.status(400).json('OK! Status Code.' + name)
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email })

    if (!user) {
        return res.json("ACCOUNT DOES'NOT EXISTS")
    }

    const passmatch = await bcrypt.compare(password, user.password)
    if (!passmatch) {
        return res.json("wrong password")
    }

    const token = jwt.sign({ _id: user._id }, "randomtoken", {
        expiresIn: "24h",
    })
    return res.json({ token })


})


app.get('/result', auth.isAuthenticated, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);

})

app.get('/todo',auth.isAuthenticated, async (req, res)=>{
    const userid = req.user._id
   
    
let specifictodo = await Todo.find({
      user: { $in: userid },
    });
    
    res.json(specifictodo);
})

app.post("/todo", auth.isAuthenticated, async (req, res) => {
  const userid = req.user._id;
  const title = req.body.title;
  const  content = req.body.content;
  
const todo = new Todo({
  title,
  content,
  user: userid
})
todo.save(function(err){
  if(err) res.json(err)
  else console.log("successfully saved");
})

})

app.post('/todo/delete', auth.isAuthenticated, async(req, res)=>{
    const todoid = req.body.id;
    
   const todo = await Todo.findByIdAndDelete(todoid);

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoid}` });
    } else {
      res.status(200).json({
        message: `Todo with id: ${todoid} deleted.`,
        todo: todo,
      });
    }
  

});
app.put('/todo-update', async (req, res)=>{

    const todoid = req.body.todoid;
    const title = req.body.todotitle;
    const content = req.body.todocontent;
    
    const todo = await Todo.findByIdAndUpdate(todoid, req.body, { new: true, runValidators: true });

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        msg: `Todo with id: ${todoId} updated.`,
        todo: todo,
      });
    }
  
})


const port = 5000;

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})