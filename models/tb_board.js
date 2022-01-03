const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_board', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "글번호",
      references: {
        model: 'tb_board_tag',
        key: 'board_seq'
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
    category: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "카테고리"
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "글제목"
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "글내용"
    },
    writer: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "작성자"
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
    comments_cnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "댓글수"
    },
    hit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "조회수"
    },
    b_like: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "추천수"
    },
    b_dislike: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "비추수"
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "상태"
    },
    report_yn: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "신고여부"
    },
    blind_yn: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "제목 블라인드"
    },
    admin_seq: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "관리자번호",
      references: {
        model: 'tb_admin',
        key: 'seq'
      }
    },
    auto_yn: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "자동 블라인드"
    }
  }, {
    sequelize,
    tableName: 'tb_board',
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
        name: "FK_tb_user_TO_tb_board",
        using: "BTREE",
        fields: [
          { name: "user_seq" },
        ]
      },
      {
        name: "FK_tb_admin_TO_tb_board",
        using: "BTREE",
        fields: [
          { name: "admin_seq" },
        ]
      },
    ]
  });
};
