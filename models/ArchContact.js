module.exports = function (sequelize, DataTypes){
  var ArchContact = sequelize.define('ArchContact', {
// Setting up basics, need to add more info
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
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
    },
    apt_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  });

  ArchContact.associate = function(models) {
    ArchContact.belongsTo(models.Arch, {
      onDelete: 'CASCADE'
    });
  };

  return ArchContact;
};
