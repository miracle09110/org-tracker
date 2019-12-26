'use strict'
const CONSTANT = {
    TOKEN: process.env.TOKEN,
    MONGO : {
        db: process.env.MONGO_DB_NAME,
        host: process.env.MONGO_HOST
    },
    TIME: {
        MS_PER_SECOND: 1000,
        SECONDS_PER_MINUTE: 60,
    },
    SALT: process.env.SALT
}

module.exports = CONSTANT;