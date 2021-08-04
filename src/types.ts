import { PrismaClient } from '@prisma/client'
import { CookieOptions } from 'express'

export type cookie = {
  name: string,
  value: string,
  options: CookieOptions
}
export interface Context {
  prisma: PrismaClient
  setCookies: cookie[]
  setHeaders: []
}
export interface Token {
  userId: string
  type: string
  timestamp: number
}