const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");

require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.BBDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) {
      console.log("Error de Conexion");
    } else {
      server();
    }
  }
);

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;
      if (token) {
        try {
          const user = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.SECRET_KEY
          );
          return { user };
        } catch (error) {
          console.log("super error");
          console.log(error);
          throw new Error("token invalido");
        }
      }
    },
  });

  serverApollo.listen().then(({ url }) => {
    console.log(`Servidor listo en ${url}`);
  });
}
