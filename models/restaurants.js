module.exports = function(sequelize, DataTypes) {
  var Restaurants = sequelize.define("Restaurants", {
    restaurant_name: DataTypes.STRING,
    restaurant_type: DataTypes.STRING,
    restaurant_latitude: DataTypes.STRING,
    restaurant_longitude: DataTypes.STRING,
    restaurant_place_id: DataTypes.INTEGER,
  });

  Restaurants.associate = function(models) {
    Restaurants.belongsTo(models.Users, {
      as: "restaurant_favorite",
      constrainst: false
    });

    Restaurants.belongsToMany(models.Users, {
      through: models.Favorites,
      foreignKey: "restaurant_id",
      onDelete: "cascade"
    });

    Restaurants.belongsToMany(models.Users, {
      through: models.Last_Search,
      foreignKey: "restaurant_id",
      onDelete: "cascade"
    });
  };

  return Restaurants;
};
