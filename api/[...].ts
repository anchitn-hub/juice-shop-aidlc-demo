import type { Express } from 'express'

type VercelRequest = {
  url?: string
  query?: Record<string, string | string[] | undefined>
}

let appPromise: Promise<Express> | undefined

async function getApp () {
  appPromise ??= import('../server').then(async ({ createApp }) => {
    const { app } = await createApp({ inMemoryDb: true })
    return app
  })

  return appPromise
}

function stripVercelFunctionPrefix (req: VercelRequest) {
  if (req.url?.startsWith('/api/')) {
    req.url = req.url.substring('/api'.length)
  }
}

export default async function handler (req: VercelRequest, res: unknown) {
  stripVercelFunctionPrefix(req)
  const app = await getApp()
  return app(req as never, res as never)
}
