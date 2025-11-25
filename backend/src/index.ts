import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

interface MyContext {
  userRole?: string;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      // Mock Auth: Read role from header 'x-user-role'
      // In a real app, this would verify a JWT token
      const userRole = req.headers['x-user-role'] as string || 'employee';
      return { userRole };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
