# Data store of SUP
Purpose is to provide simple way to save and fetch data sets used for machine learning models.

## Getting started
Just `npm install` and use provided npm scripts or exported functions from files via `node-ts filename.ts`

## How to use
### Save dataset
```typescript
// index.ts

interface Author {
    name: string;
    foreignId?: string;
    followers?: number;
    following?: number;
    totalArtCount?: number;
    soldArtCount?: number;
}

interface Size {
    width: number;
    height: number;
    unit: "in" | "cm"
}

interface Entry {
    imageBase64: string;
    material: string[];
    media: string[];
    subject: string[];
    style: string[];
    size: Size;
    title?: string;
    country?: string;
    price?: number;
    author?: Author;
}

function saveDataEntry(entry: Entry): Promise<boolean>
```

### Fetch dataset
```typescript
// index.ts

enum QueryParams {
    material,
    media,
    subject,
    style,
}

interface Query {
    material?: string[];
    media?: string[];
    subject?: string[];
    style?: string[];
}

function fetchAllPossibleQueryParams(param: QueryParam): Promise<string[]>
function fetchDataSet(query: Query): Promise<Entry[]>
```
