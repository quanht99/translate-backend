const rp = require("request-promise");
const db = require("../model/index");

let list = [
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582,581",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582,581,585",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582,581,585,588",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582,581,585,588,587",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582,581,585,588,587,583",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582,581,585,588,587,583,589",
    "https://stword.com/api/posts/325/question-grammars/2?question_ids=584,590,582,581,585,588,587,583,589,586"
]

async function crawl(url, id_test){
    try{
        let result = await rp({
            uri: url,
            method: "GET",
            json: true
        })
        console.log(result);
        result = result.data;
        let question = await db.Question.create({
            id_test: id_test,
            content: result.content,
            type: "check-box",
            correct_answer: result.answer
        })
        for(let e of result.content_extra){
            await db.Answer.create({
                id_answer: e.id,
                content: e.value,
                id_question: question.dataValues.id_question
            })
        }
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
}

async function loop(){
    for(let e of list){
        await crawl(e, 4);
    }
}

loop();