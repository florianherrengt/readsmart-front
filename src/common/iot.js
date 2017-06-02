import awsIot from 'aws-iot-device-sdk';

export class IoT {
    client: any;
    constructor(params: { onMessage: Function }) {
        Object.assign(this, params);
    }
    connect() {
        return fetch('http://localhost:3001')
            .then(response => response.json())
            .then(({ accessKeyId, secretKey, sessionToken }) => {
                this.client = awsIot.device({
                    region: 'eu-west-2',
                    protocol: 'wss',
                    accessKeyId,
                    secretKey,
                    sessionToken,
                    port: 443,
                    host: 'aqe9yfh30d9cw.iot.eu-west-2.amazonaws.com'
                });
                this.client.on('connect', () => {
                    console.log('Iot connected');
                    this.subscribe('newsource');
                });
                this.client.on('message', this.onMessage);
                this.client.on('close', () => {
                    console.log('IoT connection failed');
                    setTimeout(() => {
                        this.connect();
                    }, 5000);
                });
            });
    }
    subscribe(topic: string) {
        this.client.subscribe(topic);
    }
    getClient() {
        return this.client;
    }
}
