const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    var decode = jwt.verify(token, "akshar");
    next();
    console.log(decode);
  } else {
    res.send("login first");
  }
};
const isAuth = (req, res, next) => {
  if (req.cookies.id) {
    next();
  } else {
    res.status(401).redirect("/user/login");
  }
};

module.exports = { auth, isAuth };
