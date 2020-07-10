module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("Question", {
        content: {
            type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.STRING
        },
        correct_answer: {
            type: Sequelize.STRING
        },
        id_question: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_test: {
            type: Sequelize.INTEGER
        }
    });

    Question.associate = (models) => {
        Question.hasMany(models.Answer, {
            foreignKey: "id_question",
            sourceKey: "id_question"
        })
        Question.belongsTo(models.Test, {
            foreignKey: "id_test",
            targetKey: "id_test"
        })
    };
    return Question;
};