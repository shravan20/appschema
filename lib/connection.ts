import { Client } from 'node-appwrite';

class AppwriteConnection {
    private static client: Client;

    static initialize_(endpoint: string, project: string, apiKey: string) {

        if (this.client) {
            return; // Prevent re-initialization
        }
        this.client = new Client();
        this.client.setEndpoint(endpoint).setProject(project);
    }

    static initialize(endpoint: string, project: string) {

        if (this.client) {
            return; // Prevent re-initialization
        }
        this.client = new Client();
        this.client.setEndpoint(endpoint).setProject(project);
    }

    /**
     * The `initialize` function sets the endpoint and project for the client using the provided
     * parameters.
     * @param {string} endpoint - The `endpoint` parameter typically refers to the URL or address of
     * the server or service that your application will communicate with. It specifies the location
     * where your application can access the resources or services provided by the server.
     * @param {string} project - The `project` parameter typically refers to the name or identifier of
     * the project you are working on. It helps to specify which project the API requests or actions
     * are associated with.
     * @param {string} apiKey - The `apiKey` parameter is a unique identifier or token that is used to
     * authenticate and authorize access to a specific service or resource. It is typically provided by
     * the service provider and is required to make authenticated requests to the API or service.
     */
    /**
     * The function `getClient` returns the Appwrite client instance and throws an error if it is not
     * initialized.
     * @returns The `getClient()` method is returning the `client` object if it has been initialized.
     * If the `client` object has not been initialized, it will throw an error with the message
     * 'Appwrite client not initialized.'
     */
    static getClient(): Client {
        if (!this.client) {
            throw new Error('Appwrite client not initialized.');
        }
        return this.client;
    }
}

export default AppwriteConnection;
