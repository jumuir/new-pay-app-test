export const typeDefs = `#graphql

type StoreTills {
    storeID: String!
    tills: [Till]
}

type Till {
    number: String!
    dailyID: String
    openTime: String
    closeTime: String
}

type TillTransactionData {
    id: String!
    amount: Int!
    till: Till!
}

type Query {
    allTills(storeID: String!): StoreTills!
    singleTransaction(id: String!): TillTransactionData!
    tillInfo(number: String!): Till!
}

type Mutation {
    openTill(number: String!): Till!
    closeTill(number: String!): Till!
}
`;