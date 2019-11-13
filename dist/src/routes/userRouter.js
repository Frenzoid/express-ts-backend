import { NextFunction, Request, Response, Router } from 'express';
import { userController } from '../controllers/userController';
import { response as rp } from '../config/response';
export class UsersRouter {
    constructor() {
        this.async = getAllUsers(req, Request, res, Response, next, NextFunction);
        this.router = Router();
        this.init();
    }
}
{
    try {
        res.json(await, userController.getUsers());
    }
    catch (err) {
        console.log(err);
        rp.errors.push(err);
        return rp.export();
    }
}
async;
postUser(req, Request, res, Response, next, NextFunction);
{
    try {
        res.json(await, userController.postUser(req));
    }
    catch (err) {
        console.log(err);
        rp.errors.push(err);
        return rp.export();
    }
}
async;
putUser(req, Request, res, Response, next, NextFunction);
{
    try {
        res.json(await, userController.putUser(req));
    }
    catch (err) {
        console.log(err);
        rp.errors.push(err);
        return rp.export();
    }
}
async;
getUser(req, Request, res, Response, next, NextFunction);
{
    try {
        res.json(await, userController.getUser(req));
    }
    catch (err) {
        console.log(err);
        rp.errors.push(err);
        return rp.export();
    }
}
async;
delUSer(req, Request, res, Response, next, NextFunction);
{
    try {
        res.json(await, userController.delUser(req));
    }
    catch (err) {
        console.log(err);
        rp.errors.push(err);
        return rp.export();
    }
}
init();
{
    this.router.get('/', this.getAllUsers);
    this.router.post('/', this.postUser);
    this.router.get('/:id', this.getUser);
    this.router.put('/:id', this.putUser);
    this.router.delete('/:id', this.delUSer);
}
const userRoutes = new UsersRouter();
userRoutes.init();
export default userRoutes.router;
//# sourceMappingURL=userRouter.js.map