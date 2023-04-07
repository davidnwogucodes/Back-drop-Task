const { createTestClient } = require('apollo-server-testing');
// const { ApolloServer } = require('@apollo/server');
const { ApolloServer } = require("apollo-server-express")

const { typeDefs, resolvers } = require('./root');
const User = require('../../models/index');

describe('GraphQL API', () => {
  let server;
  let query;
  let mutate;

  beforeAll(() => {
    // Set up a test server using ApolloServer with our type definitions and resolvers
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Use the createTestClient function from apollo-server-testing to create a client we can use in our tests
    const { query: q, mutate: m } = createTestClient(server);
    query = q;
    mutate = m;
  });

  afterAll(() => {
    // Disconnect from the database and shut down the test server
    mongoose.disconnect();
    server.stop();
  });

  describe('Query.getUser', () => {
    it('should return the correct user', async () => {
      // Seed the database with a test user
      const testUser = {
        AccountNumber: '1234567890',
        AccountName: 'John Doe',
        BankCode: '011',
        isVerified: true,
      };
      await User.create(testUser);

      // Define the query to get the user with the test user's account number and account name
      const GET_USER = `
        query GetUser($input: getUserInput!) {
          getUser(aUser: $input) {
            AccountName
          }
        }
      `;

      // Set the variables for the query
      const variables = {
        input: {
          AccountNumber: '1234567890',
          AccountName: 'John Doe',
        },
      };

      // Make the query and check that the result matches the test user's account name
      const { data } = await query({ query: GET_USER, variables });
      expect(data.getUser.AccountName).toEqual(testUser.AccountName);
    });
  });

  describe('Mutation.CreateUser', () => {
    it('should create a verified user', async () => {
      // Define the variables for the CreateUser mutation
      const variables = {
        userInput: {
          AccountNumber: '098765',
          AccountName: 'Jane Doe',
          BankCode: '011',
        },
      };

      // Make the mutation to create the user
      const { data } = await mutate({ mutation: CREATE_USER, variables });

      // Check that the result matches the expected user object
      expect(data.CreateUser).toEqual({
        AccountNumber: '098765',
        AccountName: 'Jane Doe',
        BankCode: '011',
        isVerified: true,
      });
    });

    it('should create an unverified user', async () => {
      // Define the variables for the CreateUser mutation
      const variables = {
        userInput: {
          AccountNumber: '098765',
          AccountName: 'Janet Doe',
          BankCode: '011',
        },
      };

      // Make the mutation to create the user
      const { data } = await mutate({ mutation: CREATE_USER, variables });

      // Check that the result matches the expected user object
      expect(data.CreateUser).toEqual({
        AccountNumber: '098765',
        AccountName: 'Janet Doe',
        BankCode: '011',
        isVerified: false,
      });
    });
  });
});
