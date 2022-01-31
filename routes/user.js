const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const { QueryTypes } = require("sequelize");

// 회원가입
router.post("/", async (req, res) => {
  try {
    // 클라이언트에서 넘어 온 값을 검사한다
    const { id, nickname, pwd } = req.body;
    // 아이디가 존재하는지 확인한다 -> 아이디가 존재하면 return
    let sql = "SELECT COUNT(*) as cnt FROM tb_user WHERE user_id = ?";
    const [results] = await db.sequelize.query(sql, {
      replacements: [id],
      type: QueryTypes.SELECT,
    });

    if (results.cnt > 0) {
      return res
        .status(401)
        .json({ result: -1, err: "이미 존재하는 아이디 입니다." });
    }

    // 비밀번호를 암호화 한다
    const hashed_pwd = await bcrypt.hash(pwd, 12);
    // DB 에 저장한다
    let sql2 = "INSERT INTO `tb_user`(user_id, nickname, pwd) VALUES(?, ?, ?)";
    const [results2] = await db.sequelize.query(sql2, {
      replacements: [id, nickname, hashed_pwd],
      type: QueryTypes.INSERT,
    });
    // 결과를 클라이언트로 전달한다
    res.status(200).json({ result: 1, data: results2 });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ result: -100, data: null, err: "서버 에러 입니다." });
  }
});

// 로그인
router.post("/login", (req, res) => {
  try {
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러입니다." });
  }
});

// 비밀번호 변경
router.post("/password", async (req, res) => {
  try {
    // 로그인 여부 확인 -> 차단 된 유저면 return
    let user_seq = 2;
    // 클라이언트에서 현재 비밀번호 받아오기
    const { pwd, new_pwd } = req.body;
    let sql = "SELECT pwd FROM tb_user WHERE seq = ?";
    const [results] = await db.sequelize.query(sql, {
      replacements: [user_seq],
      type: QueryTypes.SELECT,
    });

    // 현재 비밀번호 일치여부 확인
    const is_correct = await bcrypt.compare(pwd, results.pwd);
    if (is_correct) {
      // 새로운 비밀번호 해시
      const hashed_pwd = await bcrypt.hash(new_pwd, 12);
      let sql = "UPDATE tb_user SET pwd = ? WHERE seq = ?";
      const [results] = await db.sequelize.query(sql, {
        replacements: [hashed_pwd, user_seq],
        type: QueryTypes.UPDATE,
      });

      res.status(200).json({ result: 1, data: results });
    } else {
      res
        .status(401)
        .json({ result: -1, err: "현재 비밀번호가 일치하지 않습니다" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러입니다." });
  }
});

// 휴대폰 인증
router.post("/phone", (req, res) => {
  try {
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러입니다." });
  }
});

// 개인정보 확인
router.get("/:id", (req, res) => {
  try {
    //로그인 여부 확인, 차단된 유저일 경우 return
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러입니다." });
  }
});

module.exports = router;
