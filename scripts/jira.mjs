const [command, issueKeyOrSummary, ...rest] = process.argv.slice(2)

const jiraBaseUrl = process.env.JIRA_BASE_URL
const jiraEmail = process.env.JIRA_EMAIL
const jiraApiToken = process.env.JIRA_API_TOKEN
const jiraProjectKey = process.env.JIRA_PROJECT_KEY

if (!jiraBaseUrl || !jiraEmail || !jiraApiToken) {
  throw new Error('Missing Jira credentials in environment.')
}

const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64')

const jiraRequest = async (path, options = {}) => {
  const response = await fetch(`${jiraBaseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Jira request failed: ${response.status} ${body}`)
  }

  if (response.status === 204) return null
  return response.json()
}

const textNode = (text) => ({ type: 'text', text })
const paragraphNode = (text) => ({
  type: 'paragraph',
  content: [textNode(text)]
})
const headingNode = (level, text) => ({
  type: 'heading',
  attrs: { level },
  content: [textNode(text)]
})

const toAdf = (text) => {
  const content = []
  const lines = text.split('\n')

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim()
    if (!line) {
      index += 1
      continue
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/)
    if (heading) {
      content.push(headingNode(heading[1].length, heading[2]))
      index += 1
      continue
    }

    if (line.startsWith('- ')) {
      const items = []
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push({
          type: 'listItem',
          content: [paragraphNode(lines[index].trim().slice(2))]
        })
        index += 1
      }
      content.push({ type: 'bulletList', content: items })
      continue
    }

    const paragraphLines = [line]
    index += 1
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,3})\s+/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('- ')
    ) {
      paragraphLines.push(lines[index].trim())
      index += 1
    }
    content.push(paragraphNode(paragraphLines.join(' ')))
  }

  return { type: 'doc', version: 1, content }
}

const addComment = async (issueKey, text) => {
  await jiraRequest(`/rest/api/3/issue/${issueKey}/comment`, {
    method: 'POST',
    body: JSON.stringify({ body: toAdf(text) })
  })
}

const transitionByName = async (issueKey, transitionName) => {
  const transitions = await jiraRequest(`/rest/api/3/issue/${issueKey}/transitions`)
  const transition = transitions.transitions.find((item) => item.name.toLowerCase() === transitionName.toLowerCase())

  if (!transition) {
    throw new Error(`Could not find Jira transition named "${transitionName}".`)
  }

  await jiraRequest(`/rest/api/3/issue/${issueKey}/transitions`, {
    method: 'POST',
    body: JSON.stringify({ transition: { id: transition.id } })
  })
}

const createIssue = async (summary, description, issueType = 'Story') => {
  if (!jiraProjectKey) {
    throw new Error('Missing JIRA_PROJECT_KEY in environment or workflow input.')
  }

  const issue = await jiraRequest('/rest/api/3/issue', {
    method: 'POST',
    body: JSON.stringify({
      fields: {
        project: { key: jiraProjectKey },
        summary,
        description: toAdf(description),
        issuetype: { name: issueType }
      }
    })
  })

  return issue.key
}

const getIssue = async (issueKey) => {
  const issue = await jiraRequest(`/rest/api/3/issue/${issueKey}?fields=summary,description,status,issuetype`)
  return {
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status?.name,
    issueType: issue.fields.issuetype?.name
  }
}

switch (command) {
  case 'create': {
    const summary = issueKeyOrSummary
    const [description, issueType] = rest
    const issueKey = await createIssue(summary, description, issueType)
    process.stdout.write(issueKey)
    break
  }
  case 'comment':
    await addComment(issueKeyOrSummary, rest.join(' '))
    break
  case 'transition':
    await transitionByName(issueKeyOrSummary, rest.join(' '))
    break
  case 'get':
    process.stdout.write(JSON.stringify(await getIssue(issueKeyOrSummary), null, 2))
    break
  default:
    throw new Error(`Unknown Jira command: ${command}`)
}
