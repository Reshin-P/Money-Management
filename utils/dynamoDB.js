const AWS = require("aws-sdk");

const getDb = () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb;
};

module.exports = { getDb };
