const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

//2
const resolvers = {
  Query: {
    feed: (root, args, context, info) => context.db.query.links({}, info),
  },

  Mutation: {
    post: (root, args, context, info) =>
      context.db.mutation.createLink(
        {
          data: {
            url: args.url,
            description: args.description,
          },
        },
        info
      ),
  },
};

//3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/josue-granados/database/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
});
server.start(() => console.log(`Server is runing on http://localhost:4000`));
