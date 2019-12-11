import { NextFunction, Request, Response } from 'express'
import fs from 'fs'

export interface IConfiguration {
  password: string,
  successRedirect?: string,
  redirect?: string,
  file?: string,
}

const defaultConfig = {
  password: 'password',
}

const sendPasswordPage = (res: Response, config: IConfiguration, next: NextFunction) => {
  if (config.redirect) {
    res.redirect(config.redirect)
  } else if (config.file) {
    fs.readFile(config.file, (err, content) => {
      if (err) {
        return next(err)
      }
      res.type('html')
      res.send(content)
    })
  } else {
    res.json({error: 'Not authorized'})
  }
}

export default function(config: IConfiguration = defaultConfig) {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
      return sendPasswordPage(res, config, next)
    } else if (!req.session.secretSite) {
      req.session.secretSite = {
        valid: false,
      }
    }
    if (req.session.secretSite.valid === true) {
      return next()
    }
    if (req.body.secretSite === config.password) {
      req.session.secretSite.valid = true
      if (config.successRedirect) {
        return res.redirect(config.successRedirect)
      }
      return next()
    }
    return sendPasswordPage(res, config, next)
  }
}
