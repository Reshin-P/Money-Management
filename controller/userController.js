const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { getDb } = require("../utils/dynamoDB");
const dynamoDb = getDb();

const createUser = async (tableName, item) => {
  console.log("createUser", getDb);

  try {
    const createdAt = new Date().toISOString();
    const params = {
      TableName: tableName,
      Item: {
        ...item,
        id: uuidv4(),
        createdAt,
        password: bcrypt.hashSync(item.password, 8),
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

    return dynamoDb.get(params).promise();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { createUser, getUser };
