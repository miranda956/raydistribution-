module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define("Sales", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_code: {
            type: DataTypes.STRING,
            references: {
                model: 'Inventory',
                key: 'product_code'
            },
            allowNull: false
        },
        sale_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        amount_sold: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shop_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Shops',
                key: 'shop_id'
            },
            allowNull: false
        },
        agent_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Agents',
                key: 'agent_id'
            },
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Sales;
};
