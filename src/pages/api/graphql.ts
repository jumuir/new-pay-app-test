import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from "../../../graphql/lushschema";
import { resolvers } from "../../../graphql/resolvers/tillResolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(apolloServer);