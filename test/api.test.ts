import request from 'supertest'
import servers from './server'

describe('Start dynamic controller', () => {
  const appAgent = request.agent(servers.app)
  const noConfigAgent = request.agent(servers.noConfig)
  const redirectConfigAgent = request.agent(servers.redirectConfig)
  const missingFileConfigAgent = request.agent(servers.missingFileConfig)
  const deafultConfigAgent = request.agent(servers.defaultConfig)

  it('/me should return a login page when not authorized', (done) => {
    appAgent.post(
      '/me'
    ).then(
      (response) => {
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toBe('text/html; charset=utf-8')
        done()
      }
    )
  })

  it('/me should return a json when authorized', (done) => {
    appAgent.post(
      '/me'
    ).send({secretSite: 'test'})
    .then(
      (response) => {
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toBe('application/json; charset=utf-8')
        expect(response.body.name).toBe('It\'s me Mario')
        done()
      }
    )
  })

  it('/me should return a json with not authorized when missing authorization and there is no config', (done) => {
    noConfigAgent.post(
      '/me'
    ).send({secretSite: 'test'})
    .then(
      (response) => {
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toBe('application/json; charset=utf-8')
        expect(response.body.error).toBe('Not authorized')
        done()
      }
    )
  })

  it('/me should redirect the user when missing authorization and redirect is set', (done) => {
    redirectConfigAgent.post(
      '/me'
    ).send()
    .then(
      (response) => {
        expect(response.status).toBe(302)
        expect(response.header.location).toBe('/')
        done()
      }
    )
  })

  it('/me should redirect the user when authorization is successful and success redirect is set', (done) => {
    redirectConfigAgent.post(
      '/me'
    ).send({secretSite: 'test'})
    .then(
      (response) => {
        expect(response.status).toBe(302)
        expect(response.header.location).toBe('/success')
        done()
      }
    )
  })

  it('/me after authorizated should jump directly to the endpoint', (done) => {
    redirectConfigAgent.post(
      '/me'
    ).send({secretSite: 'test'})
    .then(
      (response) => {
        expect(response.header['content-type']).toBe('application/json; charset=utf-8')
        expect(response.body.name).toBe('It\'s me Mario')
        done()
      }
    )
  })

  it('/me should return an error when authorization file is set but file not found', (done) => {
    missingFileConfigAgent.post(
      '/me'
    ).send()
    .then(
      (response) => {
        expect(response.status).toBe(500)
        expect(response.header['content-type']).toBe('text/html; charset=utf-8')
        expect(response.error).toBeTruthy()
        done()
      }
    )
  })

  it('not setting any config should load the default one', (done) => {
    deafultConfigAgent.post(
      '/me'
    ).send({secretSite: 'password'})
    .then(
      (response) => {
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toBe('application/json; charset=utf-8')
        expect(response.body.name).toBe('It\'s me Mario')
        done()
      }
    )
  })
})
