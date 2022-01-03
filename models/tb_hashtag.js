const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_hashtag', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "태그번호"
    },
    tag_contents: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "태그내용"
    }
  }, {
    sequelize,
    tableName: 'tb_hashtag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};
