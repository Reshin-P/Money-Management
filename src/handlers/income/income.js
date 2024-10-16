import { addIncomeToDB } from "../../controller/incomeController.js";
import { updateBalance } from "../../controller/userController.js";
import { parseBody } from "../../utils/common.utils.js";
import { errorResponse, successResponse } from "../../utils/response.js";
const { INCOME_TABLE } = process.env;

export const addIncome = async (event) => {
  try {
    const body = parseBody(event);
    const res = await addIncomeToDB(INCOME_TABLE, body);
    const user = await updateBalance(body.userEmail, body.amount, "income");
    return successResponse(200, "income added", user);
  } catch (error) {
    return errorResponse(400, "Something went wrong", error);
  }
};
