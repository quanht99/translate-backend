module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define("Topic", {
        content: {
            type: Sequelize.STRING
        },
        id_topic: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: Sequelize.TEXT
        }
    });

    Topic.associate = (models) => {
        Topic.hasMany(models.Word, {
            foreignKey: "id_topic",
            sourceKey: "id_topic"
        })
    };
    return Topic;
};