const router = require('express').Router();
const {
  getUsers, getMe, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
