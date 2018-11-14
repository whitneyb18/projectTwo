module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }   
    }
});


  Users.associate = function(models) {
    Users.belongsToMany(models.Restaurants, {
      as: "user_favorite",
      through: models.Favorites,
      foreignKey: "user_id"
    });

    Users.hasOne(models.Last_Search, {
      onDelete: "cascade"
    });
  };

  return Users;
};
