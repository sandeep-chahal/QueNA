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
module.exports.addLike = async (req, res, next) => {
	const id = req.params.id;

	await Answer.updateOne({ _id: id }, { $inc: { likes: 1 } });

	return res.json({ error: false });
};
