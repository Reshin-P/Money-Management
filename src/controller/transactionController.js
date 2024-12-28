import { getDb } from "../utils/dynamoDB.js";
import { errorResponse } from "../utils/response.js";
// Initialize DynamoDB connection
const dynamoDb = getDb();

// Get all income records by userEmail
export const getAllTransactions = async (userEmail) => {
  const params = {
    TableName: "transactionTable-develop",
    FilterExpression: "userEmail = :email",
    ExpressionAttributeValues: {
      ":email": userEmail,
    },
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    if (!result.Items || result.Items.length === 0) {
      return errorResponse(400, "User not found", { userEmail });
    }

    const income = [];
    const expense = [];
    let totalIncome = 0;
    let totalExpense = 0;

    result.Items.forEach((transaction) => {
      if (transaction.type === "Income") {
        income.push(transaction);
        totalIncome += transaction.amount;
      } else if (transaction.type === "Expense") {
        expense.push(transaction);
        totalExpense += transaction.amount;
      }
    });

    return {
      income,
      expense,
      totalIncome,
      totalExpense,
    };
  } catch (error) {
    console.error("Error fetching income records:", error);
    return errorResponse(500, "Could not fetch income records", error);
  }
};
