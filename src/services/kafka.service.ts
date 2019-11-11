import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('kafka')
@ApiBearerAuth()
export class KafkaService {

    createTopic() {
        var kafka = require('kafka-node'),
        Producer = kafka.Producer,
        KeyedMessage = kafka.KeyedMessage,
        //TODO add kafka host
        client = new kafka.KafkaClient({kafkaHost: '10.3.100.196:9092'}),
        producer = new Producer(client),
        km = new KeyedMessage('key', 'message'),
        payloads = [
            //TODO: add real title of the log
            { topic: 'topic1', messages: 'a new log has been added! check it out now', partition: 0, timestamp: Date.now() },
        ];

    producer.on('ready', function () {
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });   

    producer.on('error', function (err) {
        console.log(err.message)
    })
    } 
}
