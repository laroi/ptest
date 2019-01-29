/* global $ Handlebars define */
define(['text!./detailview.html'], (source) => {
    Handlebars.registerHelper('getQuestionTypeForAnswer', function (type, options, selection, id) {
        let html = '';
        if (options) {
            html = '<div class="options">';
            if (type === 'single_choice' || type === 'single_choice_conditional') {
                for (let i = 0; i < options.length; i += 1) {
                    html += '<div> <input type="radio" disabled="true" value="' + options[i] + '"';
                    if (options[i] === selection) {
                        html += ' checked ';
                    }
                    html += '>' + options[i] + '</div>';
                }
            }
            else if (type === 'number_range') {
                html += '<input type="range" name="volume" min="' + options.from + '" max="' + options.to + '">';
            }
            html += '</div>';
        } else {
            html += '<div class="options">' + selection + '</div>';
        }
        return html;
    });

    let template = Handlebars.compile(source);
    let answerDetailView = () => {
        let render = (answer) => {
            return new Promise((resolve, reject) => {
                console.log(answer);
                let html = template({ data: answer });
                $('#ans-pop').empty().html(html);
                $('#answer-pop').modal('show');
                resolve();
            });
        };
        return {
            render: render
        };
    };
    return answerDetailView();
});
