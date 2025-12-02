// server/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Inizio del seeding...');

    // 1. Creiamo le Categorie (o le troviamo se esistono già)
    const catCharcuterie = await prisma.category.upsert({
        where: { name: 'Charcuterie & Fromages' },
        update: {},
        create: { name: 'Charcuterie & Fromages' },
    });

    const catBoissons = await prisma.category.upsert({
        where: { name: 'Boissons & Vins' },
        update: {},
        create: { name: 'Boissons & Vins' },
    });

    const catConserves = await prisma.category.upsert({
        where: { name: 'Épicerie & Conserves' },
        update: {},
        create: { name: 'Épicerie & Conserves' },
    });

    console.log('✅ Categorie create.');

    // 2. Creiamo dei Prodotti di prova
    const p1 = await prisma.product.create({
        data: {
            name: 'Jambon Ibérique Pata Negra',
            description: 'Il re dei prosciutti. Stagionatura 36 mesi, gusto intenso e consistenza che si scioglie in bocca.',
            price: 89.90,
            stock: 10,
            categoryId: catCharcuterie.id,
            image: 'https://images.unsplash.com/photo-1590558620893-6c8206411267?q=80&w=600&auto=format' // Immagine placeholder
        }
    });

    const p2 = await prisma.product.create({
        data: {
            name: 'Manchego Affinato 12 Mesi',
            description: 'Formaggio di pecora DOP dalla Mancia. Sapore deciso e piccante.',
            price: 24.50,
            stock: 25,
            categoryId: catCharcuterie.id,
            image: 'https://images.unsplash.com/photo-1624806992066-5d519d559483?q=80&w=600&auto=format'
        }
    });

    const p3 = await prisma.product.create({
        data: {
            name: 'Rioja Reserva 2018',
            description: 'Vino rosso strutturato, note di vaniglia e frutti rossi.',
            price: 32.75,
            stock: 60,
            categoryId: catBoissons.id,
            image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=600&auto=format'
        }
    });

    console.log('✅ Prodotti creati!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });