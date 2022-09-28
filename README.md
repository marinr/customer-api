# Precondition
* Configured AWS Account for CLI

# Steps to deploy
1. Install SAM https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html
2. Check if SAM is properly installed
3. ```sam deploy --guided```
4. Check in the AWS console if Cloufromation stack is properly deployed
5. In case it is, try creating a customer using curl command or POSTMAN
 ```curl -X POST -d '{"name":"TestName", "lastName":"TestLastName"}' {URL_OUTPUT_FROM_STACK}```
6. You will recieve generated ID as response from the create customer function.
7. You can try to retrieve the customer by ID
```curl {URL_OUTPUT_FROM_STACK}/{CUSTOMER_ID}```

# Delete stack
 When you are done you should delete the stack.
 ```sam delete```
