import { Router } from 'express'

const router = Router()

router.post(
  '/me',
  (req, res, next) => {
    res.json({
      name: 'It\'s me Mario',
    })
  }
)

export default router
