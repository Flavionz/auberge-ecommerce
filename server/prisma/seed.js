const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Début du seeding...');

    // ── Catégories ─────────────────────────────────────────────────────────────
    const catCharcuterie = await prisma.category.upsert({
        where: { name: 'Charcuterie & Fromages' },
        update: { tvaRate: 5.5 },
        create: { name: 'Charcuterie & Fromages', tvaRate: 5.5 },
    });

    const catBoissons = await prisma.category.upsert({
        where: { name: 'Boissons & Vins' },
        update: { tvaRate: 20 },
        create: { name: 'Boissons & Vins', tvaRate: 20 },
    });

    const catConserves = await prisma.category.upsert({
        where: { name: 'Épicerie & Conserves' },
        update: { tvaRate: 5.5 },
        create: { name: 'Épicerie & Conserves', tvaRate: 5.5 },
    });

    console.log('✅ Catégories créées.');

    // ── Produits ordinables ────────────────────────────────────────────────────
    const products = [
        {
            name: 'Jambon Ibérique Pata Negra',
            description: "Le roi des jambons. Affiné 36 mois, saveur intense et texture fondante en bouche. Élevage en plein air, alimentation aux glands.",
            price: 89.90,
            stock: 10,
            categoryId: catCharcuterie.id,
            image: 'https://picsum.photos/seed/jambon/800/600',
        },
        {
            name: 'Manchego Affiné 12 Mois',
            description: "Fromage de brebis DOP de La Mancha. Saveur prononcée et légèrement piquante. Parfait en plateau ou râpé sur des pâtes.",
            price: 24.50,
            stock: 25,
            categoryId: catCharcuterie.id,
            image: 'https://picsum.photos/seed/manchego/800/600',
        },
        {
            name: 'Rioja Reserva 2018',
            description: "Vin rouge structuré aux notes de vanille et fruits rouges. Vieilli 12 mois en fûts de chêne américain. Idéal avec les viandes rôties.",
            price: 32.75,
            stock: 60,
            categoryId: catBoissons.id,
            image: 'https://picsum.photos/seed/rioja/800/600',
        },
        {
            name: 'Planche',
            description: "Une sélection généreuse de charcuteries et fromages espagnols soigneusement choisis : jambon ibérique, lomo, chorizo artisanal et fromage manchego affiné. Une invitation au voyage, à partager sans modération.",
            price: 28.90,
            stock: 12,
            categoryId: catCharcuterie.id,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837979/1773823181571-planche_1_persona_hxrpke.png',
        },
        {
            name: 'La Planche des Deux',
            description: "Une planche généreuse pour deux, composée d'une sélection de charcuteries ibériques, jambon, lomo, chorizo, accompagnée de fromages affinés et de conserves espagnoles. Parfaite pour un apéritif dînatoire ou un moment gourmand en tête-à-tête.",
            price: 49.90,
            stock: 8,
            categoryId: catCharcuterie.id,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837978/1773823400857-planche2_criypv.jpg',
        },
        {
            name: 'Chorizo Ibérique Extra',
            description: "Chorizo artisanal au paprika fumé de La Vera. Texture ferme, goût intense. Se déguste en tranches fines avec du pain de campagne.",
            price: 18.50,
            stock: 30,
            categoryId: catCharcuterie.id,
            image: 'https://picsum.photos/seed/chorizo/800/600',
        },
        {
            name: 'Pimientos del Piquillo',
            description: "Poivrons rouges doux grillés au feu de bois, en conserve. Récoltés à Lodosa, Navarre. Incontournables de la cuisine espagnole.",
            price: 8.90,
            stock: 45,
            categoryId: catConserves.id,
            image: 'https://picsum.photos/seed/pimientos/800/600',
        },
    ];

    for (const product of products) {
        const exists = await prisma.product.findFirst({ where: { name: product.name } });
        if (exists) {
            await prisma.product.update({
                where: { id: exists.id },
                data: { image: product.image },
            });
        } else {
            await prisma.product.create({ data: product });
        }
    }

    console.log('✅ Produits créés.');

    // ── Produits vitrine (homepage) ────────────────────────────────────────────
    const featured = [
        {
            title: 'Charcuterie Artisanale',
            category: 'Charcuterie',
            position: 1,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837978/1772137345523-572062357_1380595824073545_8929580553375581405_n_e9vx4h.jpg',
        },
        {
            title: 'Sélection de Fromages',
            category: 'Fromages',
            position: 2,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837978/fromage-selection_xrawr4.jpg',
        },
        {
            title: 'Fromages Affinés',
            category: 'Fromages',
            position: 3,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837990/fromage-artisanal_plmumc.jpg',
        },
        {
            title: "Vins d'Exception",
            category: 'Vins',
            position: 4,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837979/vins-selection_jr2ulh.jpg',
        },
        {
            title: 'Épicerie Fine',
            category: 'Épicerie',
            position: 5,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837979/epicerie-fine_vr3nrb.jpg',
        },
        {
            title: 'Sangria Authentique',
            category: 'Boissons',
            position: 6,
            image: 'https://res.cloudinary.com/dxxsgbitl/image/upload/v1773837979/sangria-lolailo_co05q5.jpg',
        },
    ];

    for (const item of featured) {
        // Remove any duplicate records for this position (safety net)
        const allAtPosition = await prisma.featuredProduct.findMany({ where: { position: item.position } });
        if (allAtPosition.length > 1) {
            const sorted = allAtPosition.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            await prisma.featuredProduct.deleteMany({ where: { id: { in: sorted.slice(1).map(r => r.id) } } });
        }
        const exists = await prisma.featuredProduct.findFirst({ where: { position: item.position } });
        if (exists) {
            // Preserve admin customisations — only ensure the record is active
            await prisma.featuredProduct.update({ where: { id: exists.id }, data: { isActive: true } });
        } else {
            await prisma.featuredProduct.create({ data: { ...item, isActive: true } });
        }
    }

    console.log('✅ Produits vitrine créés.');

    // ── Utilisateurs demo ──────────────────────────────────────────────────────
    const adminPassword  = await bcrypt.hash('admin123', 10);
    const clientPassword = await bcrypt.hash('client123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@auberge.com' },
        update: { password: adminPassword, role: 'admin', isEmailVerified: true },
        create: {
            email: 'admin@auberge.com',
            password: adminPassword,
            role: 'admin',
            isEmailVerified: true,
            civility: 'M.',
            firstName: 'Stéphane',
            lastName: 'Milhau',
            phone: '+33 6 89 66 91 15',
            address: '33 Rue des Chenevières',
            city: 'La Maxe',
            postalCode: '57140',
        },
    });

    await prisma.user.upsert({
        where: { email: 'client@auberge.com' },
        update: { password: clientPassword, isEmailVerified: true },
        create: {
            email: 'client@auberge.com',
            password: clientPassword,
            role: 'user',
            isEmailVerified: true,
            civility: 'Mme',
            firstName: 'Marie',
            lastName: 'Dupont',
            phone: '+33 6 12 34 56 78',
            address: '12 Rue des Jardins',
            city: 'Metz',
            postalCode: '57000',
        },
    });

    console.log('✅ Utilisateurs demo créés.');
    console.log('');
    console.log('   👤 Admin  : admin@auberge.com  / admin123');
    console.log('   👤 Client : client@auberge.com / client123');
    console.log('');
    // Reset all auto-increment sequences (prevents unique constraint errors after manual data changes)
    const tables = ['User', 'Category', 'Product', 'Order', 'FeaturedProduct'];
    for (const table of tables) {
        await prisma.$executeRawUnsafe(
            `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE(MAX(id), 1)) FROM "${table}"`
        );
    }
    console.log('✅ Séquences réinitialisées.');
    console.log('🎉 Seeding terminé.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
