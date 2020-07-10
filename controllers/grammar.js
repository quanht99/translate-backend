const db = require("../model/index");
const response = require("../utils/response");

async function getListGrammar(req, res){
    try{
        let listGrammar = await db.Sentence.findAll({
            attributes: ['name', 'bonus', 'has_child', 'id_sentence'],
            include: [
                {
                    model: db.SentenceChild,
                    attributes: ['id_sentence_child', 'name']
                }
            ]
        })
        return res.json(response.buildSuccess({data: {listGrammar}}))
    }
    catch(e){
        console.error(e.message);
        return res.json(response.buildFailure({reason: err.message}))
    }
}

async function getContent(req, res){
    try{
        let {id_sentence, id_sentence_child} = req.query;
        let grammar;
        if(id_sentence_child){
            grammar = await db.SentenceChild.findOne({
                where: {
                    id_sentence_child: id_sentence_child
                }
            })
        }else{
            grammar = await db.Sentence.findOne({
                where: {
                    id_sentence: id_sentence
                }
            })
        }
        return res.json(response.buildSuccess({data: {grammar}}));
    }
    catch(e){
        console.error(e.message);
        return res.json(response.buildFailure({reason: err.message}))
    }
}




module.exports = {
    getListGrammar,
    getContent
}