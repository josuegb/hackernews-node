const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

const idCount = links.length;

//2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },

  // Link: {
  //   id: root => root.id,
  //   description: root => root.description,
  //   url: root => root.url,
  // },
};

//3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is runing on http://localhost:4000`));
