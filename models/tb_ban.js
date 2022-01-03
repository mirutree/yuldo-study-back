const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_ban', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "제재번호"
    },
    category: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "카테고리"
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "메모"
    },
    expire_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "만료일"
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "상태"
    },
    user_seq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "유저번호",
      references: {
        model: 'tb_user',
        key: 'seq'
      }
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
    tableName: 'tb_ban',
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
        name: "FK_tb_user_TO_tb_ban",
        using: "BTREE",
        fields: [
          { name: "user_seq" },
        ]
      },
      {
        name: "FK_tb_admin_TO_tb_ban",
        using: "BTREE",
        fields: [
          { name: "admin_seq" },
        ]
      },
    ]
  });
};
