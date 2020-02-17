// #!/usr/bin/env ts-node -- --project /var/www/sup/data-mine/tsconfig.json

import { saveEntriesFromFilePath } from './src/index'

let data = ''

process.stdin.on('data', chunk => {
  data = data + chunk.toString()
})

process.stdin.on('end', async () => {
  const filePaths = data
    .split('\n')
    .filter(f => f && f.length > 1)

  for (const filePath of filePaths) {
    await saveEntriesFromFilePath(filePath);
  }

  console.log('saved', filePaths)
})