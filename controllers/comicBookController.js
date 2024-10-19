const ComicBook = require('../models/ComicBook');

const createComicBook = async (req, res) => {
    try {
        const comic = new ComicBook(req.body);
        await comic.save();
        res.status(201).json(comic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const updateComicBook = async (req, res) => {
    try {
        const comic = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json(comic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const deleteComicBook = async (req, res) => {
    try {
        const comic = await ComicBook.findByIdAndDelete(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json({ message: 'Comic deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const listComics = async (req, res) => {
    const { authorName, year, condition, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (authorName) filter.authorName = new RegExp(authorName, 'i');
    if (year) filter.yearOfPublication = year;
    if (condition) filter.condition = condition;

    try {
        const comics = await ComicBook.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json(comics);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const getComicDetails = async (req, res) => {
    try {
        const comic = await ComicBook.findById(req.params.id);
        if (!comic) return res.status(404).json({ message: 'Comic not found' });
        res.status(200).json(comic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createComicBook,
    updateComicBook,
    deleteComicBook,
    listComics,
    getComicDetails,
  };