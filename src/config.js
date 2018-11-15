export default {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'notes-app-antfreda'
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://a6d8owtuf5.execute-api.us-east-2.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_4WhM6uX8A',
    APP_CLIENT_ID: '5hpin1odhi2peptkj3k46fvqp8',
    IDENTITY_POOL_ID: 'us-east-2:768cc976-b7a1-4075-81d5-ab5e36e9633b'
  },
  MAX_ATTACHMENT_SIZE: 5000000,
}
