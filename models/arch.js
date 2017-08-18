module.exports = function (sequelize, DataTypes){
  var Arch = sequelize.define('Arch', {
// Setting up basics, need to add more info
    arch_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1-160]
      }
    }
  });
  Arch.associate = function(models){
    Arch.hasMany(models.Client);
  };
  return Arch;
}
