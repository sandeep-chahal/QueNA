const Question = require("../models/question");

module.exports.addQuestion = async (req, res, next) => {
	const title = req.body.title;
	const category = req.body.category;

	const existingQuestion = await Question.findOne({ title: title });
	if (existingQuestion)
		return res.json({
			error: true,
			errors: [
				{ msg: "Question already been asked.", question: existingQuestion._id },
			],
		});

	const response = await Question.create({
		title: title,
		category,
		askedBy: req.user._id,
	});
	console.log(response);

	return res.json({
		error: false,
	});
};
module.exports.getQuestion = async (req, res, next) => {
	const id = req.params.id;

	const question = await Question.findById(id);

	if (!question)
		return res.json({ error: true, msg: "No question found with this id" });

	return res.json({
		error: false,
		question: question,
	});
};
module.exports.searchQuestions = async (req, res, next) => {
	const title = req.params.title;
	console.log(title);

	const questions = await Question.find({
		title: { $regex: title },
	})
		.limit(10)
		.populate("askedBy", "photo name");

	if (!questions || !questions.length)
		return res.json({ error: true, msg: "No questions found" });

	return res.json({
		error: false,
		questions: questions,
	});
};
