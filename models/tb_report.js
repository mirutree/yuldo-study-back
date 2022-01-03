const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_report', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "신고번호"
    },
    category: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "카테고리"
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "상태"
    },
    memo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "메모"
    },
    board_seq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "글번호",
      references: {
        model: 'tb_board',
        key: 'seq'
      }
    },
    comment_seq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "댓글번호",
      references: {
        model: 'tb_comments',
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
    tableName: 'tb_report',
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
        name: "FK_tb_comments_TO_tb_report",
        using: "BTREE",
        fields: [
          { name: "comment_seq" },
        ]
      },
      {
        name: "FK_tb_board_TO_tb_report",
        using: "BTREE",
        fields: [
          { name: "board_seq" },
        ]
      },
      {
        name: "FK_tb_admin_TO_tb_report",
        using: "BTREE",
        fields: [
          { name: "admin_seq" },
        ]
      },
    ]
  });
};
