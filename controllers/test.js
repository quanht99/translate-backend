const db = require("../model/index");
const response = require("../utils/response");

async function getTests(req, res){
    try{
        let tests = await db.Test.findAll();
        return res.json(response.buildSuccess({data: {tests}}));
    }
    catch(e){
        console.error(e.message);
        return res.json(response.buildFailure({reason: e.message}))
    }
}

async function getQuestionFromTest(req, res){
    let {id_test} = req.params;
    try{
        let questions = await db.Question.findAll({
            where: {
                id_test: id_test
            },
            include: [
                {
                    model: db.Answer
                }
            ]
        })
        return res.json(response.buildSuccess({data: {questions}}))
    }
    catch(e){
        console.error(e.message);
        return res.json(response.buildFailure({reason: e.message}));
    }
}

module.exports = {
    getTests,
    getQuestionFromTest
}