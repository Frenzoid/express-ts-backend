const IMAGES = `${__dirname}/../public/media/`;
export const USERAVATAR = `${IMAGES}users/`;
export const JWTSECRET = process.env.JWTSECRET;
export const whitelist = ['/api/v1/auth/', '/api/v1/static/'];