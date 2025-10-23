const { PrismaClient } = require('../generated/prisma')

const globalForPrisma = globalThis

export const db = globalForPrisma.prisma ?? new PrismaClient()

// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = db
