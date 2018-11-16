const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

//1
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;

//2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },

  // Link: {
  //   id: root => root.id,
  //   description: root => root.description,
  //   url: root => root.url,
  // },
};

//3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is runing on http://localhost:4000`));
