const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('./model/users');
const bcrypt = require('bcryptjs');
const {userid}=require('./userid')
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
    const playold = {
        id,
    };
    return jwt.sign(playold, secret, { expiresIn: '24h' });
};

class authController {
    async registration(req, res) {
        try {
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Ошибка при регистрации', errors });
            }
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res
                    .status(400)
                    .json({
                        message: 'Пользователь с таким именем уже существует',
                    });
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ username, password: hashPassword });
            await user.save();
            return res.json({
                message: 'Пользователь успешно зарегистрирован',
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res
                    .status(400)
                    .json({
                        message: 'Пользователь с таким именем не существует ',
                    });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res
                    .status(400)
                    .json({ message: `Введен неверный пароль` });
            }
            const token = generateAccessToken(user._id, user.roles);
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 86400 * 1000,
            });
            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async getUsers(req, res) {
        try {
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async notice(req, res) {
        try {
            const token = req.cookies.token;
             const {notice,title} =req.body
             console.log({notice,title})
            if (!token) {
              return res.status(401).json({ message: 'Токен отсутствует' });
            }
        
            // const tokenWithoutBearer = token.split(' ')[1]; 
           const  newObjectToAdd={notice,title}
            const decodedData =await  jwt.verify(token, secret);
           const name =await decodedData.id
           const users=await User.findById(name)
           users.nodes.push(newObjectToAdd);
           await users.save();
           return res.json(users)
          } catch (error) {
            console.error('Ошибка проверки токена:', error);
        
            // Обработайте разные типы ошибок, например, истек срок действия токена или токен недействителен.
            if (error instanceof jwt.TokenExpiredError) {
              return res.status(401).json({ message: 'Токен истек' });
            }
        
            return res.status(401).json({ message: 'Токен недействителен' });
          }
    }
}

module.exports = new authController();
