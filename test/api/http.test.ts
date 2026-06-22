/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import type { Express } from 'express'
import config from 'config'
import { createTestApp } from './helpers/setup'

let app: Express

before(async () => {
  const result = await createTestApp()
  app = result.app
}, { timeout: 60000 })

void describe('HTTP', () => {
  void it('response must contain CORS header allowing all origins', async () => {
    const res = await request(app).get('/')
    assert.equal(res.status, 200)
    assert.equal(res.headers['access-control-allow-origin'], '*')
  })

  void it('response must contain sameorigin frameguard header', async () => {
    const res = await request(app).get('/')
    assert.equal(res.status, 200)
    assert.equal(res.headers['x-frame-options'], 'SAMEORIGIN')
  })

  void it('response must contain CORS header allowing all origins', async () => {
    const res = await request(app).get('/')
    assert.equal(res.status, 200)
    assert.equal(res.headers['x-content-type-options'], 'nosniff')
  })

  void it('response must not contain recruiting header', async () => {
    const res = await request(app).get('/')
    assert.equal(res.status, 200)
    assert.equal(res.headers['x-recruiting'], config.get('application.securityTxt.hiring'))
  })

  void it('response must not contain XSS protection header', async () => {
    const res = await request(app).get('/')
    assert.equal(res.status, 200)
    assert.equal(res.headers['x-xss-protection'], undefined)
  })

  void it('unexpected path under known sub-path caught by generic error handler', async () => {
    const res = await request(app).get('/rest/x')
    assert.equal(res.status, 500)
    assert.ok(res.text.includes('<title>Error: Unexpected path: /rest/x</title>'))
  })

  void it('proxy reuse verification endpoint returns success', async () => {
    const res = await request(app).get('/rest/proxy-reuse-verification')

    assert.equal(res.status, 200)
    assert.equal(res.body.status, 'success')
    assert.equal(res.body.data.proxyReuseVerified, true)
  })

  void it('proxy reuse verification endpoint reports forwarded request details', async () => {
    const res = await request(app)
      .get('/rest/proxy-reuse-verification')
      .set('X-Forwarded-Proto', 'https')
      .set('X-Forwarded-Host', 'juice.example.test')
      .set('X-Forwarded-For', '203.0.113.42')

    assert.equal(res.status, 200)
    assert.equal(res.body.data.protocol, 'https')
    assert.equal(res.body.data.hostname, 'juice.example.test')
    assert.equal(res.body.data.ip, '203.0.113.42')
    assert.equal(res.body.data.forwardedHost, 'juice.example.test')
  })
})
