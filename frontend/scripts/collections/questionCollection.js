/* global define */
define(['../controllers/requestController', '../models/question'], (request, Question) => {
    let questions = () => {
        let getAllQuestions = () => {
            return new Promise((resolve, reject) => {
                let allQuestions = {};
                request.get('/api/v1/questions')
                    .then((data) => {
                        data.map((datum) => {
                            if (Array.isArray(allQuestions[datum.category]) && allQuestions[datum.category].length > 0) {
                                allQuestions[datum.category].push(new Question(datum));
                            } else {
                                allQuestions[datum.category] = [];
                                allQuestions[datum.category].push(new Question(datum));
                            }
                        });
                        resolve(allQuestions);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        };

        /* The following two functions were written out of confusion as I did not read the description completed and jumped to assumption. Travesal is not a requirement
        getNextQuestion = (curIndex, selection, allQs) => {
            if (curIndex === undefined) {
                return allQs[0];
            }
            if (!allQs[curIndex]) {
                console.error('Could not find item for ', curIndex, ', length of questions is ', allQs.length)
                return false;
            }
            let funcs =  {
                exactEquals : (selection, val) => {
                console.log(selection, val)
                    return selection === val;
                }
            }
            let currentItem = allQs[curIndex];
            if (currentItem.question_type.type === 'single_choice_conditional') {
                let condition = currentItem.question_type.condition;
                let predicate = condition.predicate;
                let func = Object.keys(predicate)[0];
                let isChain = funcs[func](eval('`'+predicate[func][0]+'`'), predicate[func][1]);
                if (isChain) {
                    return condition.if_positive;
                } else {
                    if (allQs.length > curIndex) {
                        return allQs[curIndex+1]
                    } else {
                        return false;
                    }
                }
            } else {
                if (allQs.length > curIndex) {
                    console.log(curIndex);
                    return allQs[curIndex+1]
                } else {
                    return false;
                }
            }
        }
        getPrevQuestion = (curIndex, curQuestion, allQs) => {
            if (!allQs[curIndex]) {
                console.error('Could not find item for ', curIndex, ', length of questions is ', allQs.length)
                return false;
            }
            let funcs =  {
                exactEquals : (selection, val) => {
                console.log(selection, val)
                    return selection === val;
                }
            }
            let currentItem = allQs[curIndex];
            if (currentItem.question_type.type === 'single_choice_conditional') {
                if (!curQuestion._id) {
                    return currentItem;
                }
                let selection = currentItem.selection;
                //let selection = 'very important';
                let condition = currentItem.question_type.condition;
                let predicate = condition.predicate;
                let func = Object.keys(predicate)[0];
                let isChain = funcs[func](eval('`'+predicate[func][0]+'`'), predicate[func][1]);
                if (isChain) {
                    return condition.if_positive;
                } else {
                    if (allQs.length > curIndex) {
                        return currentItem;
                    } else {
                        return false;
                    }
                }
            } else {
                if (curIndex > 0) {
                    console.log(curIndex);
                    return allQs[curIndex - 1]
                } else {
                    return false;
                }
            }
        }; */
        let getQuestionById = (id, allQs) => {
            return allQs[allQs.findIndex(_ => _._id === id)];
        };
        return {
            getAllQuestions: getAllQuestions,
            // getNextQuestion: getNextQuestion,
            // getPrevQuestion: getPrevQuestion,
            getQuestionById: getQuestionById
        };
    };
    return questions();
});
