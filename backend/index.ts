import { prisma } from "./lib/prisma";

async function main() {
  
  const user = await prisma.user.delete({
    where: {
        id: ""
    }
  })
  const allUsers = await prisma.user.findMany({
    include: {
      
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });