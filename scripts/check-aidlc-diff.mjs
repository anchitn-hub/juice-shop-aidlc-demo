import { execFileSync } from 'node:child_process'

const codeChangeRequired = String(process.env.CODE_CHANGE_REQUIRED || 'true').toLowerCase() !== 'false'
const changedFiles = execFileSync('git', ['diff', '--name-only'], { encoding: 'utf8' })
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)

if (changedFiles.length === 0) {
  throw new Error('Codex did not change any files.')
}

const docsOnlyPrefixes = [
  'docs/',
  'artifacts/'
]
const docsOnlyFiles = new Set([
  'README.md'
])

const productFiles = changedFiles.filter((file) => {
  return !docsOnlyPrefixes.some((prefix) => file.startsWith(prefix)) && !docsOnlyFiles.has(file)
})

if (codeChangeRequired && productFiles.length === 0) {
  console.error('Changed files:')
  for (const file of changedFiles) console.error(`- ${file}`)
  throw new Error('Code change required, but Codex only changed documentation/artifacts.')
}

console.log('AIDLC diff guard passed.')
console.log('Changed files:')
for (const file of changedFiles) console.log(`- ${file}`)
