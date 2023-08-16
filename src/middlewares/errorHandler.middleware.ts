import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../common/customError';

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Sorry, something went wrong!'
    );
  }
  res.status((customError as CustomError).status).send(customError);
};

export default handleError;