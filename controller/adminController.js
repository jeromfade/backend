let db = require("../dbConfig");
let bcrypt = require("bcrypt");

exports.userList = async (req, res, next) => {
  try {
    let listUsersQuery = `SELECT id,name,age,designation,phone,employee_id,email,address FROM "user" WHERE user_role !='admin' ORDER BY id DESC`;
    let listUser = await db.query(listUsersQuery);
    if (!listUser.rowCount)
      return res
        .status(401)
        .json({ result: false, message: "Data Not found`" });
    return res
      .status(200)
      .json({ result: true, message: "Data Found", data: listUser.rows });
  } catch (error) {
    next(error);
  }
};

exports.userCreate = async (req, res, next) => {
  try {
    let { name, age, designation, phone, employee_id, email, address } =
      req.body;
    if (
      !name ||
      !age ||
      !designation ||
      !phone ||
      !email ||
      !address ||
      !employee_id
    ) {
      return res
        .status(400)
        .json({ result: false, message: "All fields are required" });
    }
    if (address.length > 100) {
      return res.status(400).json({
        result: false,
        message: "Address must not exceed 100 characters",
      });
    }
    if (isNaN(age)) {
      return res
        .status(400)
        .json({ result: false, message: "Age should be number" });
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ result: false, message: "Invalid email" });
    }
    let selectUniqueId = `SELECT * FROM "user" WHERE employee_id=$1 OR email=$2`;
    let chekDuplicate = await db.query(selectUniqueId, [employee_id, email]);
    if (chekDuplicate.rowCount)
      return res
        .status(400)
        .json({ result: false, message: "Email Or Employee Id Already Exist" });

    let generateDefaultPswd = await bcrypt.hash(name + "@123", 10);
    let createUserQuery = `INSERT INTO "user" (name,age,designation,phone,employee_id,email,address,user_role,password) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
    let createUser = await db.query(createUserQuery, [
      name,
      age,
      designation,
      phone,
      employee_id,
      email,
      address,
      "user",
      generateDefaultPswd,
    ]);
    if (!createUser.rowCount)
      return res
        .status(401)
        .json({ result: false, message: "Something went wrong , Not created" });
    return res
      .status(200)
      .json({ result: true, message: "User created Successfully" });
  } catch (error) {
    next(error);
  }
};

exports.removeUser = async (req, res, next) => {
  try {
    let userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({
        result: false,
        message: "User id is Mandatory",
      });
    }
    let removeUserQuery = `DELETE FROM "user" WHERE id=$1`;
    let removeUser = await db.query(removeUserQuery, [userId]);
    if (removeUser.rowCount)
      return res
        .status(200)
        .json({ result: true, message: "User Removed Successfully" });
    return res.status(401).json({ result: false, message: "User Not Removed" });
  } catch (error) {
    next(error);
  }
};
