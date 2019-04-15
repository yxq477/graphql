const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of Bob Tutorial for GraphQL`,
    feed: () => links,
    link: (parent, args) => {
      const link = links.filter(item => item.id === args.id)
      return link[0] || {}
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const link = links.filter(item => item.id === args.id)[0]
      link.url = args.url
      link.description = args.description
      return link
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex(item => item.id === args.id)
      return links.splice(linkIndex, 1)[0]
    }
  }
}
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`))