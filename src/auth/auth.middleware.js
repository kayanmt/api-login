const jwt = require("jsonwebtoken");
const authServices = require("./auth.services");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ message: "The token was not informed" });
  }

  const split = authorization.split(" ");

  if (!split || split[0] !== "Bearer" || split.length !== 2) {
    return res.status(401).send({ message: "Invalid token" });
  }

  jwt.verify(split[1], process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await authServices.findUserById(decoded._id);

    if (!user || !user._id) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.userId = user._id;

    return next();
  });
};
