


 
 /**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Роуты для аутентификации и авторизации
 */
  
  /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Авторизация пользователя
     *     tags: [Auth]
     *     requestBody:
     *       description: Данные для авторизации пользователя
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: Имя пользователя
     *               password:
     *                 type: string
     *                 description: Пароль пользователя
     *             example:
     *               username: exampleUser
     *               password: examplePassword
     *     responses:
     *       200:
     *         description: Успешная авторизация
     *       401:
     *         description: Неверные учетные данные
     */
      /**
     * @swagger
     * /auth/registration:
     *   post:
     *     summary: Авторизация пользователя
     *     tags: [Auth]
     *     requestBody:
     *       description: Данные для авторизации пользователя
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: Имя пользователя
     *               password:
     *                 type: string
     *                 description: Пароль пользователя
     *             example:
     *               username: exampleUser
     *               password: examplePassword
     *     responses:
     *       200:
     *         description: Успешная авторизация
     *       401:
     *         description: Неверные учетные данные
     */
  /**
 * @swagger
 * tags:
 *   name: notice
 *   description: Роуты для заметок 
 */




  /**

/**
 * @swagger
 * /auth/notice:
 *   post:
 *     summary: Авторизація користувача
 *     tags: [notice]
 *     requestBody:
 *       description: Дані для авторизації користувача
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *           
 *               notice:
 *                 type: string
 *                 description: Ім'я користувача
 *               title:
 *                 type: string
 *                 description: Пароль користувача
 *           example:
 *       
 *             notice: exampleUser
 *             title: examplePassword
 *     responses:
 *       200:
 *         description: Успішне створення
 *       401:
 *         description: Невірні облікові дані
 */

   /**
 * @swagger
 * /auth/delete:
 *   post:
 *     summary: Удаление уведомления
 *     tags: [notice]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Данные для удаления уведомления
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Идентификатор уведомления для удаления
 *           example:
 *             id: 123456
 *     responses:
 *       200:
 *         description: Уведомление успешно удалено
 *       401:
 *         description: Доступ запрещен, требуется авторизация
 *       500:
 *         description: Ошибка на сервере
 */




/**
 * @swagger
 * /auth/change:
 *   post:
 *     summary: Изменение уведомления
 *     tags: [notice]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Данные для изменения уведомления
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Changenot:
 *                 type: string
 *                 description: Новое значение уведомления
 *               id:
 *                 type: string
 *                 description: Идентификатор уведомления для изменения
 *               Changetit:
 *                 type: string
 *                 description: Новое значение заголовка уведомления
 *           example:
 *             Changenot: Новое уведомление
 *             id: 123456
 *             Changetit: Новый заголовок
 *     responses:
 *       200:
 *         description: Уведомление успешно изменено
 *       401:
 *         description: Доступ запрещен, требуется авторизация
 *       500:
 *         description: Ошибка на сервере
 */
    
