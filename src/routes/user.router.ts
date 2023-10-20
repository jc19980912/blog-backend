import express from 'express';
import { userController } from 'controllers';

import { checkAuth } from 'utils';

const userRouter = express.Router();

userRouter.get("/:id1",
    checkAuth,
    userController.getProfile
);

userRouter.post("/",
    userController.registerValidator(),
    userController.register
);

userRouter.put("/",
    checkAuth,
    userController.updateValidator(),
    userController.update
);

export default userRouter;