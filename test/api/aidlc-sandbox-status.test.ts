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

void describe('/rest/aidlc/sandbox-status', () => {
  void it('GET sandbox status metadata', async () => {
    const res = await request(app)
      .get('/rest/aidlc/sandbox-status')

    assert.equal(res.status, 200)
    assert.match(res.headers['content-type'], /^application\/json/)
    assert.deepEqual(res.body, {
      status: 'success',
      data: 'sandbox safe'
    })
  })
})
