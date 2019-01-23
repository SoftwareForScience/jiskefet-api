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
        '\\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\\b|' +
        '([--:\\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\\w+)=(?:\\w+))+|[--:\\w?@%&+~#=]+)?' +
        '|(localhost)',
    BOOLEAN = '^(tru|fals)e$',
    // Need to limit range of allowed ports from 1 - 65535
    PORT_NUMBER =  '^([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9])$',
}
