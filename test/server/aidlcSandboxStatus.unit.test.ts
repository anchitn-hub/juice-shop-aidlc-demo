/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'

import { sandboxStatus } from '../../routes/aidlcSandboxStatus'

void describe('aidlcSandboxStatus', () => {
  void it('should return sandbox status metadata', () => {
    const req: any = {}
    const res: any = { json: mock.fn() }

    sandboxStatus()(req, res)

    assert.deepEqual(res.json.mock.calls[0].arguments[0], {
      status: 'success',
      data: 'sandbox safe'
    })
  })
})
