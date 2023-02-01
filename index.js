const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requstTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I Love Dog");
  next();
});

// app.use((req, res, next) => {
//   const { password } = req.query;
//   if (password === "admin") {
//     next();
//   }
//   res.send("WRONG!!!");
// });  // 전체 경로 패스워드 확인

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "admin") {
    next();
  }
  res.send("WRONG!!!");
};

app.get("/", (req, res) => {
  console.log(`REQUEST DATE : ${req.requstTime}`);
  res.send("HOME PAGE");
});
app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE : ${req.requstTime}`);
  res.send("Woof Woof");
});

// verifyPassword 함수가 실행 후 나머지 실행
app.get("/secret", verifyPassword, (req, res) => {
  res.send("MY secret is ......");
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND");
});

app.listen(3000, () => {
  console.log("App is running on 3000");
});
