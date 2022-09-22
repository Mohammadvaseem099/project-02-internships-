const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller')
const bookcontroller = require('../controllers/bookcontroller')
const reviewcontroller=require('../controllers/reviewcontroller')
const authMid = require("../middleware/auth")
const userMid = require("../middleware/userMiddleware")
const bookMid = require("../middleware/bookMiddleware");
const bookmodel = require('../models/bookmodel');

router.get('/test-me', (req, res) => {
    res.send("this API run succesfully...")
})

router.use("/books",authMid.authenticationMid)

//API for USER
router.post('/register',userMid.createUserMid, usercontroller.createUser)
router.post('/login', usercontroller.userlogin)

//API for BOOKS
router.post('/books',bookMid.createBookMid, bookcontroller.createbook)
router.get("/books", bookcontroller.getBookByQueryParam)
router.get("/books/:bookId", bookcontroller.getBookById)
router.put("/books/:bookId",bookMid.updateBookMid, bookcontroller.updatebook)
router.delete("/books/:bookId", bookcontroller.deletebyId)

//API for REVIEW
router.post('/books/:bookId/review',reviewcontroller.createreview)
router.put('/books/:bookId/review/:reviewId',reviewcontroller.updatereview)
router.delete('/books/:bookId/review/:reviewId',reviewcontroller.deletereview)

//errorHandling for wrong address
router.all("/**", function (req, res) {
    res.status(400).send({
        status: false,
        msg: "The api you request is not available"
    })
})
module.exports = router