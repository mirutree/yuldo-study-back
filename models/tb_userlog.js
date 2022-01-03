const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_userlog', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "로그번호"
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "내용"
    },
    ins_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일자"
    },
    user_seq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "유저번호",
      references: {
        model: 'tb_user',
        key: 'seq'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_userlog',
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
      {
        name: "FK_tb_user_TO_tb_userlog",
        using: "BTREE",
        fields: [
          { name: "user_seq" },
        ]
      },
    ]
  });
};
