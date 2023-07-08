const router = require('express').Router();
const {
  getUsers, getMe, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const { getUserByIdValidation, updateUserValidation, updateAvatarValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUserByIdValidation, getUserById);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
