const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbMysql = require("../model/index");

function connectToDb(){
    const dbPath = path.resolve(__dirname, 'databases/grammar.db')
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbPath, (e) => {
            if(e){
                reject(e.message)
            }
            resolve(db);
        });
    })
}

function getAll(db, query, params){
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
              reject(err.message)
            }
            resolve(rows);
          });
    })
}

async function crawl(){
    try{
        let db = await connectToDb();
        let query = "select * from sentence;";
        let result = await getAll(db, query, []);
        for(let e of result){
            let sentence = await dbMysql.Sentence.create({
                content: e.content,
                name: e.name,
                bonus: e.bonus,
                has_child: e.have_child
            })
            if(e.have_child){
                query = "select * from sentence_child where sentence_id = ?";
                let sentence_child = await getAll(db, query, [e._id]);
                for(let child of sentence_child){
                    await dbMysql.SentenceChild.create({
                        id_sentence: sentence.dataValues.id_sentence,
                        content: child.content,
                        name: child.name
                    })
                }
            }
        }
        db.close();
        process.exit(0);
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
}


crawl();