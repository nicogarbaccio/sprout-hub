const { PrismaClient } = require('../src/generated/prisma');
const seedData = require('./seed-data');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed the database...');

  // Create a test user if it doesn't exist
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      username: 'testuser',
      name: 'Test User',
    },
  });

  console.log('Created test user:', testUser.username);

  // Add all plants from the JSON file
  for (const plant of seedData.plants) {
    const existingPlant = await prisma.plant.findFirst({
      where: {
        name: plant.name,
        species: plant.species,
        userId: testUser.id,
      },
    });

    if (!existingPlant) {
      await prisma.plant.create({
        data: {
          name: plant.name,
          species: plant.species,
          image: plant.image,
          wateringFrequency: plant.wateringFrequency,
          lastWatered: new Date(),
          userId: testUser.id,
        },
      });
      console.log(`Created plant: ${plant.name}`);
    } else {
      console.log(`Plant ${plant.name} already exists, skipping...`);
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error while seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 