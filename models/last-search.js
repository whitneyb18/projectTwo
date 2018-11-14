module.exports = function(sequelize, DataTypes) {
  var Last_Search = sequelize.define("Last_Search", {
    user_id: DataTypes.INTEGER,
    food_type_0: DataTypes.BOOLEAN,
    food_type_0_result_1: DataTypes.INTEGER,
    food_type_0_result_2: DataTypes.INTEGER,
    food_type_0_result_3: DataTypes.INTEGER,
    food_type_1: DataTypes.BOOLEAN,
    food_type_1_result_1: DataTypes.INTEGER,
    food_type_1_result_2: DataTypes.INTEGER,
    food_type_1_result_3: DataTypes.INTEGER,
    food_type_2: DataTypes.BOOLEAN,
    food_type_2_result_1: DataTypes.INTEGER,
    food_type_2_result_2: DataTypes.INTEGER,
    food_type_2_result_3: DataTypes.INTEGER,
    food_type_3: DataTypes.BOOLEAN,
    food_type_3_result_1: DataTypes.INTEGER,
    food_type_3_result_2: DataTypes.INTEGER,
    food_type_3_result_3: DataTypes.INTEGER,
    food_type_4: DataTypes.BOOLEAN,
    food_type_4_result_1: DataTypes.INTEGER,
    food_type_4_result_2: DataTypes.INTEGER,
    food_type_4_result_3: DataTypes.INTEGER,
    food_type_5: DataTypes.BOOLEAN,
    food_type_5_result_1: DataTypes.INTEGER,
    food_type_5_result_2: DataTypes.INTEGER,
    food_type_5_result_3: DataTypes.INTEGER,
    food_type_6: DataTypes.BOOLEAN,
    food_type_6_result_1: DataTypes.INTEGER,
    food_type_6_result_2: DataTypes.INTEGER,
    food_type_6_result_3: DataTypes.INTEGER,
    food_type_7: DataTypes.BOOLEAN,
    food_type_7_result_1: DataTypes.INTEGER,
    food_type_7_result_2: DataTypes.INTEGER,
    food_type_7_result_3: DataTypes.INTEGER,
    food_type_8: DataTypes.BOOLEAN,
    food_type_8_result_1: DataTypes.INTEGER,
    food_type_8_result_2: DataTypes.INTEGER,
    food_type_8_result_3: DataTypes.INTEGER,
    food_type_9: DataTypes.BOOLEAN,
    food_type_9_result_1: DataTypes.INTEGER,
    food_type_9_result_2: DataTypes.INTEGER,
    food_type_9_result_3: DataTypes.INTEGER
  });

  Last_Search.associate = function(models) {
    Last_Search.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Last_Search;
};
