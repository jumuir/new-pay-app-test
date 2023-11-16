import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from "../../../../graphql/lushschema";
import { resolvers } from "../../../../graphql/resolvers/tillResolvers";
import { NextRequest } from 'next/server';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, { context: async req => ({ req }) });

export async function GET (request: NextRequest) {
  return handler(request);
}

export async function POST (request: NextRequest) {
  return handler(request);
}
