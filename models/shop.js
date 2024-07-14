module.exports = (sequelize, DataTypes) => {
    const Shops = sequelize.define("Shops", {
        shop_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shop_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shop_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Shops.associate = function(models) {
        Shops.belongsToMany(models.Agents, {
            through: 'ShopAgents',
            foreignKey: 'shop_id'
        });
    };

    return Shops;
};
