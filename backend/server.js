require('dotenv').config();
const express = require('express');
const mongooes = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');


const  app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
}));

// Connect to MongoDB
const URL = process.env.MONGODB_URI;
mongooes.connect(URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB Connected');
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started');
}
);