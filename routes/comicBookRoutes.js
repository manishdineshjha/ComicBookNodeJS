const express = require('express');
const router = express.Router();
const { createComicBook, updateComicBook, deleteComicBook, listComics, getComicDetails } = require('../controllers/comicBookController');

router.post('/comics', createComicBook);
router.put('/comics/:id', updateComicBook);
router.delete('/comics/:id', deleteComicBook);
router.get('/comics', listComics);
router.get('/comics/:id', getComicDetails);

module.exports = router;
