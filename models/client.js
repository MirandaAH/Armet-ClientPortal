module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
// Setting up basics, need to add more info
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1-160]
      }
    }
  });
  Client.associate = function (models){
    Client.belongsTo(models.Arch);
  };
  return Client;
}
