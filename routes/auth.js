const router=require('express').Router();
const{loggedIn,adminOnly}=require('../helpers/auth.middleware');
const userController=require('../controllers/user.controller');

//Register a new user
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */

router.post('/register',userController.register);

//Login
/**
 * @swagger
 * /api/users/login:
 *    post:
 *      tags:
 *          - User
 *      summary: User login.
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: User login.
 */
router.post('/login',userController.login);

//Find User Type
/**
 * @swagger
 * /api/users/type:
 *    get:
 *      tags:
 *          - User
 *      summary: Return user type.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *      responses:
 *        200:
 *          description: Return user type.
 */
router.get('/type',loggedIn,userController.getType);

// Auth user only
/**
 * @swagger
 * /api/users/authuseronly:
 *    get:
 *      tags:
 *          - User
 *      summary: Authorize a registered user.
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: Authorize a registered user.
 */
router.get('/authuseronly', loggedIn, userController.authuseronly);

// Admin user only
/**
 * @swagger
 * /api/users/adminonly:
 *    get:
 *      tags:
 *          - User
 *      summary: Authorize a user as admin user.
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description: Authorize a user as admin user.
 */
router.get('/adminonly', loggedIn, adminOnly, userController.adminonly);

module.exports=router;