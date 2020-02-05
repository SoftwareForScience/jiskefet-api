# Development

## Prerequisite

|                | Version      |
|----------------|--------------|
| Docker         | 19.03.5      |
| Docker Compose | 1.25.2       |
| Make           | GNU Make 4.3 |


## Commands
|         | Description                                             |
|---------|---------------------------------------------------------|
| build   | Builds the containers                                   |
| start   | Starts the containers                                   |
| stop    | Stops the containers                                    |
| restart | Starts and stops the containers                         |
| logs    | Prints the console output of the containers             |
| follow  | Prints and follows the console output of the containers |

**Note:** These commands can be chained to create the desired flow.

### Start 'development' environment
```console
$ ENV=dev make build restart follow
```

### Start 'production' environment
```console
$ ENV=prod make build restart follow
```
