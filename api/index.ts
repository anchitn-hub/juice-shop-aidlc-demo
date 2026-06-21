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

function restoreJuiceShopPath (req: VercelRequest) {
  const rawPath = req.query?.juicePath
  const juicePath = Array.isArray(rawPath) ? rawPath[0] : rawPath

  if (juicePath) {
    req.url = juicePath.startsWith('/') ? juicePath : `/${juicePath}`
  }
}

export default async function handler (req: VercelRequest, res: unknown) {
  restoreJuiceShopPath(req)
  const app = await getApp()
  return app(req as never, res as never)
}
