/* global define */
define([], () => {
    let answer = function (inAnswer) {
        let ansObject = {};
        if (inAnswer.question) {
            ansObject.question = inAnswer.question;
        }
        if (inAnswer.category) {
            ansObject.category = inAnswer.category;
        }
        if (inAnswer.type) {
            ansObject.type = inAnswer.type;
        }
        if (inAnswer.options) {
            ansObject.options = inAnswer.options;
        }
        ansObject.selection = inAnswer.selection;
        return ansObject;
    };
    return answer;
});
