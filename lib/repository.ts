import { Databases, Models } from 'appwrite';
import { Model } from './model';
import AppwriteConnection from './connection';


export class Repository<T extends Record<string, any>> {
    private model: Model<T>;
    private database: Databases;

    constructor(model: Model<T>) {
        this.model = model;
        this.database = new Databases(AppwriteConnection.getClient());
    }

    async create(data: T) {
        this.model.validate(data);
        return await this.database.createDocument(
            this.model.getDatabaseId(),
            this.model.getCollectionId(),
            'unique()',
            data
        );
    }

    async findById(documentId: string): Promise<Models.Document> {
        return await this.database.getDocument<Models.Document>(
            this.model.getDatabaseId(),
            this.model.getCollectionId(),
            documentId
        );
    }

    async update(documentId: string, data: Partial<T>) {
        this.model.validate(data as T); // Ensure data is validated
        return await this.database.updateDocument(
            this.model.getDatabaseId(),
            this.model.getCollectionId(),
            documentId,
            data
        );
    }

    async delete(documentId: string) {
        return await this.database.deleteDocument(
            this.model.getDatabaseId(),
            this.model.getCollectionId(),
            documentId
        );
    }
}
