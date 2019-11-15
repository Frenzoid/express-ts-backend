import { Tag } from '../models/Tag';
import { DbConnector } from '../config/dbcon';

// Example on how to insert default data into db.
export const DefTagsData = () => {
  DbConnector.connection.manager.save(new Tag('SLEEPY')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('HUNGRY')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('ZZZZZZ')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('HAPPY')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('CUTE')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('COLD')).catch((err) => { throw err; });
};