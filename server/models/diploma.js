'use strict';

module.exports = (sequelize, DataTypes) => {  
  var StudentDiplomas = sequelize.define('StudentDiplomas', {
    Serie: {
      type: DataTypes.STRING(11),
      allowNull: false,
      defaultValue: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        is: { 
          args: /(\W|^)[\w.\-]{0,2}\d{0,9}$/i,
          msg: 'Serial number verification error'
       },
      }
    },    
    StudName: {
      type:DataTypes.STRING(160),
      allowNull: false,
      defaultValue: false
    },
    Specialty: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: 'NULL'
    },
    Institution: {
      type:DataTypes.STRING(255),
      allowNull: false,
      defaultValue: false
    },    
    EndingYear: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: false
    },    
  });

  return StudentDiplomas;
};