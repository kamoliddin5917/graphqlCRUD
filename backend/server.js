const { ApolloServer, gql } = require("apollo-server");

let books = [
  { book_id: 1, book_name: "Javascript", book_author: "Kamoliddin" },
  { book_id: 2, book_name: "Pytihon", book_author: "Umida" },
  { book_id: 3, book_name: "Go", book_author: "Malika" },
  { book_id: 4, book_name: "C++", book_author: "Sevara" },
  { book_id: 5, book_name: "C#", book_author: "Sevinch" },
  { book_id: 6, book_name: "Java", book_author: "Gulchehra" },
  { book_id: 7, book_name: "Css", book_author: "Shoista" },
];

const server = new ApolloServer({
  typeDefs: gql(`
      type Query {
        getBooks(id: Int) : [Book!]!
      }
      type Book {
        id: Int!
        name: String!
        author: String!
      }
      type Mutation {
        createBook(
            name: String!
            author: String!
        ) : Book!
        deleteBook(
            id: Int!
        ) : Book!
        updateBook(
            id: Int!
            name: String!
            author: String!
        ) : Book!
      }
    `),
  resolvers: {
    Query: {
      getBooks: (_, { id }) => {
        return id ? [books.find((book) => book.book_id === id)] : books;
      },
    },
    Book: {
      id: ({ book_id }) => book_id,
      name: ({ book_name }) => book_name,
      author: ({ book_author }) => book_author,
    },
    Mutation: {
      createBook: (_, args) => {
        const newBook = {
          book_id: books.length ? books[books.length - 1].book_id + 1 : 1,
          book_name: args.name,
          book_author: args.author,
        };
        books.push(newBook);

        return newBook;
      },
      deleteBook: (_, { id }) => {
        const findBook = books.find((book) => book.book_id === id);
        if (findBook) {
          books.splice(books.indexOf(findBook), 1);
          return findBook;
        } else {
          throw new Error(`There is not this id (${id}) book`);
        }
      },
      updateBook: (_, { id, name, author }) => {
        const findBook = books.find((book) => book.book_id === id);
        if (findBook) {
          findBook.book_name = name;
          findBook.book_author = author;

          return findBook;
        } else {
          throw new Error(`There is not this id (${id}) book`);
        }
      },
    },
  },
});

server.listen(777, () => console.log(`Server has been started on port: 777`));
