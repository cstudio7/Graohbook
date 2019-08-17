/* eslint-disable no-console */
import express from 'express';
import expressGraphQL from 'express-graphql';
import bodyParser from 'body-parser';
import env from 'dotenv';
import schema from './src/schema';
import authMiddleWare from './src/middlewares/authMiddleware';

env.config();

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  authMiddleWare,
  expressGraphQL(req => ({
    schema,
    context: {
      user: req.user
    },
    graphiql: true
  }))
);

app.all('*', (req, res) => res.status(404).send({
  status: 'error',
  message: 'you have entered an incorrect route'
}));

const PORT = 8001;

app.listen(PORT, () => console.log(`server listening on ${PORT}`));
