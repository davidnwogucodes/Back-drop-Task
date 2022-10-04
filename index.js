require ('dotenv').config()
// const Schema = require("./graphql/schema")
const express = require("express");
const mongoose = require("mongoose");
const {typeDefs,resolvers} = require("./graphql/typedef/root");
// const {resolvers} = require("./graphql/resolvers/user")
// const session = require("express-session");
// const MongoDbSession = require("connect-mongo")(session);
const { ApolloServer } = require("apollo-server-express");

const PORT = process.env.PORT || 6060;

const app = express();
// typeDefs = gql;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  csrfPrevention: true,
  cache: "bounded",
});
// await server.start()
const MONGO_URI = "mongodb://localhost:27017/buycoins";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb successfully"))
  .catch((err) => console.error("could not connect to mongodb", err));

// const store = new MongoDbSession({
//   uri: MONGO_URI,
//   collection: "mySessions",
// });
// app.use(
//   session({
//     secret: "key",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );
const startApp = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log({ message: "successfully connected with the database" });
  } catch (error) {}
};

startApp();

app.use(express.json());

// app.listen(PORT, () => {
//   console.log(`server listening at port:${PORT}`);
// });
server.start().then(res => {
  server.applyMiddleware({ app, path:"/graphql"});
  app.listen(PORT, () =>
    console.log("nice")
  )
 })

// server.applyMiddleware({ app, path: "/graphql" });
// server.listen().then(({ PORT }) => {
//   console.log(`🚀  Server ready at ${PORT}`);
// });
