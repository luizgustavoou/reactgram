import { StatusCodes } from "http-status-codes";
import { IUserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
export class UserController {
  constructor(private userService: IUserService) {}

  async findOneAndUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (<any>req).user.id;

      const { name, password, bio } = req.body;

      const profileImage = req.file?.filename;

      const user = await this.userService.update(id, {
        name,
        password,
        bio,
        profileImage,
      });

      return res.send(user);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  async findOneById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await this.userService.findOneById(id);

      res.send(user);
    } catch (error) {
      return next(error);
    }
  }

  async findMany(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.findMany();

      res.send(users);
    } catch (error) {
      return next(error);
    }
  }
}
