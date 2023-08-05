const Router=require('express')
const router=new Router
const {check}=require('express-validator')
const controller=require('./authController')
const authMiddleware=require('./userid')
const middaleware=require('./middaleware/authMiddleware')
router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
],controller.registration)
router.post('/login', controller.login)
router.get('/users',middaleware, controller.getUsers)
router.post('/notice', controller.notice)


module.exports = router