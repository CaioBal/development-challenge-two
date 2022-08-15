const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /patient/{id}":
        await dynamo
          .delete({
            TableName: "Patient",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted patient ${event.pathParameters.id}`;
        break;
      case "GET /patient/{id}":
        body = await dynamo
          .get({
            TableName: "Patient",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /patient":
        body = await dynamo.scan({ TableName: "Patient" }).promise();
        break;
      case "PUT /patient":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "Patient",
            Item: {
              id: requestJSON.id,
              name: requestJSON.name,
              email: requestJSON.email,
              birth: requestJSON.birth,
              address: requestJSON.address
              
            }
          })
          .promise();
        body = `Put patient ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
