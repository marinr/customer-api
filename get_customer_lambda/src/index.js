var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {

  let paramId = event.pathParameters.id; 

  let params = {
    TableName: tableName,
    Key: {
      'id': {S: paramId}
    }
  };
  
  // Call DynamoDB to read the item from the table
  let result = await ddb.getItem(params).promise();
  
  const response = {
      statusCode: 200,
      body: JSON.stringify(result)
    };
   return response;
 };