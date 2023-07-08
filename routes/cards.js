const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');
const { createCardValidation } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
