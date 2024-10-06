const response = require("../../utils/response");

const { USERS_TABLE } = process.env;
const { createUser, getUser } = require("../../controller/userController");
const { comparePassword } = require("../../utils/brcypt");

module.exports.register = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const res = await createUser(USERS_TABLE, body);
    return { ...response.suceess, body: JSON.stringify(res) };
  } catch (error) {
    return { ...response.suceess, body: JSON.stringify(error) };
  }
};

module.exports.login = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const user = await getUser(USERS_TABLE, body);
    const isMatch = await comparePassword(body.password, user.password);

    if (isMatch) {
      return {
        message: "logged in successfully",
        ...response.suceess,
        body: JSON.stringify(res),
      };
    } else {
      return {
        message: "user not found",
        ...response.error,
        body: JSON.stringify(res),
      };
    }
  } catch (error) {
    return { ...response.suceess, body: JSON.stringify(error) };
  }
};
