const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { getDb } = require("../utils/dynamoDB");
const { hashPassword } = require("../utils/brcypt");
const dynamoDb = getDb();

const createUser = async (tableName, item) => {
  console.log("createUser", getDb);

  try {
    const createdAt = new Date().toISOString();
    const hashedPassword = await hashPassword(item.password);
    const params = {
      TableName: tableName,
      Item: {
        ...item,
        id: uuidv4(),
        createdAt,
        password: hashedPassword,
        balance: 0,
      },
    };
    return dynamoDb.put(params).promise();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUser = async (tableName, body) => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        email: body.email,
      },
    };

    const user = await dynamoDb.get(params).promise();
    return user.Item;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { createUser, getUser };
