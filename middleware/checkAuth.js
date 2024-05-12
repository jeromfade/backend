let db = require("../dbConfig");

exports.checkAuth = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  let userId = req.headers["user-id"];

  if (!apiKey || !userId) {
    return res
      .status(401)
      .json({
        message: "API key or user ID is missing. Or userId in not Number",
      });
  }
  userId = parseInt(userId);
  try {
    let chekAuthQuery = `SELECT id FROM "token" WHERE "api_key"=$1 AND "user_id"=$2`;
    const isValid = await db.query(chekAuthQuery, [apiKey, userId]);
    
    if (!isValid.rowCount) {
      return res.status(401).json({ message: "Invalid API key or user ID." });
    }
    next();
  } catch (error) {
    next(error);
  }
};
