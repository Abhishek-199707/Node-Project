const express = require('express');

const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
// const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes')

connectDB();
const app = express();
app.use(cors())
app.use(express.json());

 app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);

app.get('/',(req,res)=>{
  res.send('this is home page')
})

 app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
