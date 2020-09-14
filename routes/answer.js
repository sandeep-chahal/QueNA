const router = require("express").Router();
const AnswerController = require("../controllers/answer.js");
const authenticate = require("../middlewares/auth");

router.post("/answer/add/:question", authenticate, AnswerController.addAnswer);

module.exports = router;
