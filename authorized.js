const jwt = require("jsonwebtoken");

// headers : {
//     "Authorization": "asdfasdfasdfasfsadfasfsd"
// }

const authorize = async (req, res, next) => {
  const token = req.headers.authorization; 
  if (token) {
    const decoded = await jwt.verify(token, "secretkey");
    req.userId = decoded.userId;
    next();
  } else {
    res.status(400).json({ error: "Unauthorized" });
  }
};

module.exports = authorize