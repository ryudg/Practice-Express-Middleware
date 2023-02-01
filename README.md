# Practice-Express-Middleware

# Express Middleware

- 클라이언트에게 요청이 오고 그 요청에 따른 응답을 하는 중간 과정에서 목적에 맞게 처리를 하는 거쳐가는 함수
- req(요청) 객체, res(응답) 객체, 어플리케이션 요청-응답 사이클 도중 그 다음의 미들웨어 함수에 대한 엑세스 권한을 갖는 함수
- 다음 미들웨어 함수에 대한 엑세스는 next()를 이용해 다음 미들웨어로 현재 요청을 넘길수 있다. 즉, next()를 통해 미들웨어는 순차적으로 처리됨(순서가 중요함)

## Middleware 작성
- req, res, next를 가진 함수를 작성하면 해당 함수는 미들웨어로 동작할 수 있다.
  - req : HTTP 요청을 처리하는 객체
  - res : HTTP 응답을 처리하는 객체
  - next : 다음 미들웨어를 실행하는 함수

## Middleware 특징
- 모든 요청에 코드 실행
- 다음 미들웨어 호출(미들웨어가 순차적으로 실행)
- res, req 객체 변경 가능
- 요청-응답 주기를 종료(res methods)

## Middleware 유형
- 어플리케이션 레벨 Middleware
- 라우터 레벨 Middleware
- 오류 처리 Middleware
- 기본 제공 Middleware
- 써드파티 Middleware

# morgan
- 로그를 남겨주는 모듈

## Install
```bash
> npm install morgan
```

## Usage
```javascript
app.use(morgan(format, options));
```

# Middleware Password Demo
-  전체 경로 패스워드 확인
```javascript
app.use((req, res, next) => {
  const { password } = req.query;
  if (password === "admin") {
    next();
  }
  res.send("WRONG!!!");
}); 
```
- 특정 경로 패스워드 확인
```javascript
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "admin") {
    next();
  }
  res.send("WRONG!!!");
};

...

// verifyPassword 함수가 실행 후 나머지 실행
app.get("/secret", verifyPassword, (req, res) => {
  res.send("MY secret is ......");
});
```



