const db = require("../model/index");
const response = require("../utils/response");

async function getTopic(req, res){
    try{
        let topics = await db.Topic.findAll();
        return res.json(response.buildSuccess({data: {topics}}));
    }
    catch(e){
        console.error(e.message);
        res.json(response.buildFailure({reason: e.message}))
    }
}

async function getWordFromTopic(req, res){
    const {id_topic} = req.params;
    try{
        let words = await db.Word.findAll({
            where: {
                id_topic: id_topic
            }
        });
        return res.json(response.buildSuccess({data: {words}}));
    }
    catch(e){
        console.error(e.message);
        res.json(response.buildFailure({reason: e.message}))
    }
}

module.exports = {
    getTopic,
    getWordFromTopic
}