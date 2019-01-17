import { Response as Rp } from '../config/response';
import { User } from '../models/user';
import { USERAVATAR } from '../config/const';
import { Request, Response } from 'express';
import { TokenManagement } from '../utils/tokenManager';
import { UploadedFile } from 'express-fileupload';

import * as mkdir from 'mkdirp';
import * as bcrypt from 'bcrypt-nodejs';

class UserController {
  // Get all Users
  public async getUsers() {

    Rp.data = await User.findAll({
            attributes:
              {
                exclude: ['password'],
              },
        }).catch((err) => {
          const error = `Error find user: ${err}`;
          console.error(error);
          Rp.errors.push(error);
        });

    return Rp.export();
  }

  // Get current logged user.
  public async getCurrentUser() {

    if (TokenManagement.currentUser.id){
      Rp.data = TokenManagement.currentUser;
    } else {
      const err = 'User not synced or not found.';
      console.error(err);
      Rp.errors.push(err);
    }

    return Rp.export();
  }

  // Get a User
  public async getUser(idUser: number) {

    await User.findByPk(
      idUser,
      {attributes: {
        exclude: ['password'],
      }})
    .then((user) => {

      if (user) {
        Rp.data = user;
      } else {
        const err = 'User not found';
        console.error(err);
        Rp.errors.push(err);
      }

    })
    .catch((err) => {
      const error = `Error finding user: ${err}`;
      console.error(error);
      Rp.errors.push(error);
    });

    return Rp.export();
  }

  // Create a new user.
  public async newUser(req: Request) {
    const user = req.body.user;

    // Encripts password.
    user.password = bcrypt.hashSync(user.password);

    await User.create(user).then((newUser: any) => {
      if (!newUser) {
        const error = 'Error creating user, user empty';
        console.error(error);
        Rp.errors.push(error);
      } else {
        // Checks if there was a file for the avatar image, and uploads it.
        let uploadFailed = false;
        if (req.files.avatar && (req.files.avatar as UploadedFile).mimetype.startsWith('image/')){

          const userMediaPath: string = `${USERAVATAR}/${newUser.id}/`;
          const userMediaPathComplete: string = userMediaPath + (req.files.avatar as UploadedFile).name;

          mkdir(userMediaPath, (errMkdir) => {
            if (errMkdir) {
              console.error(`Error creating folder for the user's avatar: ${errMkdir}`);
              uploadFailed = true;
            } else {
              (req.files.avatar as UploadedFile).mv(userMediaPathComplete, (errMoving: string) => {
                if (errMoving) {
                  console.error(`Error moving file: ${errMoving}`);
                  uploadFailed = true;
                } else
                  newUser.avatar = userMediaPathComplete;
              });
            }
          });
        }

        delete newUser.password;
        Rp.data = newUser;
      }
    }).catch((err: string) => {
      const error = `Error find user: ${err}`;
      console.error(error);
      Rp.errors.push(error);
    });

    return Rp;
  }

  // Update a user
  public async putUser(idUser: number, user: any) {
    const userdb: any = await User.findById(idUser);

    if (!userdb || !user) {
      const err = 'Not found user or not found user in body';
      console.error(err);
      Rp.errors.push(err);
      return Rp.export();
    }

    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }

    await userdb.updateAttributes(user).then(async () => {
      await User.findOne({ where: { id: idUser } }).then((updatedUser: any) => {
        delete updatedUser.password;
        Rp.data = updatedUser;
      }).catch((err: string) => {
        const error = `Error update user: ${err}`;
        console.error(error);
        Rp.errors.push(error);
      });

      return Rp.export();
    });
  }

  // Update current logged user.
  public async updateCurrentUser(user: any) {
    const id = TokenManagement.currentUser.id;
    return await this.putUser(id, user);
  }

  // Suspend user.
  public async delUser(idUser: number) {
    const userdb: any = await User.findById(idUser);

    if (!userdb) {
      const err = 'User to suspend not found.';
      console.error(err);
      Rp.errors.push(err);
      return Rp.export();
    }

    await userdb.updateAttributes({ suspended: true }).then(async () => {
      await User.findOne({ where: { id: idUser } }).then((updatedUser: any) => {
        delete updatedUser.password;
        Rp.data = updatedUser;
      });
    }).catch((err) => {
      const error = `User to delete not found: ${err}`;
      console.error(error);
      Rp.errors.push(err);
    });

    return Rp.export();
  }
}

export const userController = new UserController();
