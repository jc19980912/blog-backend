import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthRequest } from 'types';
import {body} from 'express-validator';

import { Logger, comparePassword, encryptPassword, errorHandlerWrapper } from 'utils';
import { userService } from 'services';
import { ArgumentValidationError, CustomError } from 'errors';
import { REASON_CODES } from 'constant';

export const updateValidator = () => {
    return[
        body('oldpassword')
            .notEmpty()
            .withMessage("Old password is required"),
        body('password1')
            .notEmpty()
            .withMessage("New password is required"),
        body('password2')
            .notEmpty()
            .withMessage("Confirm password is required")
        
    ]
}
type Params = unknown;
type ResBody = unknown;
type ReqBody = {
    oldpassword: string;
    password1: string;
    password2: string;
}
type ReqQuery = unknown;
const updateHandler =async (req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,res:Response) => {
    const {oldpassword, password1, password2} = req.body;
    const id = req.user;
    Logger.log(id);
    const user = await userService.getUser(id.email);
    if(password1 != password2){
        throw new CustomError(
            "Confirm password is incorrect",
            httpStatus.BAD_REQUEST,
            REASON_CODES.AUTH.CONFIRM_PASSWORD_INCORRECT
        );
    };
    if (!user) {
        throw new CustomError(
          "User does not exist!",
          httpStatus.BAD_REQUEST,
          REASON_CODES.AUTH.USER_IS_NOT_EXIST
        );
    };
    const password = await userService.getPassword(id.email);
    const compare = await comparePassword(oldpassword, password);
    if (!compare) {
        throw new CustomError(
          'Old Password is incorrect!',
          httpStatus.BAD_REQUEST,
          REASON_CODES.AUTH.PASSWORD_INCORRECT
        );
    };
    const cryptPassword = (await encryptPassword(password1)).toString();
    userService.updatePassword(id.email, cryptPassword);
    return res.status(httpStatus.OK).json(user);
}
export const update = errorHandlerWrapper(updateHandler);