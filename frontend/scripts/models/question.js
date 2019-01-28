define([], () => {
    let question = function (inQuestion) {
        let questObject = {};
        questObject._id = inQuestion._id;
        if (inQuestion.question) {
            questObject.question = inQuestion.question;
        }
        if (inQuestion.category) {
            questObject.category = inQuestion.category;
        }
        if (inQuestion.question_type) {
            questObject.question_type = inQuestion.question_type;
        }
        return questObject;
    }
    return question;
})
