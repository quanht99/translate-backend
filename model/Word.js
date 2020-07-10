module.exports = (sequelize, Sequelize) => {
    const Word = sequelize.define("Word", {
        content: {
            type: Sequelize.STRING
        },
        pronunciation_us: {
            type: Sequelize.STRING
        },
        pronunciation_uk: {
            type: Sequelize.STRING
        },
        mean: {
            type: Sequelize.STRING
        },
        word_examples: {
            type: Sequelize.TEXT
        },
        id_topic: {
            type: Sequelize.INTEGER
        }
    });

    Word.associate = (models) => {
        Word.belongsTo(models.Topic, {
            foreignKey: "id_topic",
            targetKey: "id_topic"
        })
    };
    return Word;
};