const Answer = require("../models/answer");
const Question = require("../models/question");

module.exports.addAnswer = async (req, res, next) => {
	const forQuestion = req.params.question;
	const answer = req.body.answer;

	const response = await Question.updateOne(
		{ _id: forQuestion },
		{ $inc: { answers: 1 } }
	);
	if (response.nModified > 0)
		await Answer.create({
			forQuestion,
			body: answer,
			answeredBy: req.user._id,
		});
	else
		return res.json({
			error: true,
			errors: [{ msg: "Question Doesn't exist" }],
		});
	return res.json({ error: false });
};
