const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const db = require("./model/index");
const TopicController = require("./controllers/topic");
const GrammarController = require("./controllers/grammar");
const IrregularController = require("./controllers/irregular");
const TestController = require("./controllers/test");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use("/ping", (req, res) => {
    res.send("pong");
})

app.get("/topics", TopicController.getTopic);
app.get("/topics/:id_topic", TopicController.getWordFromTopic);


app.get("/list-grammar", GrammarController.getListGrammar);
app.get("/grammar", GrammarController.getContent);


app.get("/irregular", IrregularController.getIrregular);


app.get("/tests", TestController.getTests);
app.get("/tests/:id_test/questions", TestController.getQuestionFromTest);
db.sequelize.sync({
    force: false
})
    .then(() => {
        console.log("Connect db success.")
        app.listen(3000, () => {
            console.log("Server running on 3000");
        })
    })
    .catch(e => {
        console.error(e.message);
        process.exitCode(1);
    })