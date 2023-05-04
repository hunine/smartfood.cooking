# Rest Builder
## Document for BE developer

### Config:
* Config:
    * Config max size of query: MAX_SIZE
    * Config max page of query: MAX_PAGE
    * Config DEFAULT_PAGE or not it will get all the record
    * Config DEFAULT_SIZE or not it will get all the record
```javascript
RestBuilderConfig.config({
    MAX_SIZE: 20,
    MAX_PAGE: 100000,
    DEFAULT_PAGE: 1,
    DEFAULT_SIZE: 10
});
```
### Request transformer
#### Input
- Input will be formatted as below:
```typescript
interface ITransformContent {
    pagination: {
        page: number,
        size: number,
        offset: number
    },
    filters: {column: string, sign: '$eq' | '$gt' | '$lt'| '$like', value: string}[],
    sorts: {sort, order}[],
    search: string,
    main: string[],
    associates: string[],
    notDeleted: string[]

}
```

#### Custom method
- This class provide custom method to add filter, sort, search, pagination into query then we can easily adapt it into DataPersistenceService
- Add custom sort:
  - Visit document for frontend sorting here:
```javascript
// ASC sort
reqTransformed.addSort("created_at");
reqTransformed.addSort("full_name");
// DESC sort
reqTransformed.addSort("-created_at");
reqTransformed.addSort("-full_name");
```
- Add custom filter:
  - Visit document for frontend sorting here:
```javascript
// Filter with a normal field
reqTransformed.addFilter(`username|$eq|${value}`);

/**
 * Filter with date range
 */
reqTransformed.addFilter(`created_at|$gt|${startDate}`);
reqTransformed.addFilter(`created_at|$lt|${endDate}`);
```
- Add custom pagination:
```javascript
/**
 * We can set page and size as we want
 */
reqTransformed.setPage(0);
reqTransformed.setSize(10);

/**
 * We can also clear page and size for not pagination
 * Or clear size for unlimited get
 */
reqTransformed.clearPage();
reqTransformed.clearSize();
```
- Add custom search:
```javascript
reqTransformed.addSearch();
```
### Data handler
#### DataPersistenceService
 - Construct with DataRepository
 - Provide useful method to adapt with request transformer like:
```typescript
interface IDataResponse<T> {
    content: T[]
    meta: {
        totalRecord: number;
        currentPage: number;
        currentSize: number;
    }
}

interface Validator {
    validate(input): Promise<void> | void
}

getAndCount(requestTransformer: ITransformContent): [IDataResponse<T>, number]

get(requestTransformer: ITransformContent): IDataResponse<T>

```
#### DataRepository
- Provide method that accept Query Class to build query
- Query class provide method to add filter, sort, search field into query builder

### Query Builder default

## Document for Front-end

### Pagination
- Pagination will provide query in url params to pagination
- Page and size were set default in backend as the config
```javascript
localhost:3000?page=1&size=10
localhost:3000?page=1
localhost:3000?size=10
```
### Filter
- Filter sign:
```typescript
enum FilterSign {
    $eq, // Equal to value
    $lt, // Greater than
    $gt, // Less than
    $like // Search with %like% in sql
}
```
- Query:
```javascript
localhost:3000?filter=${column}|${sign}|${value}

Example:
localhost:3000?filter=username|$eq|someName // Normal filter

localhost:3000?filter=startDate|$gt|${startDate}&filter=startDate|$lt|${startDate} // Filter with date

```
### Sort
- Query:
- Sort direction:
```typescript
enum SortDirection {
    '+', // Increase
    '-' // Decrease
}
```

```javascript
localhost:3000?sort=${direction}${column}

Example:
localhost:3000?sort=firstName // Sort as increasing firstName
localhost:3000?sort=-firstName // Sort as decreasing firstName
```
### Search
- Just simply put the value in query search
Example:
```
localhost:3000?search=value // Search
```
