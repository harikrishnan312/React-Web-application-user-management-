const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require ('path')


mongoose.connect('mongodb://127.0.0.1:27017/WEB-App').then(() => { console.log('mongo Db connected'); })

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use(function (req, res, next) {
  res.header('Cache-Control', 'no-cache, no-store');
  next();
});

const userRoute = require('./routes/userRoute');
app.use('/',userRoute)

const adminRoute = require('./routes/adminRoute')
app.use('/',adminRoute)





app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});