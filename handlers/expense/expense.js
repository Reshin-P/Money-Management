import AWS from "aws-sdk";
import { addExpenseToDB } from "../../controller/expenseController.js";
import { errorResponse, successResponse } from "../../utils/response.js";
import { parseBody } from "../../utils/common.utils.js";
import { updateBalance } from "../../controller/userController.js";
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { EXPENCE_TABLE } = process.env;
// Function to add an expense to the database
export const addExpense = async (event) => {
  try {
    const body = parseBody(event);
    const res = await addExpenseToDB(EXPENCE_TABLE, body);
    const user = await updateBalance(body.userEmail, body.amount, "expense");
    return successResponse(200, "expence added", user);
  } catch (error) {
    return errorResponse(400, "Something went wrong", error);
  }
};

// Function to update an expense in the database
export const updateExpense = async (table, expenseNumber, updates) => {
  const params = {
    TableName: table,
    Key: {
      expenseNumber: expenseNumber,
    },
    UpdateExpression:
      "set userEmail = :userEmail, updatedAt = :updatedAt, category = :category",
    ExpressionAttributeValues: {
      ":userEmail": updates.userEmail,
      ":updatedAt": updates.updatedAt,
      ":category": updates.category,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamoDb.update(params).promise();
  return result.Attributes; // Return the updated expense
};

// Function to delete an expense from the database
export const deleteExpense = async (table, expenseNumber) => {
  const params = {
    TableName: table,
    Key: {
      expenseNumber: expenseNumber,
    },
  };
  await dynamoDb.delete(params).promise();
  return { message: "Expense deleted" }; // Return confirmation message
};
