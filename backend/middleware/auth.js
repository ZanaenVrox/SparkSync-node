import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  //console.log("authToken",req.headers);
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authToken"]|| req.headers["authtoken"];
   // console.log("authToken",token);
  if (!token) {
    return res.status(403).send("Un-Athunticated request");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(200).send("Un-Athunticated request");
  }
  return next();
};

export default verifyToken;
