const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const allLinks = await prisma.post.findMany()
  console.log(allLinks)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })