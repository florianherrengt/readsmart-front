import awsIot from 'aws-iot-device-sdk';
import { ApolloClient, createNetworkInterface, gql } from 'react-apollo';

// TODO: move this client to common
const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'https://aftjf5akh1.execute-api.eu-west-2.amazonaws.com/development/graphql',
    }),
});

export class IoT {
    client: any;
    constructor(params: { onMessage: Function }) {
        Object.assign(this, params);
    }
    connect() {
        return client
            .query({
                fetchPolicy: 'network-only',
                query: gql`{
                    iotConnection {
                        iotEndpoint
                        region
                        accessKeyId
                        secretKey
                        sessionToken
                    }
                }`,
            })
            .then(({ data }) => {
                const { accessKeyId, secretKey, sessionToken, endpointAddress, region } = data.iotConnection;
                this.client = awsIot.device({
                    region,
                    protocol: 'wss',
                    accessKeyId,
                    secretKey,
                    sessionToken,
                    port: 443,
                    host: endpointAddress,
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
