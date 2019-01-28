requirejs.config({
        baseUrl: '.',
        paths: {
            text: 'libs/text'
        }
    });
requirejs(['./scripts/views/landing/landing','./scripts/views/answerlist/answerlist'], (landing, answerList) => {
    landing.render()
        .then(()=> {
            $('#show-answers').off('click').on('click', answerList.render);
            $("#back").off('click').on('click', landing.render)
        });
})
