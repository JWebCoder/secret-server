import Debug from 'debug'
import express, { Express } from 'express'
import errorHandler from './errorHandler'
import routes from './routes'

let debug: Debug.Debugger

export default class App {
  public server: Express | undefined
  constructor() {
    debug = Debug(`nodejs-backend-setup`)
    debug('construting')
  }

  public start() {
    debug('creating appplication')
    this.server = express()
    debug('setting up middleware')
    this.server.use([
      express.json(), // for parsing application/json
    ])
  }

  public end(port: number) {
    if (this.server) {
      this.server.use('/', routes)

      this.server.use(errorHandler)
      this.server.listen(port, function() {
        debug('Process ' + process.pid + ' is listening on port 3001')
      })
    }
  }
}
