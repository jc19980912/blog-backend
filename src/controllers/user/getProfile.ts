import {Request, Response} from 'express';
import httpStatus from 'http-status';
import { userService } from 'services';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { AuthRequest } from 'types';

type Params = {
    id1:string;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getProfileHandler =async (
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const id = req.user;
    const {id1} = req.params;

    const user = await userService.getUserById(id1);

    res.status(httpStatus.OK).json({user, id});
}

export const getProfile = errorHandlerWrapper(getProfileHandler);