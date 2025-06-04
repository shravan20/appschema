import { Query } from 'node-appwrite';
import { ValidationError } from './errors/validation-error';


type QueryOperator = 'equal' | 'notEqual' | 'greaterThan' | 'greaterThanEqual' | 'lessThan' | 'lessThanEqual' | 'search';

export class QueryBuilder {

    private queries: string[] = [];

    where(field: string, operator: QueryOperator, value: any): QueryBuilder {
        this.queries.push(Query[operator](field, value));
        return this;
    }

    limit(limit: number): QueryBuilder {

        if (limit < 0) {
            throw new ValidationError('limtit must be non-negative');
        }
        this.queries.push(Query.limit(limit));
        return this;
    }

    offset(offset: number): QueryBuilder {

        if (offset < 0) {
            throw new Error('offset must be a non-negative integer.');
        }
        this.queries.push(Query.offset(offset));
        return this;
    }

    orderBy(field: string, order: 'asc' | 'desc'): QueryBuilder {
        this.queries.push(order === 'desc' ? Query.orderDesc(field) : Query.orderAsc(field));
        return this;
    }

    clear(): QueryBuilder {
        this.queries = [];
        return this;
    }

    build(): string[] {
        return this.queries;
    }
}
