'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  })
  return User
}
/*
module.exports = {
  users: [
    {
      id: '1',
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    },
  ],
}
*/
