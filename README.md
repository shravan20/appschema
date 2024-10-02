# AppSchema: ODM for AppWrite DB

**AppSchema** is an ODM (Object Data Model) for Appwrite DB that simplifies interactions with Appwrite databases. It provides a structured way to define models, handle validation, and perform database operations with ease.

## Features

- **Model Definition**: Define database models using JSON schemas.
- **Repository Pattern**: Abstract database operations such as create, read, update, and delete (CRUD).
- **Query Builder**: Build queries easily with various filtering operators.
- **Validation**: Built-in validation of data using AJV.

## Features that needs to be implemented

- **Advanced Query Support**: Support for more complex queries like AND, OR, IN, NOT IN, and BETWEEN conditions within the QueryBuilder. Paginate results with customizable page sizes and cursor-based pagination.
- **Soft Deletes**: Implement soft delete functionality for documents that should not be permanently deleted from the database
- **Schema Migration System**: Schema migration feature to handle changes to database structure, including adding/removing fields, and data transformations.
- **Hooks and Middleware**: Support for hooks such as beforeCreate, afterCreate, beforeUpdate, and afterDelete for extending the behavior of repositories. Custom actions before or after specific database operations.
- **Validation Enhancements**: Extend validation capabilities with custom validation rules.
- **Error Handling Improvements**: Implement custom error classes for specific error scenarios
- **Role-based Access Control (RBAC)**: role-based access control system for managing user permissions on model-level operations.
- **CLI Tooling**: Generating models, repositories, and running migrations
- **File Management Integration**: Appwrite’s file management service to support uploading, downloading, and associating files with models
- **Configuration Options**: Configuration options for customizing the behavior of the ODM to better suit various use cases.
- **Documentation and Examples**: Provide detailed documentation and examples for common use cases and advanced features.
- **Lot more can be built**: Do raise feature requests

## Installation

To install the AppSchema package, run:

```bash
npm install appschema
```

## Directory Structure

```
lib/
  ├── index.ts         # Entry point
  ├── connection.ts    # Appwrite connection handling
  ├── model.ts         # Model definition and schema validation
  ├── query.ts         # Fluent query builder
  └── repository.ts    # CRUD operations
  └── schema.ts        # Schema validation logic
```

## Usage

### Initialize Appwrite Connection

```
const { AppwriteConnection } = require('appschema');

const endpoint = '<https://your-appwrite-server.com/v1>';
const projectId = 'your-project-id';

AppwriteConnection.initialize(endpoint, projectId);
```

### Connection Handling

```javascript
AppwriteConnection.initialize('<https://appwrite.io>', 'projectId');
```

### Model definition

```typescript
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

or

```javascript
const { Model } = require('appschema');

const userSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', default: '' },
        age: { type: 'number', default: 18 }
    },
    required: ['name', 'age'],
    additionalProperties: false
};

const userModel = new Model(userSchema, 'your-collection-id', 'your-database-id');
```

### Perform DAL operations

```
const { Repository } = require('appschema');

// Create a repository for the User model

const userRepository = new Repository(userModel);

const newUser = { name: 'John Doe', age: 30 };

userRepository.create(newUser).then((document) => {
    console.log('Created document:', document);
}).catch((err) => {
    console.error('Error creating document:', err);
});

```

### Builder queries

Note: This is not in production currently.

```
const { QueryBuilder } = require('appschema');

// Build a query to find users older than 20
const query = new QueryBuilder()
    .where('age', 'greaterThan', 20)
    .build();

userRepository.find(query).then((documents) => {
    console.log('Found documents:', documents);
});
```

## Contributing

Feel free to contribute by submitting a pull request or reporting issues.
