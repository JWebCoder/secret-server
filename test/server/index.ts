import cookieSession from 'cookie-session'
import path from 'path'
import secretServer from '../../src'
import App from './app'

const defaultConfig = new App()
const noConfig = new App()
const redirectConfig = new App()
const missingFileConfig = new App()
const app = new App()

defaultConfig.start()
if (defaultConfig.server) {
  defaultConfig.server.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  }))
  defaultConfig.server.use(secretServer())
}
defaultConfig.end(3001)

noConfig.start()
if (noConfig.server) {
  noConfig.server.use(secretServer({
    password: 'test',
  }))
}
noConfig.end(3002)

redirectConfig.start()
if (redirectConfig.server) {
  redirectConfig.server.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  }))
  redirectConfig.server.use(secretServer({
    password: 'test',
    redirect: '/',
    successRedirect: '/success',
  }))
}
redirectConfig.end(3003)

missingFileConfig.start()
if (missingFileConfig.server) {
  missingFileConfig.server.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  }))
  missingFileConfig.server.use(secretServer({
    password: 'test',
    file: 'foo.html',
  }))
}
missingFileConfig.end(3004)

app.start()
if (app.server) {
  app.server.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  }))
  app.server.use(secretServer({
    password: 'test',
    file: path.join(__dirname, 'password.html'),
  }))
}
app.end(3005)

export default {
  app: app.server,
  defaultConfig: defaultConfig.server,
  noConfig: noConfig.server,
  redirectConfig: redirectConfig.server,
  missingFileConfig: missingFileConfig.server,
}
