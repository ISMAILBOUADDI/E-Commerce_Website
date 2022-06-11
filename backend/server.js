require('dotenv').config();
const express = require('express');
const mongooes = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const  app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
}));

const UserRouter = require('./router/userRouter');
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
app.use('/user',UserRouter);
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.get('/',(req,res)=>{
    res.send('Hello World');
}
);


app.listen(PORT, () => {
    console.log(`Server started ${PORT}`);
}
);