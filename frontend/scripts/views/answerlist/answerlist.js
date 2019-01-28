define(['../../collections/answerCollection', 'text!./answerlist.html' , './detailview/detailview'], (answers, source, ansDetailView) => {
    Handlebars.registerHelper('getDate', (date) => {
        date = new Date(date);
        return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    })
    let displayAnswer = (answers) => {
        return (e) => {
            let id = $(e.target).attr('id') ||  $(e.target).parent().attr('id');
            console.log(answers.filter(_ => _._id === id))
            ansDetailView.render(answers.filter(_ => _._id === id)[0]);

        }
    }
    let template = Handlebars.compile(source);
    let answerListView = () => {
        let render = () => {
            return new Promise((resolve, reject) => {
                answers.getAllAnswers()
                .then((answ) => {
                    let html = template({data: answ});
                    $('#content').empty().html(html);
                    $('#back').show();
                    $('#show-answers').hide();
                    $('.answer-ind-cont').on('click', displayAnswer(answ));
                    resolve();
                })
            })
        }
        return {
            render: render
        }
    }
    return answerListView()
})
