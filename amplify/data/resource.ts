import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(), // Added the new field
    })
    .authorization((allow) => [
      allow.groups(["TerneuzenAdmin"]).to(["create", "read", "update", "delete"]),
      allow.groups(["TerneuzenReadOnly"]).to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
  prePush: async ({ amplify, context }) => {
    const auth = amplify.getPluginInstance('auth');
    const userPoolId = auth.userPoolId;
    const userPoolClient = new auth.AWS.CognitoIdentityServiceProvider();
    
    const groups = ["TerneuzenAdmin", "TerneuzenReadOnly"];
    
    for (const groupName of groups) {
      try {
        await userPoolClient.createGroup({
          GroupName: groupName,
          UserPoolId: userPoolId,
        }).promise();
      } catch (error) {
        if (error.code !== 'GroupExistsException') {
          throw error;
        }
      }
    }
  },
});