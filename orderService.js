import amqp from 'amqplib';

// input pesan yang dikirim ke RabbitMQ
console.log('Masukkan Orderan :');
process.stdin.once('data', (chunk) => {
    let pesanan = chunk.toString().trim();
    console.log('Orderan Terkirim : ' + pesanan + '!');

    let conn; // Definisikan conn di luar scope

    amqp.connect('amqp://localhost')
        .then((connection) => {
            conn = connection; // Inisialisasi conn
            return conn.createChannel();
        })
        .then((ch) => {
            const q = 'Orderan';
            const msg = pesanan;
            return ch.assertQueue(q, { durable: false }).then(() => {
                ch.sendToQueue(q, Buffer.from(msg));
                return ch.close();
            });
        })
        .finally(() => {
            if (conn) {
                conn.close(); // Tutup koneksi jika telah diinisialisasi
            }
        })
        .catch(console.warn);
});
