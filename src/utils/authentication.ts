
import { expressjwt } from 'express-jwt';
import { JWT_SECRET } from './secrete';
import { Request, Response, NextFunction } from 'express';

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const getTokenFromHeader = (req: Request): string | undefined => {
  try {
    const headerAuth: string | undefined = req.headers.authorization;

    if (!headerAuth) {
      console.warn("Authorization header is missing");
      return undefined;
    }

    if (Array.isArray(headerAuth)) {
      return splitToken(headerAuth[0]);
    } else {
      return splitToken(headerAuth);
    }
  } catch (error:any) {
    console.error(`Error extracting token from header: ${error.message}`);
    return undefined;
  }
};

function splitToken(authString: string): string | undefined {
  try {
    const parts = authString.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    } else {
      console.warn("Authorization header format is invalid");
      return undefined;
    }
  } catch (error:any) {
    console.error(`Error splitting token: ${error.message}`);
    return undefined;
  }
}
const handleJwtErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
      if (err.inner && err.inner.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
    next(err);
  };

const auth = {
  required: [ 
    expressjwt({
    credentialsRequired: true,
    secret: JWT_SECRET,
    getToken: getTokenFromHeader,
    algorithms: ['HS256']
  }),
  handleJwtErrors
  ],
  optional: [expressjwt({
    credentialsRequired: false,
    secret: JWT_SECRET,
    getToken: getTokenFromHeader,
    algorithms: ['HS256']
  }),
  handleJwtErrors
]
};

export const authentication = auth;
