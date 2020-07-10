module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("Test", {
        content: {
            type: Sequelize.TEXT
        },
        id_test: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    Test.associate = (models) => {
        Test.hasMany(models.Question, {
            foreignKey: "id_test",
            sourceKey: "id_test"
        })
    };
    return Test;
};