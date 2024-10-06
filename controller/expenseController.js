import { getDb } from "../utils/dynamoDB.js";
import { v4 as uuidv4 } from "uuid";
// Initialize DynamoDB connection
const dynamoDb = getDb();

export const addExpenseToDB = async (tableName, data) => {
  console.log("addExpenseToDB");

  const createdAt = new Date().toISOString();
  const params = {
    TableName: tableName,
    Item: {
      id: uuidv4(),
      ...data,
      createdAt,
      updatedAt: createdAt,
    },
  };
  console.log("params", params);

  const res = await dynamoDb.put(params).promise();
  console.log("res", res);

  return res; // Return the added expense
};
