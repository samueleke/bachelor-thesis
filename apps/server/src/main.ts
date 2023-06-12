/* eslint-disable @nx/enforce-module-boundaries */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import env from './utils/env';
import mongoose from 'mongoose';
import { AsyncRouter } from 'express-async-router';
import { HttpMethod, Route } from './utils/types';
import { databaseConnection } from './dbConnect';
import { authMiddleware } from './middlewares/authentication';
import { roleMiddleware } from './middlewares/authorization';
import { validateSchema } from './middlewares/validateSchema';
import { APIError } from '../../../packages/shared/errors';
import { signinRoutes } from './signin/signinRoute';
import { questionRoutes } from './question/questionRoute';
import { studentRoutes } from './users/student/studentRoute';

const app = express();

app.use(morgan('dev'));

app.use(cors({
  origin: env.CLIENT_URL,
}))

app.use(express.json());


const router = AsyncRouter({
  sender: (req: Request, res: Response, value: string) => {
    res.send(value ?? { success: true });
  },
});

const getRoutes = (): Route[] => {
  return [
    ...signinRoutes(),
    ...questionRoutes(),
    ...studentRoutes(),
  ]
}

const buildAPIRoutes = (getRoutes: () => Route[]) => {
  // * Init router
  getRoutes().forEach((route) => {
    // * Get the HTTP method of a route, convert to lower case since 'get'/'post'/'put'/'delete' exist under express.Router()
    const httpMethod = route.method.toLowerCase() as HttpMethod;

    // * If we want middleware to be optional in the route defintion then we need to add this '?? []' check
    // * this check ensures that if route.middleware is undefined middlewareToCall becomes [] instead
    const middlewareToCall = route.middleware ?? [];

    const routeName = route.route;

    if (route.auth) middlewareToCall.push(authMiddleware());

    if (route.role) middlewareToCall.push(roleMiddleware(route.role));

    if (route.body) middlewareToCall.push(validateSchema(route.body));
    // * We call router[httpMethod] which for httpMethod = 'get' is equivalent to router.get
    // * We then destructure the array of middlewareToCall, meaning that the function receives each param one by one so it becomes
    // * ...middlewareToCall -> firstMiddleware, secondMiddleware...
    // * Finally we want our controller to be last so we put it as a last parameter of router[httpMethod]
    router[httpMethod](routeName, ...middlewareToCall, route.controller);
  });

  // * We return populated router
  return router;
};

const routes = buildAPIRoutes(getRoutes);

app.use(routes);

//error handler middleware
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send((err as any).errors);
  }
  if (err instanceof APIError) {
    const { errorCode, data } = err;
    res.status(errorCode).send({ message: data });
    return;
  }
  if (err.type === 'entity.parse.failed') {
    res.status(400).send({ message: 'Wrong JSON format' });
    return;
  }
  console.log('Catastrophic error happened!\n', err);

  // * Worst case return any error
  return res.status(500).send(err);
});

databaseConnection().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log('Error connecting to database', err);
})

app.listen(env.PORT, () => {
  console.log(`[ ready ] http://localhost:${env.PORT}`);
});
