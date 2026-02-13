const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
    { name: 'Charcuterie & Fromages' },
    { name: 'Boissons & Vins' },
    { name: 'Épicerie & Conserves' },
];

async function seedCategories() {
    try {
        for (const category of categories) {
            await prisma.category.upsert({
                where: { name: category.name },
                update: {},
                create: category,
            });
        }
        console.log('✅ Categories seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding categories:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedCategories();