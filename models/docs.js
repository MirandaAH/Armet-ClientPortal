module.exports = function (sequelize, DataTypes){
  var Docs = sequelize.define('Docs', {
// Setting up basics, need to add more info
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Docs.associate = function(models) {
    Docs.belongsTo(models.User);
  };

  return Docs;
};
