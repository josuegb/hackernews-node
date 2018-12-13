const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

let idCount = links.length;

//2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => links.find(link => link.id === args.id),
  },

  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },

    updateLink: (root, args) => {
      let newLink = null;
      links = links.map(link => {
        if (args.id === link.id) {
          newLink = {
            ...link,
            url: args.url ? args.url : link.url,
            description: args.description ? args.description : link.description,
          };

          return newLink;
        }
        return link;
      });

      if (!newLink) {
        throw 'Element not found';
      } else {
        return newLink;
      }
    },

    deleteLink: (root, args) => {
      let deletedLink = null;
      links = links.filter(link => {
        if (args.id === link.id) {
          deletedLink = link;
          return false;
        }
        return;
      });

      if (!deletedLink) {
        throw 'Element not found';
      } else {
        return deletedLink;
      }
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
