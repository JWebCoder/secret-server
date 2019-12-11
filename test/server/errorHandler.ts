import { Request, Response } from 'express'
export default (
  err: Error,
  req: Request ,
  res: Response
) => {
  res.status(500)
  if (process.env.NODE_ENV === 'development') {
    return res.json({
      error: err.message,
    })
  }
  res.json({
    error: 'error',
  })
}
