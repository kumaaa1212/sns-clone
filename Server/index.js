const express = require('express');
const app = express();
const userRouter = require('./route/user');
const authRouter = require('./route/auth');
const postRouter = require('./route/post');
const uploadRouter = require('./route/upload');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log('DB connected');
}).catch((err)=>{
  console.log(err);
})
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// app.get('/users', (req, res) => {
//     res.send('Hello World!');
// });
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'public/img')));
// imaを見た時は自動でpublic/imgを見てくださいってこと
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/upload', uploadRouter);
app.listen(4000, () => console.log('Server running on port 4000'));


