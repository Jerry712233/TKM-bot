const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ01iL2x3SnlSanczTm9YYVZ5cmNlRWVXZWJwWFFnY1pqUW0xMDV6eUgybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUI4WE1RRW43ZVk3eWUzbnVDZDV6Rncxd0Z2eEcyaWJvTnBsTy9Kb0NrYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRHZmdUNsZzR3ZU1YRklrTXo2ZllYS0ZhQ3paQ0F3N0J5TEhaM3FHRDNVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNWVh1K0dSb09VazRkdUYvdUJWQXVKVVVXd1B6YVE2a1hNWFBobENPRm44PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1Oa0R3cHJOYm8zUWtlc1lqb1FMRUlENHhXcFM0dUIvYVdtaEpzNEl5RU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ5SWhoZU41K1ZqM0d6aU1ld3Qya0NPNTIwTTNuSkhTNktVQkVzTWtEMEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0QyRXNaWHhlR2JCN0d6Z3FtWjRxU1h1aTdlSE9uK0RuOEdEUnh1QjVsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUpPRjJ3Sm5IbkhDUGRFaGQ3MU5lZ0o2YnRETXVJb2IzSWpiell3dGUxOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9heUpyQUJ4cDZkZWhBWHF1KzdYRVhEZCtPcTlocVA3YmFMN3dwcTZvKzZhWWNyT3ROb044KzdJSlY5RWhiTXpFWWM3a0svNjdUbkFhUG5RSFZvcmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJzWWpvMCtZQzhaRW5OKzEwYnhBRnliSm9sWkhBVU8zYmtVYzQ5SCt4ZkJVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVOGRZSGs5cFIwR3RnRi1Cb1JsYVB3IiwicGhvbmVJZCI6ImI0YWZjZDMzLTdjYTktNGZjNy04ZDM1LTcyNDJmYzYwN2U1ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsZVg0dU9TNzA4WWJqaG95cnlaM3JaWk5xaUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOXpzSEt6dDg0aWhqN0RhK2JLSDRmVkpyL0tRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkE0VDY4SkRGIiwibWUiOnsiaWQiOiIyNzY2MDE2OTUyNToxNEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjZJNjdZQkVQNlU0YllHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRUxRbXVQcjN6Um42cVY2ZTJsaHNFbGhZdWNIQkFQMEFLOWdPbnR2ci9pZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYXF2c1ZsZ3N3a0YxdHE1M1crYndxUDlxTXNGSnMxSWtJQkNZNWpla3hJckNTRmxabTNDMkVGaGFJbkhlMEFRVG51RU80bEltM1hIY0h2QkNUNGorRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IjFaa0MxRFM3YzQzOHZzRmZ2dWRRRlZkQWFvSW5iRGdxbXdxQ0ViZkF0V1EycU9xcUVIZW9IaTIyRExVdDRhZ21HYmxlR0hqRGFGd2JjV08rUFBLV2d3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc2NjAxNjk1MjU6MTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUkMwSnJqNjk4MForcWxlbnRwWWJCSllXTG5Cd1FEOUFDdllEcDdiNi80byJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTQ1MDg5MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLeFEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Tristan",
    NUMERO_OWNER : process.env.OWNER_NUM || "27634624586",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
