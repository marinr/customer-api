import { randomBytes } from "crypto";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({});
const tableName = process.env.TABLE_NAME;

export const handler = async (event) => {
  let id = randomBytes(20).toString('hex');
  console.log(JSON.stringify(event));
  let body = JSON.parse(event.body);
  
  const params = {
    TableName: tableName,
    Item: marshall({
      id: id,
      name: body.name,
      lastName: body.lastName
    })
  };

  try {
    const command = new PutItemCommand(params);
    const result = await client.send(command);
    console.log(result);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "OK",
        userId: id, 
        description: "User created successfully"
      })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "NOK",
        errorMsg: error.message,
      })
    };
  }
};
