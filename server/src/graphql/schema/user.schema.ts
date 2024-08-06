export const typeDefs = `#graphql
  scalar Date
  
  type Department {
    _id: ID!
    name: String!
  }

  input FilterInput {
    _id: ID
    email: String
    companyId: ID
    role: String
    departmentId: ID
    positionId: ID
    employeeId: String
    status: String
    resetToken: String
  }

  type User {
    _id: ID!
    email: String!
    role: String!
    firstName: String!
    lastName: String
    profilePicture: String
    employeeId: String
    departmentId: Department
    positionId: ID
    companyId: ID!
    hireDate: Date
    qualification: [String]
    status: String!
    resetToken: String
  }

  type Query {
    users(filter:FilterInput): [User]
    user(id: ID!): User
    isHealty:String!
  }
`;
