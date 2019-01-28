define(['../collections/questionCollection', '../collections/answerCollection', 'text!./landing.html', 'text!./question.html'], (questions, answer, source, indQuestionSource) => {
    Handlebars.registerHelper('getQuestionType', function(type, id) {
        let html = '<div class="options">';
        if (type.type === 'single_choice' || type.type === 'single_choice_conditional') {
            for (let i = 0; i < type.options.length; i+=1) {
                html += ' <div> <input type="radio" name="' + id + '" value="' + type.options[i] + '">' + type.options[i] + '</div>';
            }
        }
        else if (type.type=== 'number_range') {
            html += '<input type="range" name="volume" min="' + type.range.from + '" max="' + type.range.to + '">'
        }
        html += "</div>"
        return html;
    });
    let funcs =  {
            exactEquals : (selection, val) => {
            console.log(selection, val)
            return selection === val;
        }
    };    
    let template = Handlebars.compile(source);
    let indQuestionTemplate = Handlebars.compile(indQuestionSource);
    let landingView = () => {
        let render = () => {
            let allAnswers = [];
            questions.getAllQuestions()
            .then((quests) => {
                let submitHandler = () => {
                    console.log(allAnswers);
                    //answer.submitAnswer(allAnswers)
                }
                let html = template({data: quests});
                $('#content').empty().html(html);
                $('input[type="radio"]').off('click').on('click', function(e) {
                    let selection = $(this).val();
                    let id = $(e.target).parent().parent().prev().attr('id');
                    //let q = questions.getQuestionById(id)
                    let category = $(e.target).parent().parent().parent().parent().attr('id');
                    let arr = quests[category]
                    let q = arr[arr.findIndex(_ => _._id === id)]
                    let index = allAnswers.findIndex(_ => _.question === q.question);
                    if (index > -1) {
                         allAnswers[index].selection = selection;  
                    } else {
                        allAnswers.push({category: category, question: q.question, type: q.question_type, selection: selection});
                    }
                    if (q.question_type.type==='single_choice_conditional') {
                            let condition = q.question_type.condition;
                            let predicate = condition.predicate;
                            let func = Object.keys(predicate)[0];
                            let isChain = funcs[func](eval('`'+predicate[func][0]+'`'), predicate[func][1]);
                            if (isChain) {
                                $(e.target).parent().parent().after(indQuestionTemplate({data: condition.if_positive}))
                            } else if ($(e.target).parent().parent().next().hasClass('follow')) {
                                $(e.target).parent().parent().next().remove(); 
                                $(e.target).parent().parent().next().remove();  
                            }
                    }
                });
                $('#submit').on('click', submitHandler)
                //window.test = questions.getNextQuestion;
                //window.prev = questions.getPrevQuestion;
                //window.data = quests;
            })
        }
        return {
            render: render
        }
    }
    return landingView()
})
