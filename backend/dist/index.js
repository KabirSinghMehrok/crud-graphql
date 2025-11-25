"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
const startServer = async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            // Mock Auth: Read role from header 'x-user-role'
            // In a real app, this would verify a JWT token
            const userRole = req.headers['x-user-role'] || 'employee';
            return { userRole };
        },
    });
    console.log(`🚀  Server ready at: ${url}`);
};
startServer();
