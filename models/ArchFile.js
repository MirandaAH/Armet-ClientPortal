module.exports = function(sequelize, DataTypes) {
  var ArchFile = sequelize.define('ArchFile', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  });
  ArchFile.associate = function(models){
    ArchFile.belongsTo(models.Contact);
  };
  return ArchFile;

};
