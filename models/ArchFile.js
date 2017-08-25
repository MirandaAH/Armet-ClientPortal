module.exports = function(sequelize, DataTypes) {
  var ArchFile = sequelize.define('ArchFile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  ArchFile.associate = function(models){
    ArchFile.belongsTo(models.Contact);
  };
  return ArchFile;

};
