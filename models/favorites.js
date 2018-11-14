module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Favorites;
};
