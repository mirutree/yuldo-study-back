const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_adminlog', {
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
    admin_seq: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "관리자번호",
      references: {
        model: 'tb_admin',
        key: 'seq'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_adminlog',
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
        name: "FK_tb_admin_TO_tb_adminlog",
        using: "BTREE",
        fields: [
          { name: "admin_seq" },
        ]
      },
    ]
  });
};
