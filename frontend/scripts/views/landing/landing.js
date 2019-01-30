/* global $ Handlebars toastr define */
define(['../../collections/questionCollection', '../../collections/answerCollection', 'text!./landing.html', 'text!./question.html'], (questions, answer, source, indQuestionSource) => {
    // Helper function to get HTML for options
    Handlebars.registerHelper('getQuestionType', function (type, id) {
        let html = '<div class="options">';
        if (type.type === 'single_choice' || type.type === 'single_choice_conditional') {
            for (let i = 0; i < type.options.length; i += 1) {
                html += ' <div> <input type="radio" name="' + id + '" value="' + type.options[i] + '">' + type.options[i] + '</div>';
            }
        }
        else if (type.type === 'number_range') {
            const defaultValue = Math.floor((parseInt(type.range.to, 10) - parseInt(type.range.from, 10))/3)
            html += '<input type="range" value="' + defaultValue + '" name="volume" min="' + type.range.from + '" max="' + type.range.to + '"> <div class="input-val">' + defaultValue + '</div>';
        }
        html += '</div>';
        return html;
    });
    Handlebars.registerHelper('titlify', (val)=> {
        return val.replace(/_/gi, ' ');
    })
    // Helper function to match conditions
    let funcs = {
        exactEquals: (selection, val) => {
            return selection === val;
        }
    };
    let getGuid = () => {
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    };
    // Handle the click on options to create answer array
    let handleSelectionClick = (quests, allAnswers) => {
        return function (e) {
            let selection = $(this).val();
            let id,
                category;
            if (e.target.type === 'radio') {
                id = $(e.target).parent().parent().prev().attr('id');
                category = $(e.target).parent().parent().parent().parent().attr('id');
            } else if (e.target.type === 'range') {
                id = $(e.target).parent().prev().attr('id');
                category = $(e.target).parent().parent().parent().attr('id');
                $('.input-val').empty().html(selection);
            }
            let arr = quests[category];
            let q = arr[arr.findIndex(_ => _._id === id)];
            let index = allAnswers.findIndex(_ => _.question === q.question);
            if (index > -1) {
                allAnswers[index].selection = selection;
            } else {
                allAnswers.push({ category: category, question: q.question, type: q.question_type.type, options: q.question_type.options, selection: selection });
            }
            if (q.question_type.type === 'single_choice_conditional') {
                let condition = q.question_type.condition;
                let predicate = condition.predicate;
                let func = Object.keys(predicate)[0];
                // Normally I don't use evil, but the data looked like I should ?
                let isChain = funcs[func](eval('`' + predicate[func][0] + '`'), predicate[func][1]);
                // Single choice condition and condition is positive? we got more things to do
                if (isChain) {
                    condition.if_positive._id = getGuid();
                    arr.push(condition.if_positive);
                    $(e.target).parent().parent().after(indQuestionTemplate({ data: condition.if_positive }));
                    // Binding the same function for newly created element
                    $('input[type="range"]').off('input').on('input', handleSelectionClick(quests, allAnswers));
                } else if ($(e.target).parent().parent().next().hasClass('follow')) {
                    $(e.target).parent().parent().next().remove();
                    $(e.target).parent().parent().next().remove();
                }
            }
        };
    };
    let template = Handlebars.compile(source);
    let indQuestionTemplate = Handlebars.compile(indQuestionSource);
    let landingView = () => {
        let render = () => {
            return new Promise((resolve, reject) => {
                let allAnswers = [];
                questions.getAllQuestions()
                    .then((quests) => {
                        let submitHandler = () => {
                            answer.submitAnswer(allAnswers)
                                .then((response) => {
                                    toastr.success('Your answers are submitted !', 'Ptest')
                                })
                                .catch((e) => {
                                    toastr.error('There was some problem while submitting your answers', 'Ptest')
                                })
                        };
                        let html = template({ data: quests });
                        $('#content').empty().html(html);
                        $('#show-answers').show();
                        $('#back').hide();
                        $('input[type="radio"]').off('click').on('click', handleSelectionClick(quests, allAnswers));
                        $('#submit').on('click', submitHandler);
                        resolve();
                    });
            });
        };
        return {
            render: render
        };
    };
    return landingView();
});
