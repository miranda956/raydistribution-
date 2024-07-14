module.exports = (sequelize, DataTypes) => {
    const Agents = sequelize.define("Agents", {
        agent_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        agent_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        agent_contact: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        agent_contact2: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Agents.associate = function(models) {
        Agents.belongsToMany(models.Shops, {
            through: 'ShopAgents',
            foreignKey: 'agent_id'
        });
    };

    return Agents;
};
