import express from 'express';
import expressGraphQL from 'express-graphql';
import env from 'dotenv';
import schema from './schema';

env.config();

const app = express();

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);
const PORT = 8001;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
