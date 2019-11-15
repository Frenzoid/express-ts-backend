import { User } from '../models/User';
import { Tag } from '../models/Tag';
import { DbConnector } from '../config/dbcon';

class TagController {
  // Get all tags
  public async getTags(): Promise<Tag[]> {
    return await DbConnector.connection.manager.find(Tag).catch((err) => { throw err; });
  }
}

export const tagController = new TagController();
