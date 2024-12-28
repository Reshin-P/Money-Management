import { getDb } from "../utils/dynamoDB.js";
import { v4 as uuidv4 } from "uuid";
import { updateBalanceAfterDelete } from "./userController.js";
// Initialize DynamoDB connection
const dynamoDb = getDb();

export const addExpenseToDB = async (tableName, data) => {
  const createdAt = new Date().toISOString();
  const params = {
    TableName: "transactionTable-develop",
    Item: {
      id: uuidv4(),
      ...data,
      createdAt,
      updatedAt: createdAt,
    },
  };

  const res = await dynamoDb.put(params).promise();

  return res;
};

// Function to delete an expense from the database
export const deleteTransactionFromDb = async (id) => {
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  const params = {
    TableName: "transactionTable-develop",
    Key: {
      id,
    },
  };

  const fetchedItem = await dynamoDb.get(params).promise();

  if (!fetchedItem.Item) {
    return {
      statusCode: 404,
      message: "Transaction not found",
    };
  }

  await dynamoDb.delete(params).promise();
  return await updateBalanceAfterDelete(
    fetchedItem.Item.userEmail,
    fetchedItem.Item.amount,
    fetchedItem.Item.type
  );
};
