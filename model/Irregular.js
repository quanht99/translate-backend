module.exports = (sequelize, Sequelize) => {
    const Irregular = sequelize.define("Irregular", {
        verb: {
            type: Sequelize.STRING
        },
        V2: {
            type: Sequelize.STRING
        },
        V3: {
            type: Sequelize.STRING
        }
    });

    Irregular.associate = (models) => {
        
    };
    return Irregular;
};