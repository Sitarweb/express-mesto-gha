const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');
const {
  createCardValidation, deleteCardValidation, putLikeValidation, deleteLikeValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', deleteCardValidation, deleteCard);
router.put('/:cardId/likes', putLikeValidation, putLike);
router.delete('/:cardId/likes', deleteLikeValidation, deleteLike);

module.exports = router;
