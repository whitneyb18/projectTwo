module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Favorites;
};
