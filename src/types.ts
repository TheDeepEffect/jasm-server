import { PrismaClient } from '@prisma/client'
import { CookieOptions } from 'express'
import { PubSub } from 'graphql-subscriptions'

export type cookie = {
  name: string,
  value: string,
  options: CookieOptions
}
export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
  userId: string
  setCookies: cookie[]
  setHeaders: []
}
export interface Token {
  userId: string
  type: string
  timestamp: number
}