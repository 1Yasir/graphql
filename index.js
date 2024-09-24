const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

let books = [
    {
        id: "1",
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        id: "2",
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const typeDefs = `
type Book {
  id : ID!
  title : String!
  author: String!
}

type Query {
  books : [Book]
  authors : String
}

type Mutation {
addNewBook(title : String , author : String) : Book
deleteBook(id:String) : Book
 updateBook(id : String  , title : String) : Book

}

`;

const resolvers = {
    Query: {
        books: () => books,
        authors: () => "Hello World!",
    },

    Mutation : {
        addNewBook: (_ , {title  , author}) => {
            const newBook = {id : String(books.length + 1) , title , author};
            books.push(newBook);
            return newBook;
        },

        deleteBook : (_ , {id}) =>{
            const findIndex = books.findIndex(item => item.id === id);

            if(findIndex === -1){
                throw new Error("Book is not found....");
                
            }

          let deleteBook =   books.splice(findIndex , 1)[0];
           return deleteBook;
        },

        updateBook : (_, {id , title })=>{
            const book = books.find(item => item.id === id);

            if(!book){
                throw new Error("Book is not found....");

            }

            book.author = "Yasir Mehmood",
            book.title = title

            return book

        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    const { url } = await startStandaloneServer(server);
    console.log(`Server is running at ${url}`);
}

startServer();
