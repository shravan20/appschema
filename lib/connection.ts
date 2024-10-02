import { Client } from 'appwrite';

class AppwriteConnection {
    private static client: Client;

    static initialize(endpoint: string, project: string, apiKey: string) {
        this.client = new Client();
        this.client.setEndpoint(endpoint).setProject(project);
    }

    static getClient(): Client {
        if (!this.client) {
            throw new Error('Appwrite client not initialized.');
        }
        return this.client;
    }
}

export default AppwriteConnection;
