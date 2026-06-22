import { spawnSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const suites = {
  server: {
    helper: './test/server/helpers/test-env.mjs',
    root: 'test/server',
    suffix: '.unit.test.ts'
  },
  api: {
    helper: './test/api/helpers/test-env.mjs',
    root: 'test/api',
    suffix: '.test.ts'
  }
}

const suiteName = process.argv[2]
const suite = suites[suiteName]

if (!suite) {
  console.error(`Usage: node scripts/run-node-tests.mjs ${Object.keys(suites).join('|')}`)
  process.exit(2)
}

const collectFiles = (dir, suffix) => {
  const files = []

  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    const stats = statSync(path)

    if (stats.isDirectory()) {
      files.push(...collectFiles(path, suffix))
    } else if (path.endsWith(suffix)) {
      files.push(path)
    }
  }

  return files.sort()
}

const files = collectFiles(suite.root, suite.suffix)

if (files.length === 0) {
  console.error(`No ${suiteName} tests found in ${suite.root}`)
  process.exit(1)
}

const result = spawnSync(process.execPath, [
  '--import',
  suite.helper,
  '--import',
  'tsx',
  '--test',
  '--test-force-exit',
  ...files
], {
  stdio: 'inherit'
})

process.exit(result.status ?? 1)
