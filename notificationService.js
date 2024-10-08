import amqp from 'amqplib'; // Gunakan import alih-alih require

amqp.connect('amqp://localhost')
    .then((conn) => {
        return conn.createChannel().then((ch) => {
            // Deklarasi antrian
            const ok = ch.assertQueue('Orderan', { durable: false });
            
            ok.then(() => {
                // Menangkap pesan yang dikirimkan oleh RabbitMQ
                return ch.consume('Orderan', (msg) => 
                    console.log('Orderan Masuk: ', msg.content.toString()), { noAck: true });
            });
        });
    })
    .then(() => {
        console.log('Mencari Orderan Masuk!!');
    })
    .catch(console.warn);
