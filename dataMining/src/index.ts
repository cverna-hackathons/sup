import { Entry, Query, QueryParam } from './index.d';

export function saveDataEntry(entry: Entry): Promise<boolean>;

export function fetchAllPossibleQueryParams(
  param: QueryParam
): Promise<string[]>;

export function fetchDataSet(query: Query): Promise<Entry[]>;
