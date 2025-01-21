import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

// Define the schema with authorization rules for the OnCallEntry model
const schema = a.schema({
  OnCallEntry: a.model({
    groupName: a.string(),
    day: a.string(),
    contact: a.string(),
    phone: a.string(),
  }).authorization(allow => [
    allow.authenticated().to(['read']),
    allow.group('TerneuzenAdmin').to(['create', 'update', 'delete']),
  ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});