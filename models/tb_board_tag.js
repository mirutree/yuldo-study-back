const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_board_tag', {
    board_seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "글번호"
    },
    tag_seq: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "태그번호"
    }
  }, {
    sequelize,
    tableName: 'tb_board_tag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "board_seq" },
        ]
      },
    ]
  });
};
