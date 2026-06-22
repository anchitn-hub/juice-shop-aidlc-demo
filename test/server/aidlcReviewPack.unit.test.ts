/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'

import { verifyReviewPack } from '../../routes/aidlcReviewPack'

void describe('aidlcReviewPack', () => {
  void it('should return review pack verification metadata', () => {
    const req: any = {}
    const res: any = { json: mock.fn() }

    verifyReviewPack()(req, res)

    assert.deepEqual(res.json.mock.calls[0].arguments[0], {
      status: 'success',
      data: {
        issueKey: 'AIDLC-10',
        reviewPack: 'aidlc-smoke',
        verification: 'ready'
      }
    })
  })
})
