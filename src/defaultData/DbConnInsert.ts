import { Tag } from '../models/Tag';
import { DbConnector } from '../config/dbcon';
import { UploadedFile } from '../models/UploadedFile';
import { USERAVATARSTATIC, USERAVATARPUBLIC } from '../config/const';

// Example on how to insert default data into db.
export const DefTagsData = () => {
  DbConnector.connection.manager.save(new Tag('SLEEPY')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('HUNGRY')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('ZZZZZZ')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('HAPPY')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('CUTE')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('ANGRY')).catch((err) => { throw err; });
  DbConnector.connection.manager.save(new Tag('COLD')).catch((err) => { throw err; });
};

export const DefAvatarData = () => {
  const defaultAvatarData: any = { size: '23.2KBs', ext: 'png', externalPath: `${USERAVATARSTATIC}default.png`, internalPath: `${USERAVATARPUBLIC}default.png` };
  const defaultAvatar = new UploadedFile(defaultAvatarData);
  DbConnector.connection.manager.save(defaultAvatar).catch((err) => { throw err; });
}