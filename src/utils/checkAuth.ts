import { JWT_TOKEN } from 'config';
import { Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import {MESSAGES, REASON_CODES} from 'constant';
import{NotFoundError} from 'errors';
import { userService } from 'services';
import { Logger } from './logger';


export const checkAuth =async (req:any, res:Response, next:Function) => {
    try{
        let email = undefined;
        let role = undefined;
        if(process.env.ENABLE_PROGRAM_AUTH && process.env.ENABLE_PROGRAM_AUTH === 'true'){
            console.log(' setting authorizer programmatically is enable ');
            console.log(' process.env.ENABLE_PROGRAM_AUTH: ', process.env.ENABLE_PROGRAM_AUTH);
            const token = req.header('Authorization').replace('Bearer ', '');
            console.log(token);
            const data = jwt.verify(token, JWT_TOKEN);
            
            console.log(
                "req.header('Authorization'): ",
                JSON.stringify(req.header('Authorization'))
            );
            req.user = data;
            email = data['email'];
            role = data['role'];
            console.log(email, role);
        }
        else{
            console.log(
                `req.header('email'): ${email},req.header('role'): ${role}`
            );
            email = req.header('email');
            role = req.header('role');
        }
        
        const user = await userService.getUser(email);

        if(!user) {
            throw new NotFoundError(
                'User does not exists!',
                REASON_CODES.AUTH.USER_IS_NOT_EXIST
            );
        }
        next();
    }
    catch(error){
        if (error instanceof NotFoundError) {
            res.status(error.errorCode).json({
              message: error.message,
              reason: error.reasonCode,
            });
          } else {
            res.status(httpStatus.UNAUTHORIZED).json({
              message: MESSAGES.UNAUTHORIZED,
              reason: REASON_CODES.AUTH.UNAUTHORIZED,
            });
          }
    }
}