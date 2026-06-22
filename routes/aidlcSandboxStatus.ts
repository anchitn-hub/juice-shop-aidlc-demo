/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'

export function sandboxStatus () {
  return (_req: Request, res: Response) => {
    res.json({
      status: 'success',
      data: 'sandbox safe'
    })
  }
}
