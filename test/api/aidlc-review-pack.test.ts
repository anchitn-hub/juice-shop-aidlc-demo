/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import type { Express } from 'express'
import { createTestApp } from './helpers/setup'

let app: Express

before(async () => {
  const result = await createTestApp()
  app = result.app
}, { timeout: 60000 })

void describe('/rest/aidlc/review-pack', () => {
  void it('GET review pack verification metadata', async () => {
    const res = await request(app)
      .get('/rest/aidlc/review-pack')

    assert.equal(res.status, 200)
    assert.match(res.headers['content-type'], /^application\/json/)
    assert.deepEqual(res.body, {
      status: 'success',
      data: {
        issueKey: 'AIDLC-10',
        reviewPack: 'aidlc-smoke',
        verification: 'ready'
      }
    })
  })
})

void describe('/rest/aidlc/pipeline-status', () => {
  void it('GET pipeline status', async () => {
    const res = await request(app)
      .get('/rest/aidlc/pipeline-status')

    assert.equal(res.status, 200)
    assert.match(res.headers['content-type'], /^application\/json/)
    assert.deepEqual(res.body, {
      status: 'success',
      data: {
        pipeline: 'golden'
      }
    })
  })
})
