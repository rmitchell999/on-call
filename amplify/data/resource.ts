import { type ClientSchema, a, defineData, Amplify } from "@aws-amplify/backend";
import * as aws from '@aws-sdk';

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
});

const prePush = async ({ amplify, context }: { amplify: Amplify, context: any }) => {
  const auth = amplify.getPluginInstance('auth');
  const userPoolId = auth.userPoolId;
  const userPoolClient = new aws.CognitoIdentityServiceProvider();

  const groups = ["TerneuzenAdmin", "TerneuzenReadOnly"];

  for (const groupName of groups) {
    try {
      await userPoolClient.createGroup({
        GroupName: groupName,
        UserPoolId: userPoolId,
      }).promise();
    } catch (error) {
      if (error instanceof Error && error.name !== 'GroupExistsException') {
        throw error;
      }
    }
  }
};

export const hooks = {
  prePush,
};