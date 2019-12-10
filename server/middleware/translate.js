const translate = require('@vitalets/google-translate-api');

function translateToIna(req, res, next){

    console.log('translateToIna');

    let content = req.body.content;
    let title = req.body.title;

    console.log('content => ',content);
    console.log('title => ',title);

    translate(content, {to: 'id'})
        .then(res => {
            let languageFrom = res.from.language.iso;

            if(languageFrom=="id"){
                next();
            } else {

                console.log('res.text => ',res.text);
                req.body.content = res.text;
                let tags= req.body.tags;
                tags += ",translated";
                req.body.tags = tags;
                next();
            }
        })
        .catch(next);
}

module.exports = translateToIna
