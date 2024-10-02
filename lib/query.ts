import { Query } from 'appwrite';


type QueryOperator = 'equal' | 'notEqual' | 'greaterThan' | 'greaterThanEqual' | 'lessThan' | 'lessThanEqual' | 'search';

export class QueryBuilder {

    private queries: string[] = [];

    where(field: string, operator: QueryOperator, value: any): QueryBuilder {
        this.queries.push(Query[operator](field, value));
        return this;
    }

    limit(limit: number): QueryBuilder {
        this.queries.push(Query.limit(limit));
        return this;
    }

    offset(offset: number): QueryBuilder {
        this.queries.push(Query.offset(offset));
        return this;
    }

    build(): string[] {
        return this.queries;
    }
}
