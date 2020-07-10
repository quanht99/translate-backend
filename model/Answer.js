module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("Answer", {
        content: {
            type: Sequelize.TEXT
        },
        id_answer: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        id_question: {
            type: Sequelize.INTEGER
        }
    });

    Answer.associate = (models) => {
        Answer.belongsTo(models.Question, {
            foreignKey: "id_question",
            targetKey: "id_question"
        })
    };
    return Answer;
};