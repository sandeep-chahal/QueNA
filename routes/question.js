const router = require("express").Router();
const QuestionController = require("../controllers/question.js");
const authenticate = require("../middlewares/auth");

router.post("/question/add", authenticate, QuestionController.addQuestion);
router.get("/question/get/:id", QuestionController.getQuestion);
router.get("/question/search/:title", QuestionController.searchQuestions);

module.exports = router;
