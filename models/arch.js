module.exports = function (sequelize, DataTypes){
  var Arch = sequelize.define('Arch', {
// Setting up basics, need to add more info
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    addr_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    addr_street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  // Arch.associate = function(models) {
  // Arch.hasMany(models.Client, {
  //   onDelete: 'CASCADE'
  // });
  // };
  return Arch;
};
//email address, physical address, phone number
