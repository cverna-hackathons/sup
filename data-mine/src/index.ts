import { saveEntries, saveEntry } from './save';
import { readFileSync } from 'fs';

export const saveDataEntry = saveEntry;

export const saveEntriesFromFilePath = async (filePath: string) => {
  const entries = JSON.parse(readFileSync(filePath).toString());

  await saveEntries(entries);
}

// export function fetchAllPossibleQueryParams(
//   param: QueryParam
// ): Promise<string[]>;
//
// export function fetchDataSet(query: Query): Promise<Entry[]>;
