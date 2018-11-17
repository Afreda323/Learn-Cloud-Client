export default {
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'notes-app-api-prod-attachmentsbucket-dcy5dtm4pavo'
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://a6d8owtuf5.execute-api.us-east-2.amazonaws.com/prod'
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_ZI95zGpri',
    APP_CLIENT_ID: '1q6ka8i3ptj3l0t87fh60u700i',
    IDENTITY_POOL_ID: 'us-east-2:1c5a84c0-b052-4c88-8ee1-499f21f44956'
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: 'pk_test_dNRPaqdwtjfnYLNQkCZQ95aX'
}
