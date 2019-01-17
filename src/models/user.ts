import * as Sequelize from 'sequelize';
import { Config } from '../config/database_config';

// tslint:disable-next-line:variable-name
export const User = Config.sConnector.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 25],
        msg: 'Name must be between 3 and 25 characters in length',
      },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 25] ,
        msg: 'Last name must be between 3 and 25 characters in length',
      },
    },
  },
  nick: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 25],
        msg: 'Nickname must be between 4 and 25 characters in length',
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email address must be valid',
      },
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      length: {
        args: 5,
        msg: 'Password must be atleast 5 characters in length',
      },
    },
  },
  role: {
    type: Sequelize.ENUM('ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'),
    allowNull: false,
    defaultValue: 'ROLE_USER',
  },
  phone: {
    type: Sequelize.STRING,
    defaultValue: '000000000',
    allowNull: false,
    validate: {
      length: {
        args: [7, 20],
        msg: 'Phone number must be between 7 and 20 numbers in length',
      },
    },
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'default.png',
  },
  suspended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
},                                           {
  tableName: 'user',
  createdAt: false,
  updatedAt: false,
  defaultScope:
  {
    where: {
      active: true,
    },
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withoutPassword: {
      attributes: { exclude: ['password'] },
    },
  },
});
