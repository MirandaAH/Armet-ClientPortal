module.exports = function(sequelize, DataTypes) {

  var Token = sequelize.define('Token', {
  // Setting up basics, need to add more info
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  return Token;

};
