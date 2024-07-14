module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        UserId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique:true,
            autoIncrement: true
        },

        type:{

            type: DataTypes.STRING,
            allowNull: false
        },

        f_name: {
            type: DataTypes.STRING,
            
            allowNull: false
        },

        l_name: {
            type: DataTypes.STRING,
          
            allowNull: false
        },

        county: {
            type: DataTypes.STRING,
           
            allowNull: false
        },
        subCounty: {
            type: DataTypes.STRING,
       
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
  
            allowNull: false
        },

        gender: {
            type: DataTypes.STRING,
            
            allowNull: false
        },
        

        contact: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM("Active","Suspended","Pending"),
            
            allowNull: false
        },
        isloggedIn: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    Users.associate = function(models) {
        Users.hasMany(models.UserRoles, {
            foreignKey: 'UserId',
            allowNull: false
        });
        Users.hasOne(models.ServiceProviders, {
            foreignKey: 'UserId',
            allowNull: false
        });
        Users.hasOne(models.Customers, {
            foreignKey: 'UserId',
            allowNull: false
        });
        // Users.hasOne(models.Authentication, {
        //     foreignKey: 'UserID',
        //     allowNull: false
        // });
    };

    return Users;
};