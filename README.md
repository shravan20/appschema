# AppSchema: ODM for AppWrite DB

## Directory Structure

```
src/
  ├── index.ts         # Entry point
  ├── connection.ts    # Appwrite connection handling
  ├── model.ts         # Model definition and schema validation
  ├── query.ts         # Fluent query builder
  └── repository.ts    # CRUD operations
  └── schema.ts        # Schema validation logic
```

## Usage

### Connection Handling

```javascript
AppwriteConnection.initialize('<https://appwrite.io>', 'projectId');
```

### Model definition

```javascript
import { Model } from './model';

type Book = {
    title: string;
    author: string;
    pages: number;
};

const bookSchema: JSONSchemaType<Book> = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        pages: { type: 'number' },
    },
    required: ['title', 'author', 'pages'],
    additionalProperties: false,
};

const BookModel = new Model<Book>(bookSchema, 'collectionId', 'databaseId');
```
