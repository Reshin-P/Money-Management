// Import necessary utilities and controllers using ES6 syntax
import { successResponse, errorResponse } from "../../utils/response.js";
import { createUser, getUser } from "../../controller/userController.js";
import { comparePassword } from "../../utils/brcypt.js";
import { parseBody } from "../../utils/common.utils.js";

// Access environment variables using ES6 destructuring
const { USERS_TABLE } = process.env;

export const register = async (event) => {
  try {
    const body = parseBody(event);
    const res = await createUser(USERS_TABLE, body);
    return successResponse(200, "User created successfully", res);
  } catch (error) {
    return errorResponse(400, "Something went wrong", error);
  }
};

// Login function - handles user login
export const login = async (event) => {
  try {
    const body = parseBody(event);

    const user = await getUser(USERS_TABLE, body);
    const isMatch = await comparePassword(body.password, user.password);

    if (isMatch) {
      return successResponse(200, "Logged in successfully", user);
    } else {
      return errorResponse(400, "User not found", body);
    }
  } catch (error) {
    return errorResponse(400, "Something went wrong", error);
  }
};
