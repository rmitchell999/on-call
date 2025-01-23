/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTodo = /* GraphQL */ `subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
  onCreateTodo(filter: $filter) {
    id
    content
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTodoSubscriptionVariables,
  APITypes.OnCreateTodoSubscription
>;
export const onUpdateTodo = /* GraphQL */ `subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
  onUpdateTodo(filter: $filter) {
    id
    content
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTodoSubscriptionVariables,
  APITypes.OnUpdateTodoSubscription
>;
export const onDeleteTodo = /* GraphQL */ `subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
  onDeleteTodo(filter: $filter) {
    id
    content
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTodoSubscriptionVariables,
  APITypes.OnDeleteTodoSubscription
>;
export const onCreateContact = /* GraphQL */ `subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
  onCreateContact(filter: $filter) {
    id
    email
    phone
    name
    onCall
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateContactSubscriptionVariables,
  APITypes.OnCreateContactSubscription
>;
export const onUpdateContact = /* GraphQL */ `subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
  onUpdateContact(filter: $filter) {
    id
    email
    phone
    name
    onCall
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateContactSubscriptionVariables,
  APITypes.OnUpdateContactSubscription
>;
export const onDeleteContact = /* GraphQL */ `subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
  onDeleteContact(filter: $filter) {
    id
    email
    phone
    name
    onCall
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteContactSubscriptionVariables,
  APITypes.OnDeleteContactSubscription
>;
export const onCreateOnCallEntry = /* GraphQL */ `subscription OnCreateOnCallEntry(
  $filter: ModelSubscriptionOnCallEntryFilterInput
) {
  onCreateOnCallEntry(filter: $filter) {
    id
    groupName
    day
    contactID
    contact {
      id
      email
      phone
      name
      onCall
      createdAt
      updatedAt
      __typename
    }
    phone
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateOnCallEntrySubscriptionVariables,
  APITypes.OnCreateOnCallEntrySubscription
>;
export const onUpdateOnCallEntry = /* GraphQL */ `subscription OnUpdateOnCallEntry(
  $filter: ModelSubscriptionOnCallEntryFilterInput
) {
  onUpdateOnCallEntry(filter: $filter) {
    id
    groupName
    day
    contactID
    contact {
      id
      email
      phone
      name
      onCall
      createdAt
      updatedAt
      __typename
    }
    phone
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateOnCallEntrySubscriptionVariables,
  APITypes.OnUpdateOnCallEntrySubscription
>;
export const onDeleteOnCallEntry = /* GraphQL */ `subscription OnDeleteOnCallEntry(
  $filter: ModelSubscriptionOnCallEntryFilterInput
) {
  onDeleteOnCallEntry(filter: $filter) {
    id
    groupName
    day
    contactID
    contact {
      id
      email
      phone
      name
      onCall
      createdAt
      updatedAt
      __typename
    }
    phone
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteOnCallEntrySubscriptionVariables,
  APITypes.OnDeleteOnCallEntrySubscription
>;
