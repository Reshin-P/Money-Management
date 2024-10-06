const { successResponse, errorResponse } = require("../../utils/response");

const { USERS_TABLE } = process.env;
const { createUser, getUser } = require("../../controller/userController");
const { comparePassword } = require("../../utils/brcypt");

module.exports.register = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const res = await createUser(USERS_TABLE, body);
    return successResponse(200, "User created sucessfully", res);
  } catch (error) {
    return errorResponse(400, "something went wrong", error);
  }
};

module.exports.login = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const user = await getUser(USERS_TABLE, body);
    const isMatch = await comparePassword(body.password, user.password);

    if (isMatch) {
      return successResponse(200, "logged in successfully", user);
    } else {
      return errorResponse(400, "User not found", body);
    }
  } catch (error) {
    return errorResponse(400, "something went wrong", error);
  }
};
