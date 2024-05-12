const bcrypt = require("bcrypt");
const db = require("../dbConfig");
const generateApiKey = require("../utils/apiKeyGenerate");

exports.login = async (req, res, next) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ result: false, message: "Email and password are required" });
    }
    
    let selectQuery = `SELECT * FROM "user" WHERE "email"=$1 OR "employee_id"=$1`;
    let userDetail = await db.query(selectQuery, [email]);

    if (!userDetail.rowCount > 0)
      return res
        .status(401)
        .json({ result: false, message: "Not a Valid Email" });

    let storedPassword = userDetail.rows[0].password;
    const hashedPassword = await bcrypt.compare(password, storedPassword);
    if (!hashedPassword)
      return res
        .status(401)
        .json({ result: false, message: "Not a Valid Password" });

    const apiKey = generateApiKey();
    //remove if the user already exist in api key\
    let deleteUserQuery = `DELETE FROM "token" WHERE "user_id" = $1`;
    let userId = userDetail.rows[0].id;
    let userRole = userDetail.rows[0].user_role;

    let removeApiKey = await db.query(deleteUserQuery, [userId]);
    if (removeApiKey) {
      let storeApiKey = `INSERT INTO "token" ("api_key","user_id") VALUES($1,$2)`;
      await db.query(storeApiKey, [apiKey, userId]);
    }
    return res.status(200).json({
      result: true,
      message: "login Successfully",
      data: { apiKey, userId, userRole: userRole },
    });
  } catch (error) {
    next(error);
  }
};
