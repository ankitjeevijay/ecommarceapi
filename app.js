const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectdb = require('./db/connectdb')
const web = require('./routes/web')
const cors = require('cors')
const cloudinary = require('cloudinary');
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')




// file uploader
app.use(fileUpload({ useTempFiles: true }));
// get token
app.use(cookieParser())

app.use(cors())

app.use(express.json())

dotenv.config({
    path:'.env'
})

connectdb()
app.use('/api',web)










app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})