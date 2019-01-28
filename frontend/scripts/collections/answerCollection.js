
define(['../controllers/requestController', '../models/answer'], (request, Answer) => {
    let answers = () => {
        let getAllAnswers = () => {
            return new Promise((resolve, reject) => {
                let allAnswers = [];
                request.get('/api/v1/answers')
                    .then((data) => {
                        data.map((datum) => {
                            let ans = datum.answers.map(_ => new Answer(_))
                            allAnswers.push({_id : datum._id, answer: ans, createdAt: datum.createdAt});
                        });
                        resolve(allAnswers);
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        };
        submitAnswer = (answers) => {
            answers = answers.map(_ => new Answer(_))
            return request.post('/api/v1/answers', {answers:answers})
        };
        return {
           submitAnswer:submitAnswer,
           getAllAnswers: getAllAnswers
        };
    }
    return answers();
})
