const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const { MONGODB_URI, SECRET } = require("./config")
const { PubSub } = require("apollo-server")

const pubsub = new PubSub()

const SECRET_KEY = SECRET

mongoose.set("useFindAndModify", false)

console.log("connecting to MongoDB")

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(err => {
    console.log("error connecting:", err.message)
  })

/*
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]*/

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const bookCount = (author, books) => {
  return books.filter(b => b.author._id.toString() === author._id.toString()).length
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author")
      const filteredBooks = books.filter(b => {
        return (args.author ? b.author.name === args.author : true)
          && (args.genre ? b.genres.includes(args.genre) : true)
      })

      return filteredBooks.map(b => {
        const bookObj = { ...b._doc, id: b._id }
        bookObj.author.bookCount = bookCount(b.author, books)

        return bookObj
      })
    },

    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(a => {
        const booksWritten = books.filter(b => b.author.toString() === a._id.toString())
        return { ...a._doc, bookCount: booksWritten.length, id: a._id }
      })
    },

    me: (root, args, { currentUser }) => {
      return currentUser
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author })

      const allBooks = await Book.find({})

      if (!currentUser) {
        throw new AuthenticationError("invalid token")
      }

      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        })
        author = await newAuthor.save()
      }
      const newBook = new Book({ ...args, author: author._id })
      try {
        await newBook.save()
      } catch (exception) {
        throw new UserInputError(exception.message, { invalidArgs: args })
      }

      const addedBook = await Book.populate(newBook, { path: "author" })

      const booksWritten = allBooks.filter(b => b.author.toString() === author._id.toString())

      addedBook.author.bookCount = booksWritten.length + 1

      pubsub.publish("BOOK_ADDED", { bookAdded: addedBook })

      return addedBook
    },

    editAuthor: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      if (!currentUser) {
        throw new AuthenticationError("invalid token")
      }

      const books = await Book.find({})

      const newAuthor = await Author.findByIdAndUpdate(
        author.id,
        { ...args, born: args.setBornTo },
        { new: true }
      )
      return { ...newAuthor._doc, id: author.id, bookCount: books.filter(b => b.author.toString() === newAuthor._id.toString()).length }

      /*//ylempi
      const author = await Author.findOne({ name: args.name })
      console.log("ylempi:", author)
      
      //alempi
      const newAuthor = ({ ...author })
      console.log("alempi:", newAuthor)*/
    },

    createUser: async (root, args) => {
      const newUser = new User({ ...args })
      return newUser.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args })
        })
    },

    login: async (root, args) => {
      const loggedUser = await User.findOne({ username: args.username })
      if (!loggedUser || args.password !== "secret") {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = { username: loggedUser.username, id: loggedUser._id }
 
      return { value: jwt.sign(userForToken, SECRET_KEY) }
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.substring(7)
      const decodedToken = jwt.verify(token, SECRET_KEY)
      const currentUser = await User.findById(decodedToken.id)

      return ({ currentUser })
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})