var DataTypes = require("sequelize").DataTypes;
var _tb_admin = require("./tb_admin");
var _tb_adminlog = require("./tb_adminlog");
var _tb_ban = require("./tb_ban");
var _tb_board = require("./tb_board");
var _tb_board_tag = require("./tb_board_tag");
var _tb_category = require("./tb_category");
var _tb_comments = require("./tb_comments");
var _tb_hashtag = require("./tb_hashtag");
var _tb_level = require("./tb_level");
var _tb_like = require("./tb_like");
var _tb_notice = require("./tb_notice");
var _tb_report = require("./tb_report");
var _tb_user = require("./tb_user");
var _tb_userlog = require("./tb_userlog");

function initModels(sequelize) {
  var tb_admin = _tb_admin(sequelize, DataTypes);
  var tb_adminlog = _tb_adminlog(sequelize, DataTypes);
  var tb_ban = _tb_ban(sequelize, DataTypes);
  var tb_board = _tb_board(sequelize, DataTypes);
  var tb_board_tag = _tb_board_tag(sequelize, DataTypes);
  var tb_category = _tb_category(sequelize, DataTypes);
  var tb_comments = _tb_comments(sequelize, DataTypes);
  var tb_hashtag = _tb_hashtag(sequelize, DataTypes);
  var tb_level = _tb_level(sequelize, DataTypes);
  var tb_like = _tb_like(sequelize, DataTypes);
  var tb_notice = _tb_notice(sequelize, DataTypes);
  var tb_report = _tb_report(sequelize, DataTypes);
  var tb_user = _tb_user(sequelize, DataTypes);
  var tb_userlog = _tb_userlog(sequelize, DataTypes);

  tb_adminlog.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_adminlog, { as: "tb_adminlogs", foreignKey: "admin_seq"});
  tb_ban.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_ban, { as: "tb_bans", foreignKey: "admin_seq"});
  tb_board.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_board, { as: "tb_boards", foreignKey: "admin_seq"});
  tb_comments.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_comments, { as: "tb_comments", foreignKey: "admin_seq"});
  tb_level.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_level, { as: "tb_levels", foreignKey: "admin_seq"});
  tb_notice.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_notice, { as: "tb_notices", foreignKey: "admin_seq"});
  tb_report.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_report, { as: "tb_reports", foreignKey: "admin_seq"});
  tb_user.belongsTo(tb_admin, { as: "admin_seq_tb_admin", foreignKey: "admin_seq"});
  tb_admin.hasMany(tb_user, { as: "tb_users", foreignKey: "admin_seq"});
  tb_comments.belongsTo(tb_board, { as: "board_seq_tb_board", foreignKey: "board_seq"});
  tb_board.hasMany(tb_comments, { as: "tb_comments", foreignKey: "board_seq"});
  tb_like.belongsTo(tb_board, { as: "seq_tb_board", foreignKey: "seq"});
  tb_board.hasOne(tb_like, { as: "tb_like", foreignKey: "seq"});
  tb_report.belongsTo(tb_board, { as: "board_seq_tb_board", foreignKey: "board_seq"});
  tb_board.hasMany(tb_report, { as: "tb_reports", foreignKey: "board_seq"});
  tb_board.belongsTo(tb_board_tag, { as: "seq_tb_board_tag", foreignKey: "seq"});
  tb_board_tag.hasOne(tb_board, { as: "tb_board", foreignKey: "seq"});
  tb_report.belongsTo(tb_comments, { as: "comment_seq_tb_comment", foreignKey: "comment_seq"});
  tb_comments.hasMany(tb_report, { as: "tb_reports", foreignKey: "comment_seq"});
  tb_ban.belongsTo(tb_user, { as: "user_seq_tb_user", foreignKey: "user_seq"});
  tb_user.hasMany(tb_ban, { as: "tb_bans", foreignKey: "user_seq"});
  tb_board.belongsTo(tb_user, { as: "user_seq_tb_user", foreignKey: "user_seq"});
  tb_user.hasMany(tb_board, { as: "tb_boards", foreignKey: "user_seq"});
  tb_comments.belongsTo(tb_user, { as: "user_seq_tb_user", foreignKey: "user_seq"});
  tb_user.hasMany(tb_comments, { as: "tb_comments", foreignKey: "user_seq"});
  tb_like.belongsTo(tb_user, { as: "user_seq_tb_user", foreignKey: "user_seq"});
  tb_user.hasMany(tb_like, { as: "tb_likes", foreignKey: "user_seq"});
  tb_userlog.belongsTo(tb_user, { as: "user_seq_tb_user", foreignKey: "user_seq"});
  tb_user.hasMany(tb_userlog, { as: "tb_userlogs", foreignKey: "user_seq"});

  return {
    tb_admin,
    tb_adminlog,
    tb_ban,
    tb_board,
    tb_board_tag,
    tb_category,
    tb_comments,
    tb_hashtag,
    tb_level,
    tb_like,
    tb_notice,
    tb_report,
    tb_user,
    tb_userlog,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
