module.exports = function(sequelize, DataTypes) {
  var archFile = sequelize.define('archFile', {
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
  return archFile;
};
