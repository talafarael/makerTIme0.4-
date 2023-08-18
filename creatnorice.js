const jwt = require('jsonwebtoken');
const User = require('./model/users');


const { secret } = require('./config');


async function creatnotice(req, res) {
    try {
        const token = req.cookies.token;
       
        // if (!token) {
        //     return res.status(401).json({ message: 'Токен отсутствует' });
        // }

        // const decodedData = await jwt.verify(token, secret);
        // const userId = decodedData.id;
        // const user = await User.findById(userId);
        // const notice = user.nodes;
       
 return console.log(token)
        // return notice;
    } catch (e) {
        console.log(e);
        throw new Error('Error during notice retrieval');
    }
}
creatnotice()
module.exports =  creatnotice
