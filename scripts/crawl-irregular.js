const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbMysql = require("../model/index");

function connectToDb(){
    const dbPath = path.resolve(__dirname, 'databases/irregular.db')
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
        let query = "select * from irregular;";
        let result = await getAll(db, query, []);
        for(let e of result){
            await dbMysql.Irregular.create({
                verb: e.verb,
                V2: e.v2,
                V3: e.v3
            })
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