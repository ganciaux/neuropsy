const express = require('express')
const article = require('../controllers/article')
const router = express.Router()

//article
router.get('/', article.getAllArticles)
router.get('/:id', article.getArticle)
router.post('/', article.createArticle)
router.put('/:id', article.updateArticle)
router.delete('/:id', article.deleteArticle)

module.exports = router
