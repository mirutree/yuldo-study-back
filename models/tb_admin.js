const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_admin', {
    seq: {
      autoIncrement: true,
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
      comment: "관리자번호"
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "관리자이름"
    },
    pwd: {
      type: DataTypes.STRING(64),
      allowNull: true,
      comment: "비밀번호"
    },
    level: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "관리자레벨"
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
    last_login_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "최종로그인일시"
    },
    last_login_ip: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "최종로그인아이피"
    }
  }, {
    sequelize,
    tableName: 'tb_admin',
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
