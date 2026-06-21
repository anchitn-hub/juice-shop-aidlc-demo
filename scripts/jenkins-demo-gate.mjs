import { mkdir, writeFile } from 'node:fs/promises'

const issueKey = process.env.ISSUE_KEY || 'UNKNOWN'
const jenkinsUrl = process.env.JENKINS_URL
const jenkinsUser = process.env.JENKINS_USER
const jenkinsApiToken = process.env.JENKINS_API_TOKEN
const jenkinsJobName = process.env.JENKINS_JOB_NAME
const jenkinsJobToken = process.env.JENKINS_JOB_TOKEN

await mkdir('artifacts', { recursive: true })

if (!jenkinsUrl || !jenkinsUser || !jenkinsApiToken || !jenkinsJobName) {
  const body = [
    '# Jenkins Demo Gate',
    '',
    `Issue: ${issueKey}`,
    '',
    'Mode: simulated',
    '',
    'No Jenkins credentials were configured, so the GitHub workflow produced a Jenkins-equivalent validation artifact.',
    'The demo can still show the Jenkinsfile and this artifact as the external CI handoff point.',
    '',
    'Required manual merge state: unchanged. GitHub PR approval remains the final merge gate.'
  ].join('\n')
  await writeFile('artifacts/jenkins-demo-gate.md', body)
  console.log('Jenkins demo gate completed in simulated mode.')
  process.exit(0)
}

const crumbResponse = await fetch(`${jenkinsUrl.replace(/\/$/, '')}/crumbIssuer/api/json`, {
  headers: {
    Authorization: `Basic ${Buffer.from(`${jenkinsUser}:${jenkinsApiToken}`).toString('base64')}`
  }
})

const crumb = crumbResponse.ok ? await crumbResponse.json() : null
const headers = {
  Authorization: `Basic ${Buffer.from(`${jenkinsUser}:${jenkinsApiToken}`).toString('base64')}`
}
if (crumb?.crumbRequestField && crumb?.crumb) {
  headers[crumb.crumbRequestField] = crumb.crumb
}

const params = new URLSearchParams({ ISSUE_KEY: issueKey })
if (jenkinsJobToken) params.set('token', jenkinsJobToken)

const buildUrl = `${jenkinsUrl.replace(/\/$/, '')}/job/${encodeURIComponent(jenkinsJobName)}/buildWithParameters?${params}`
const response = await fetch(buildUrl, { method: 'POST', headers })

if (!response.ok) {
  const body = await response.text()
  throw new Error(`Jenkins trigger failed: ${response.status} ${body}`)
}

await writeFile('artifacts/jenkins-demo-gate.md', [
  '# Jenkins Demo Gate',
  '',
  `Issue: ${issueKey}`,
  '',
  'Mode: real Jenkins trigger',
  '',
  `Triggered job: ${jenkinsJobName}`,
  `Jenkins URL: ${jenkinsUrl}`
].join('\n'))

console.log('Jenkins job triggered.')
