const express = require("express");
const router = express.Router();


// 전체 글 보기
router.get("/", (req, res) => {
    const board_data = [
        {
            category: "유머", 
            title: "매드 댄티스트가 설명해주는 이 닦는 법", 
            date: "2021-12-26", 
            like : 52,
            comment_count: 12
        },
        {
            category: "이슈", 
            title: "[펌] 가격이 아무리 올라도 프리미엄을 쓸수밖에 없게 만든 넷플릭스", 
            date: "2021-12-26", 
            like : 23,
            comment_count: 51
        },
        {
            category: "공포/오컬트", 
            title: "무시무시무시무시무시한이야기", 
            date: "2021-12-05", 
            like : 100,
            comment_count: 2
        },
        {
            category: "정보", 
            title: "와 정말 알고 싶던 정보였어요", 
            date: "2021-11-28", 
            like : 100,
            comment_count: 160
        },
    ];
    res.status(200).json(board_data);
});

// 글 하나 보기
router.get("/:id", (req, res) => {
    res.send("글 하나 보기");
});

// 글쓰기
router.post("/", (req, res) => {
    res.send("글쓰기");
});

// 글 수정
router.put("/:id", (req, res) => {
    res.send("글 수정");
});

// 글 삭제
router.delete("/:id", (req, res) => {
    res.send("글 삭제");
});

// 게시글 검색
router.get("/search/:search", (req, res) => {
    res.send("게시글 검색");
});

module.exports = router;