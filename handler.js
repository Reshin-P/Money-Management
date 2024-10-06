import dotenv from "dotenv";
dotenv.config();

export const hello = async (event) => {
  console.log("test");

  return {
    statusCode: 200,
    body: JSON.stringify({
      TEST_VAR: `${process.env.TEST_VAR}`,
      TEST_ENV: `${process.env.VAR_FROM_ENV}`,
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
};
