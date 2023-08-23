const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('./model/users');
const bcrypt = require('bcryptjs');
const { userid } = require('./userid');
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
                return res.status(400).json({
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
                return res.status(400).json({
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
            return res.status(200).json({
                redirect: '/',
            });
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
            const { notice, title, } = req.body;
            const id = Math.floor(Math.random() * 100000);
            console.log({ notice, title });
            if (!token) {
                return res.status(401).json({ message: 'Токен отсутствует' });
            }

            // const tokenWithoutBearer = token.split(' ')[1];
            const newObjectToAdd = { notice, title, id };
            const decodedData = await jwt.verify(token, secret);
            const name = await decodedData.id;
            const users = await User.findById(name);
            users.nodes.push(newObjectToAdd);
            await users.save();
            return res.json(users);
        } catch (error) {
            console.error('Ошибка проверки токена:', error);

            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Токен истек' });
            }

            return res.status(401).json({ message: 'Токен недействителен' });
        }
    }
    async users(req, res) {
        try {
            
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async creatnotice(req, res) {
        
            try {
                const token = req.cookies.token;
        
                if (!token) {
                    return res.status(401).json({ message: 'Токен отсутствует' });
                }
        
                const decodedData = await jwt.verify(token, secret);
                const userId = decodedData.id;
                const user = await User.findById(userId);
                const notice = user.nodes;
        
                return res.json(notice);
            } catch (e) {
                console.log(e);
                
                return res.status(401).json({ message: 'Токен отсутствует' });
            }
    }
    async deletnotice(req, res) {
        try {
            const token = req.cookies.token;
            const nodeIdToRemove = req.body.id;
            console.log(nodeIdToRemove);
            if (!token) {
                return res.status(401).json({ message: 'Токен отсутствует' });
            }

            const decodedData = await jwt.verify(token, secret);
            const userId = decodedData.id;
            const user = await User.findById(userId);
            if (!user) {
                console.log('Пользователь не найден');
                return;
            }
            user.nodes = user.nodes.filter(
                (node) => node.id !== parseInt(nodeIdToRemove)
            );
            await user.save();

            // return notice;
        } catch (e) {
            console.log(e);
            return res.status(401).json({ message: 'Токен отсутствует' });
        }
    }
    // async changenodes(req, res) {
    //     try {
    //         const token = req.cookies.token;
    //         const { Changenot, id, Changetit } = req.body; 
    //         console.log({ Changenot, id, Changetit });
            
    //         res.status(200).json({ message: 'Данные успешно обновлены' });
    //     } catch (e) {
    //         console.log(e);
    //         res.status(400).json({ message: 'Ошибка при обновлении данных' });
    //     }
    // }
    async changenodes(req, res) {
        try {
            const token = req.cookies.token;
            const { Changenot, id, Changetit } = req.body; 
            if (!token) {
                return res.status(401).json({ message: 'Токен отсутствует' });
            }
            const decodedData = await jwt.verify(token, secret);
            const userId = decodedData.id;
            const user = await User.findById(userId);
            if (!user) {
                console.log('Пользователь не найден');
                return;
            }
            const users = user.nodes
           const arr = users.map((node) => {
                if (node.id == parseInt(id)) {
                    node.notice = Changenot;
                    node.title = Changetit;
                   
                }
                return node;
            });

          user.nodes=arr
          user.markModified('nodes');
          console.log(user.nodes)
           await user.save();
            
   
            res.status(200).json({ message: 'Данные успешно обновлены' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Ошибка при обновлении данных' });
        }
    }
}

module.exports = new authController();
