module.exports = (sequelize, DataTypes) => {
    const ShopAgents = sequelize.define("ShopAgents", {
        shop_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Shops',
                key: 'shop_id'
            },
            primaryKey: true
        },
        agent_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Agents',
                key: 'agent_id'
            },
            primaryKey: true
        },
        // Additional columns for business value
        assigned_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return ShopAgents;
};
