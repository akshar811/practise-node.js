const { Router } = require("express");
const user = require("./schema");
const jwt = require("jsonwebtoken");
const { isAuth } = require("./auth");

const userRouter = Router();


userRouter.get("/", async (req, res) => {
  let data = await user.find();
  res.send(data);
});

userRouter.post("/create", async (req, res) => {
  let data = await user.create(req.body);
  res.send(data);
});

userRouter.patch("/update/:id", async (req, res) => {
  let { id } = req.params;
  let data = await user.findByIdAndUpdate(id, req.body);
  res.send(data);
});

userRouter.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  let data = await user.findByIdAndDelete(id);
  res.send(data);
});

userRouter.get("/signup", (req, res) => {
  res.render("signup");
});

userRouter.post("/signup", async (req, res) => {
  const { email } = req.body;
  const users = await user.findOne({ email: email });
  if (users != null) {
    console.log("MILLL GYA");
    return res.json({ msg: "Email ID already exists" });
  }

  let data = await user.create(req.body);
  res.send(data);
  console.log("kharab",data);
});

userRouter.get("/login", (req, res) => {
  res.render("login");
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let users = await user.findOne({ email: email });
  console.log("user mil gya",users);
  if (!users) {
    return res.send({USER:"user not found"});
  } else if (users.password != password) {
    return res.send({USER:"password not match"});
  }

  res.cookie("id", users.id);
  res.send("user successfully logged in");
});

userRouter.get("/product", isAuth, (req, res) => {
  res.render("product");
});

module.exports = userRouter;
