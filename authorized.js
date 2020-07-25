const jwt = require("jsonwebtoken");

// headers : {
//     "Authorization": "asdfasdfasdfasfsadfasfsd"
// }

const authorize = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decoded = await jwt.verify(token, "secretkey");
      req.userId = decoded.userId;
      next();
    } else {
      res.status(400).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Unauthorized" });
  }
};

module.exports = authorize;
