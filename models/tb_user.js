const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_user', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "유저번호"
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "아이디"
    },
    nickname: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "닉네임"
    },
    pwd: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "비밀번호"
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "휴대폰"
    },
    level: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "레벨"
    },
    xp: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "경험치"
    },
    state: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "현재상태"
    },
    verify_yn: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "인증여부"
    },
    report: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "경고횟수"
    },
    sns_type: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "소셜가입"
    },
    sns_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "소셜키"
    },
    use_yn: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "탈퇴여부"
    },
    ins_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "가입일자"
    },
    upt_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "변경일자"
    },
    del_dttm: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "탈퇴일자"
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
    tableName: 'tb_user',
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
        name: "FK_tb_admin_TO_tb_user",
        using: "BTREE",
        fields: [
          { name: "admin_seq" },
        ]
      },
    ]
  });
};
