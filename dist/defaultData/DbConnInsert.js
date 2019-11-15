"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tag_1 = require("../models/Tag");
const dbcon_1 = require("../config/dbcon");
// Example on how to insert default data into db.
exports.DefTagsData = () => {
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('SLEEPY')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('HUNGRY')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('ZZZZZZ')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('HAPPY')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('CUTE')).catch((err) => { throw err; });
    dbcon_1.DbConnector.connection.manager.save(new Tag_1.Tag('COLD')).catch((err) => { throw err; });
};
//# sourceMappingURL=DbConnInsert.js.map