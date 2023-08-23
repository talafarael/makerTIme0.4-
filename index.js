const express = require('express');
const path = require('path');
const authRouter = require('./authRouter');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const swaggerSpecs = require('./swaggerDOC');
const swaggerUi = require('swagger-ui-express');
const app = express();

const PORT = process.env.PORT || 2000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use(express.static(path.join(__dirname, 'ejs')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
const start = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://shine:shine1234@cluster0.o8mqsuq.mongodb.net/'
        );
        app.get('/index', (req, res) => {
            res.render('index');
        });
        app.get('/', async (req, res) => {
            res.render('notice.ejs');
        });
        app.listen(PORT, () => {
            console.log(PORT);
        });
    } catch (e) {
        console.log(e);
    }
};
start();
