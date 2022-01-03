const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_like', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "글번호",
      references: {
        model: 'tb_board',
        key: 'seq'
      }
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
    category: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "카테고리"
    },
    ins_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일자"
    }
  }, {
    sequelize,
    tableName: 'tb_like',
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
        name: "FK_tb_user_TO_tb_like",
        using: "BTREE",
        fields: [
          { name: "user_seq" },
        ]
      },
    ]
  });
};
