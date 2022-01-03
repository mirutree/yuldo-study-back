const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_comments', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "댓글번호"
    },
    board_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "글번호",
      references: {
        model: 'tb_board',
        key: 'seq'
      }
    },
    user_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "유저번호",
      references: {
        model: 'tb_user',
        key: 'seq'
      }
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "댓글내용"
    },
    writer: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "댓글작성자"
    },
    index: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "댓글인덱스"
    },
    class: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "댓글계층"
    },
    group: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "댓글그룹"
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "댓글순서"
    },
    ins_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "작성일자"
    },
    upt_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정일자"
    },
    del_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "삭제일자"
    },
    c_like: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "추천수"
    },
    c_dislike: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "비추수"
    },
    report_yn: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "신고여부"
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "상태"
    },
    show_yn: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "공개여부"
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
    tableName: 'tb_comments',
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
        name: "FK_tb_board_TO_tb_comments",
        using: "BTREE",
        fields: [
          { name: "board_seq" },
        ]
      },
      {
        name: "FK_tb_user_TO_tb_comments",
        using: "BTREE",
        fields: [
          { name: "user_seq" },
        ]
      },
      {
        name: "FK_tb_admin_TO_tb_comments",
        using: "BTREE",
        fields: [
          { name: "admin_seq" },
        ]
      },
    ]
  });
};
