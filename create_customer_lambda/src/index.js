const crypto = require("crypto");
var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  let id = crypto.randomBytes(20).toString('hex');
  console.log(JSON.stringify(event));
  let body = JSON.parse(event.body);
  var params = {
    TableName: tableName,
    Item: {
      'id' : {S: id},
      'name' : {S: body.name},
      'lastName' : {S: body.lastName},
    }
  };

  try {
    let result = await ddb.putItem(params).promise();
    console.log(result);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
          msg: "OK",
          userId: id, 
          description: "User created successfully"
        })
      };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        msg: "NOK",
        errorMsg: error,
      })
    };
   return response;
  }
 };