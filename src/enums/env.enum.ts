export enum Database {
    MYSQL = 'mysql',
    POSTGRESQL = 'postgres',
    MARIADB = 'mariadb',
    SQLITE = 'sqlite',
    MSSQL = 'mssql',
    MONGODB = 'mongodb'
}

export enum Regex {
    // IP regex from https://regexr.com/38odc
    // URL regex from https://regexr.com/3ajfi
    IP_OR_URL_OR_LOCALHOST =
     '\\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]).){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])(.+)?)\\b|' +
     '([--:\\w?@%&+~#=]*\\.[a-z]{2,4}\/{0,2})((?:[?&](?:\\w+)=(?:\\w+))+|[--:\\w?@%&+~#=]+)?|' +
     '(http(s)?:\/\/)?(localhost)(.+)?',
    BOOLEAN = '^(tru|fals)e$',
    // Allow port numbers between 1 - 65535, from http://gamon.webfactional.com/regexnumericrangegenerator/
    PORT_NUMBER =
            '^([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|[1-8][0-9]{3}|9[0-8][0-9]{2}|' +
            '99[0-8][0-9]|999[0-9]|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$',
}
