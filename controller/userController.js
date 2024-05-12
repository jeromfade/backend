let db = require("../dbConfig");

exports.userProfile = async (req, res, next) => {
  try {
    let userId = req.body.userId;
    console.log(userId);
    if (!userId)
      return res.status(401).json({
        result: false,
        message: "User id is Mandatory",
      });
    let selectUserQuery = `SELECT * FROM "user" WHERE id=$1`;
    let selectUser = await db.query(selectUserQuery, [userId]);
    if (!selectUser.rowCount)
      return res.status(401).json({ result: false, message: "User Not Found" });
    return res
      .status(200)
      .json({ result: true, message: "Data retrived", data: selectUser.rows });
  } catch (error) {
    next(error);
  }
};
