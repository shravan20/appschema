import Ajv, { JSONSchemaType } from 'ajv';
import { default as AppwriteConnection } from './connection';
import { Databases, Models as AppwriteModels } from 'appwrite';

const ajv = new Ajv();

export class Model<T extends Record<string, any>> { // Ensure T is an object
    private schema: JSONSchemaType<T>;
    private collectionId: string;
    private databaseId: string;
    private database: Databases;

    constructor(schema: JSONSchemaType<T>, collectionId: string, databaseId: string) {
        this.schema = schema;
        this.collectionId = collectionId;
        this.databaseId = databaseId;

        // Initialize Appwrite Databases
        const client = AppwriteConnection.getClient(); // Get Appwrite client
        this.database = new Databases(client);
    }

    validate(data: T): boolean {
        const validate = ajv.compile(this.schema);
        const valid = validate(data);
        if (!valid) {
            throw new Error(`Schema validation error: ${JSON.stringify(validate.errors)}`);
        }
        return true;
    }

    getCollectionId(): string {
        return this.collectionId;
    }

    getDatabaseId(): string {
        return this.databaseId;
    }

    // CRUD Operations
    async createDocument(documentId: string, data: Omit<T, '$id' | '$createdAt' | '$updatedAt' | '$permissions' | '$read' | '$write'>): Promise<AppwriteModels.Document> {
        let validateData = JSON.parse(JSON.stringify(data));
        this.validate(validateData); // Validate the data against the schema
        return await this.database.createDocument(this.databaseId, this.collectionId, documentId, data);
    }

    async getDocument(documentId: string): Promise<AppwriteModels.Document> {
        return await this.database.getDocument(this.databaseId, this.collectionId, documentId);
    }

    async updateDocument(documentId: string, data: Partial<T>): Promise<AppwriteModels.Document> {
        this.validate(data as T); // Validate the data against the schema
        return await this.database.updateDocument(this.databaseId, this.collectionId, documentId, data);
    }

    async deleteDocument(documentId: string): Promise<{}> {
        return await this.database.deleteDocument(this.databaseId, this.collectionId, documentId);
    }
}
