// Import AWS SDK using ES6 syntax
import AWS from "aws-sdk";

// Function to get a DynamoDB DocumentClient instance
export const getDb = () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb;
};
