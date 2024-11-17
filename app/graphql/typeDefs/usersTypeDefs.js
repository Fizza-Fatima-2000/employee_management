const { gql } = require("apollo-server-express");

const user = gql`
  scalar JSON
  scalar Upload
  scalar Date
  type Query {
    ##------------------------------FOR EMPLOYEE-------------------------------------------##
    "The getspecificemployee query is used to get single employee details"
    getspecificemployee: UserResponse

    "The getAllUseremployee query is used to all employee details"
    getAllUseremployee(filters:UserFilters): UserListResponses

    "The getallpaginatedemployee query is used to employee details"
    getallpaginatedemployee(page: Int, limit: Int): UserListResponse
  }
  type Mutation {
    ##------------------------------FOR EMPLOYEE-------------------------------------------##
    "The addemployee mutation is used to add employee details"
    addemployee(input: createUserInput): User

    "The addemployee mutation is used to update employee details"
    updateemployee(input: addUserInput): User

    "User can login by using Valid Email and Password."
    Login(input: LoginInput): user_credentials
  }

  type User {
    id: ID
    name: String
    age: Int
    class: String
    subject: String
    attendance: String
    user_credential_Id: user_credentials
  }
 type SpecificUser {
    name: String
    age: Int
    class: String
    subject: String
    attendance: String
  }
  type user_credentials {
    id: ID
    email: String
    password: String
    deleted: Boolean
    token: String
    role_id: Int
  }

  input createUserInput {
    name: String
    age: Int
    class: String
    subject: String
    attendance: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input addUserInput {
    name: String
    age: Int
    class: String
    subject: String
    attendance: String
  }

  input UserFilters {
    id: ID
    name: String
    age: Int
    class: String
    subject: String
  }

  type UserListResponse {
    user: [User]
    totalEmployees: Int
    totalPages: Int
    currentPage: Int
  }



  type UserResponse {
  user: user_credentials
  details : SpecificUser
  }
    type UserListResponses {
  user: [User]
  }
`;

module.exports = user;
