const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  projectUrl: {
    type: DataTypes.STRING,
  },
  githubUrl: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'projects',
  timestamps: true,
});

Project.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Project, { foreignKey: 'userId' });

module.exports = Project;
