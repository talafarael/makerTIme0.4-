const express = require('express');
const path = require('path');
const authRouter = require('./authRouter');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookie=require('js-cookie')
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRouter);
app.use(express.static(path.join(__dirname, "ejs")))
const start = async () => {
    try {

        await mongoose.connect(
            'mongodb+srv://shine:shine1234@cluster0.o8mqsuq.mongodb.net/'
        );
        app.get('/', (req, res) => {
            res.render('index');
          });

        app.listen(PORT, () => {
            console.log(PORT);
         
        });
    } catch (e) {
        console.log(e);
    }
};
start();