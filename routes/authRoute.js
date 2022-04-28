const {Router} = require('express');
const authController = require('../Controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/diwar', authController.diwar_get);
router.post('/diwar', authController.diwar_post);
router.get('/logout', authController.logout_get);

module.exports = router;