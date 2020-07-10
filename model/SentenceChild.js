module.exports = (sequelize, Sequelize) => {
    const SentenceChild = sequelize.define("SentenceChild", {
        content: {
            type: Sequelize.TEXT
        },
        id_sentence_child: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        id_sentence: {
            type: Sequelize.INTEGER
        }
    });

    SentenceChild.associate = (models) => {
        SentenceChild.belongsTo(models.Sentence, {
            foreignKey: "id_sentence",
            targetKey: "id_sentence"
        })
    };
    return SentenceChild;
};