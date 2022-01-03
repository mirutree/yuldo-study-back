const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_notice', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "공지사항번호"
    },
    category: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "카테고리"
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "제목"
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "내용"
    },
    hit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "조회수"
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "상태"
    },
    popup: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "팝업"
    },
    ins_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일자"
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
    tableName: 'tb_notice',
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
        name: "FK_tb_admin_TO_tb_notice",
        using: "BTREE",
        fields: [
          { name: "admin_seq" },
        ]
      },
    ]
  });
};
