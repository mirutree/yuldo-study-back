const express = require("express");
const router = express.Router();

// 회원가입
router.post("/", (req, res) => {
    res.send("회원가입");
});

// 로그인
router.post("/login", (req, res) => {
    res.send("로그인");
});

// 비밀번호 변경
router.post("/password", (req, res) => {
    res.send("비밀번호 변경");
});

// 휴대폰 인증
router.post("/phone", (req, res) => {
    res.send("휴대폰 인증");
});

// /user/:id 개인정보 확인
router.get("/:id", (req, res) => {
    res.send("개인정보 확인");
});

module.exports = router;