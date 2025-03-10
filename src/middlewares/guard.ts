import { Response, NextFunction } from 'express';
import { Role } from '../types/enums';
import { AuthRequest } from './auth';

class Guard {
  private static instance: Guard;

  public static getInstance(): Guard {
    if (!Guard.instance) {
      Guard.instance = new Guard();
    }
    return Guard.instance;
  }

  authorize(roles: Role[] = []) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
        const roleValue = req.user?.role as Role;

        if (!roles.some((role) => roleValue === role)) {
          return res.status(403).json({
            message: 'Restricted Action, Unauthorized Access❗',
            statusCodes: 403,
          });
        }
        console.log('USER AUTHORIZED TO PROCEED');
        return next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export default Guard;
