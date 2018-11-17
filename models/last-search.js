module.exports = function(sequelize, DataTypes) {
  var Last_Search = sequelize.define("Last_Search", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Last_Search;
};
