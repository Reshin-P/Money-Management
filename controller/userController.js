// Import necessary modules using ES6 syntax
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "../utils/dynamoDB.js";
import { hashPassword } from "../utils/brcypt.js";
const { USERS_TABLE } = process.env;

// Initialize DynamoDB connection
const dynamoDb = getDb();

export const createUser = async (tableName, item) => {
  try {
    const createdAt = new Date().toISOString();
    const hashedPassword = await hashPassword(item.password);

    const params = {
      TableName: tableName,
      Item: {
        ...item,
        id: uuidv4(), // Generate a new UUID for the user ID
        createdAt,
        password: hashedPassword,
        balance: 0,
      },
    };
    return dynamoDb.put(params).promise();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Retrieve a user from DynamoDB by email
export const getUser = async (tableName, body) => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        email: body.email,
      },
    };

    const user = await dynamoDb.get(params).promise();
    return user.Item; // Return the user item
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBalance = async (email, amount, type) => {
  try {
    const getParams = {
      TableName: USERS_TABLE,
      Key: {
        email: email,
      },
    };

    const user = await dynamoDb.get(getParams).promise();

    if (!user.Item) {
      throw new Error(`User with email ${email} not found.`);
    }

    let currentBalance = parseInt(user.Item.balance) || 0;

    if (type === "expense") {
      currentBalance -= amount;
    } else if (type === "income") {
      currentBalance += amount;
    } else {
      throw new Error('Invalid type. Must be either "expense" or "income".');
    }

    const updateParams = {
      TableName: USERS_TABLE,
      Key: {
        email: email,
      },
      UpdateExpression: "set balance = :newBalance",
      ExpressionAttributeValues: {
        ":newBalance": currentBalance,
      },
      ReturnValues: "UPDATED_NEW",
    };

    return await dynamoDb.update(updateParams).promise();
  } catch (error) {
    console.error("Error updating balance:", error);
    throw error;
  }
};
