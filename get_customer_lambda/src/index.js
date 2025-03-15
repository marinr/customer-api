import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({});
const tableName = process.env.TABLE_NAME;

export const handler = async (event) => {
  const paramId = event.pathParameters.id;

  const params = {
    TableName: tableName,
    Key: {
      id: { S: paramId }
    }
  };

  try {
    const command = new GetItemCommand(params);
    const result = await client.send(command);
    
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          msg: "Not Found",
          errorMsg: "Customer not found"
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(unmarshall(result.Item))
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "NOK",
        errorMsg: error.message
      })
    };
  }
};
