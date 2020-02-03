# Development

## Docker

### docker-compose.override.yml
```docker
version: '3.7'

services:
    server:
        command: [ "/opt/wait-for-it.sh", "-t", "0", "database:3306", "--", "npm", "start" ]
        volumes:
            - './scripts:/opt'
        depends_on:
            - database
        links:
            - database:database
        environment:
            # These should match the mariadb configuration
            TYPEORM_HOST: database
            TYPEORM_USERNAME: jiskefet
            TYPEORM_PASSWORD: abd1516812
            TYPEORM_DATABASE: jiskefetdb

    database:
        image: mariadb:10.3
        volumes:
            # Let Docker create and manage a volume
            - '/var/lib/mysql'
        ports:
            - 3306:3306
        environment:
            MYSQL_ROOT_PASSWORD: root
            MYSQL_DATABASE: jiskefetdb
            MYSQL_USER: jiskefet
            MYSQL_PASSWORD: abd1516812
```
