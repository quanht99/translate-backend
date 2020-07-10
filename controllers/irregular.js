const db = require("../model/index");
const response = require("../utils/response");

async function getIrregular(req, res){
    try{
        let {word} = req.query;
        if(word === undefined){
            word = "";
        }
        let result = await db.Irregular.findAll({
            where: {
                verb: {
                    [db.Sequelize.Op.like]: `%${word}%`
                }
            },
            attributes: ['verb', 'V2', 'V3'],
            limit: 30
        })
        return res.json(response.buildSuccess({data: {result}}))
    }
    catch(e){
        console.error(e.message);
        return res.json(response.buildFailure({reason: e.message}))
    }
}

module.exports = {
    getIrregular
}