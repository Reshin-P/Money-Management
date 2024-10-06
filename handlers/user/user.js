const response = require("../../utils/response");

const { USERS_TABLE } = process.env;
const { createUser, getUser } = require("../../controller/userController");

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
    console.log("login");
    const body = JSON.parse(event.body);
    const res = await getUser(USERS_TABLE, body);
    console.log("res", body);

    return { ...response.suceess, body: JSON.stringify(res) };
  } catch (error) {
    return { ...response.suceess, body: JSON.stringify(error) };
  }
};
