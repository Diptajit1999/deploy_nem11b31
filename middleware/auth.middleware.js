const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.username = decoded.username;

        next();
      }else{
        res.status(200).send({"msg":"You are not authorised. verified"})
      }
    });
  }else{
    res.status(400).send({"msg":"You are not authorised. Token"})
  }
};

module.exports = {
  auth
};
