import { getDb } from "../utils/dynamoDB.js";
import { v4 as uuidv4 } from "uuid";
// Initialize DynamoDB connection
const dynamoDb = getDb();

export const addIncomeToDB = async (tableName, data) => {
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

  const res = await dynamoDb.put(params).promise();

  return res;
};
