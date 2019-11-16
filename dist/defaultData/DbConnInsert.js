"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = require("../models/Tag");
const dbcon_1 = require("../config/dbcon");
const UploadedFile_1 = require("../models/UploadedFile");
const const_1 = require("../config/const");
// Example on how to insert default data into db.
exports.DefTagsData = () => {
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('SLEEPY')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('HUNGRY')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('ZZZZZZ')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('HAPPY')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('CUTE')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('ANGRY')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('COLD')).catch((err) => { throw err; });
};
exports.DefAvatarData = () => {
    const defaultAvatarData = { size: '23.2KBs', ext: 'png', externalPath: `${const_1.USERAVATARSTATIC}default.png`, internalPath: `${const_1.USERAVATARPUBLIC}default.png` };
    const defaultAvatar = new UploadedFile_1.UploadedFile(defaultAvatarData);
    dbcon_1.DbConnector.connection.manager.save(defaultAvatar).catch((err) => { throw err; });
};
//# sourceMappingURL=DbConnInsert.js.map