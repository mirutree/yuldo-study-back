const express = require("express");
const router = express.Router();

const db = require("../models");
const { QueryTypes } = require("sequelize");

// 전체 글 보기
router.get("/", async (req, res) => {
  try {
    // 로그인 중인지 확인한다.
    // 차단 된 사람인지 확인한다

    // 카테고리 확인한다.
    const { category } = req.query;

    let sql = "";
    if (!category) {
      // 전체 카테고리
      sql = "SELECT * FROM `tb_board` WHERE state = 'Y' ORDER BY ins_dttm DESC";
    } else {
      sql = "SELECT * FROM `tb_board` WHERE category = ? AND state = 'Y'";
    }
    // db에서 카테고리 글을 불러온다
    const results = await db.sequelize.query(sql, {
      replacements: [category],
      type: QueryTypes.SELECT,
    });
    // 클라이언트로 데이터를 넘겨준다.
    res.status(200).json({ result: 1, data: results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러 입니다" });
  }
});

// 글 하나 보기
router.get("/:board_seq", async (req, res) => {
  try {
    // 로그인 중인지 확인한다. -> 차단되어있으면 return
    // 글번호를 받아와서
    // 글번호에 맞는 글 1개를 가져온다.
    const { board_seq } = req.params;

    let sql = "SELECT * FROM `tb_board` WHERE seq = ? AND state = 'Y'";
    const results = await db.sequelize.query(sql, {
      replacements: [board_seq],
      type: QueryTypes.SELECT,
    });
    // 클라이언트로 데이터를 넘겨준다.
    res.status(200).json({ result: 1, data: results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러 입니다" });
  }
});

// 글쓰기
router.post("/", async (req, res) => {
  try {
    // 프론트에서 받은 데이터
    const { title, contents, writer, category } = req.body;
    // 데이터의 유효성을 확인한다.
    if (!title || !contents || !writer) {
      res
        .status(401)
        .json({ result: -1, data: null, err: "유효하지 않은 데이터 입니다." });
    }
    // 유저가 로그인 중인지 확인한다. -> 로그인 구현하면 확인
    const user_seq = 1;

    // 디비에 넣어준다.
    const [results, metadata] = await db.sequelize.query(
      "INSERT INTO `tb_board`(user_seq, category, title, contents, writer, ins_dttm) VALUES(?, ?, ?, ?, ?, now())",
      {
        replacements: [user_seq, category, title, contents, writer],
        type: QueryTypes.INSERT,
      }
    );
    res.status(200).json({ result: 1, data: results });
    // 디비의 리턴값을 확인한다
    // 상태코드 혹은 데이터를 클라이언트에 리턴한다.
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러 입니다" });
  }
});

// 수정
router.put("/:board_seq", async (req, res) => {
  try {
    // 로그인 중인지 확인한다 -> 차단된 유저면 return
    // 로그인 중인 유저의 번호를 가져온다
    let user_seq = 1;
    const { board_seq } = req.params;
    // 이 유저가 글쓴이인지 확인한다.
    let sql =
      "SELECT COUNT(*) as cnt FROM `tb_board` WHERE user_seq = ? AND seq = ?";
    const [results] = await db.sequelize.query(sql, {
      replacements: [user_seq, board_seq],
      type: QueryTypes.SELECT,
    });
    // 글쓴이가 맞으면 수정 아니면 return

    if (parseInt(results.cnt) > 0) {
      const { title, contents, category } = req.body;

      let sql =
        "UPDATE `tb_board` SET title = ?, contents = ?, category = ? WHERE seq = ?";
      const [results, metadata] = await db.sequelize.query(sql, {
        replacements: [title, contents, category, board_seq],
        type: QueryTypes.UPDATE,
      });

      res.status(200).json({ result: 1, data: results });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러 입니다" });
  }
});

// 글삭제
router.delete("/:board_seq", async (req, res) => {
  try {
    // 로그인 중인지 확인한다 -> 차단된 유저면 return
    // 로그인 중인 유저의 번호를 가져온다
    let user_seq = 1;
    const { board_seq } = req.params;
    // 이 유저가 글쓴이인지 확인한다.
    let sql =
      "SELECT COUNT(*) as cnt FROM `tb_board` WHERE user_seq = ? AND seq = ?";
    const [results] = await db.sequelize.query(sql, {
      replacements: [user_seq, board_seq],
      type: QueryTypes.SELECT,
    });
    // 글쓴이가 맞으면 삭제 아니면 return

    if (parseInt(results.cnt) > 0) {
      let sql = "UPDATE SET `tb_board` state = 'N' WHERE seq = ?";
      const result = await db.sequelize.query(sql, {
        replacements: [board_seq],
        type: QueryTypes.UPDATE,
      });

      res.status(200).json({ result: 1, data: result });
    } else {
      res.status(401).json({
        result: -1,
        data: null,
        err: "존재하지 않는 글 이거나 글쓴이가 아닙니다.",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러 입니다" });
  }
});

// 검색
router.get("/:type/:search", async (req, res) => {
  try {
    // 로그인 된 유저인지 확인한다 -> 차단된 유저면 return
    // 카테고리, search string 확인
    const { search, type } = req.params;
    let { category } = req.query;

    if (!search) {
      res
        .status(401)
        .json({ result: -1, data: null, err: "검색어를 입력 해주세요" });
    }
    // 타입이 없으면 제목 + 내용
    let sql = "";
    if (type === "title") {
      sql = `SELECT * FROM tb_board WHERE title LIKE :search AND state = 'Y'`;
    } else if (type === "contents") {
      sql = `SELECT * FROM tb_board WHERE contents LIKE :search AND state = 'Y'`;
    } else {
      // 제목 + 내용
      sql = `SELECT * FROM tb_board WHERE title LIKE :search OR contents LIKE :search AND state = 'Y'`;
    }

    if (category) {
      sql = sql + " AND category = :category";
    }

    sql = sql + " ORDER BY ins_dttm DESC";

    // 카테고리가 없으면 전체 카테고를 검색한다.
    const result = await db.sequelize.query(sql, {
      replacements: { search: "%" + search + "%", category },
      type: QueryTypes.SELECT,
    });

    if (result.length === 0) {
      res
        .status(200)
        .json({ result: -2, data: null, err: "검색 결과가 없습니다" });
    } else {
      res.status(200).json({ result: 1, data: result });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ result: -100, data: null, err: "서버 에러 입니다" });
  }
});

module.exports = router;
