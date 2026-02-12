// server/scripts/createAdmin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
    try {
        // Controlla se l'admin esiste già
        const existingAdmin = await prisma.user.findUnique({
            where: { email: 'admin@auberge.com' }
        });

        if (existingAdmin) {
            console.log('✅ Admin già esistente!');
            console.log('📧 Email: admin@auberge.com');
            console.log('🔑 Password: admin');
            return;
        }

        // Crea password hashata
        const hashedPassword = await bcrypt.hash('admin', 10);

        // Crea admin
        const admin = await prisma.user.create({
            data: {
                email: 'admin@auberge.com',
                password: hashedPassword,
                role: 'admin'
            }
        });

        console.log('✅ Admin creato con successo!');
        console.log('📧 Email:', admin.email);
        console.log('🔑 Password: admin');
        console.log('\n🚀 Ora puoi fare login con queste credenziali!');

    } catch (error) {
        console.error('❌ Errore:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();