module.exports = (sequelize, Sequelize) => {
    const Sentence = sequelize.define("Sentence", {
        content: {
            type: Sequelize.TEXT
        },
        id_sentence: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        bonus: {
            type: Sequelize.STRING
        },
        has_child: {
            type: Sequelize.BOOLEAN
        }
    });

    Sentence.associate = (models) => {
        Sentence.hasMany(models.SentenceChild, {
            foreignKey: "id_sentence",
            sourceKey: "id_sentence"
        })
    };
    return Sentence;
};