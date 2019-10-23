module.exports = {
  // 개발 환경을 포함한 기본 설정
  session: {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  },
  mongoDB: {
    url: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
