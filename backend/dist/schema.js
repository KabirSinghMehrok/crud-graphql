"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.typeDefs = (0, graphql_tag_1.gql) `
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
    role: String # 'admin' or 'employee'
  }

  input EmployeeFilter {
    name: String
    class: String
  }

  input EmployeeSort {
    field: String! # 'name', 'age', 'attendance'
    order: String! # 'ASC', 'DESC'
  }

  type PaginatedEmployees {
    employees: [Employee!]!
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
  }

  type Query {
    employees(
      page: Int
      limit: Int
      filter: EmployeeFilter
      sort: EmployeeSort
    ): PaginatedEmployees!
    employee(id: ID!): Employee
  }

  input AddEmployeeInput {
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
    role: String
  }

  input UpdateEmployeeInput {
    name: String
    age: Int
    class: String
    subjects: [String!]
    attendance: Float
    role: String
  }

  type Mutation {
    addEmployee(input: AddEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Boolean!
  }
`;
