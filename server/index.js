const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hola! Il server Auberge Espagnol è online 🇪🇸');
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error("Errore di recupero categorie:", error);
        res.status(500).json({ error: 'Erreur de récupération des catégories' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        res.json(products.map(p => ({
            ...p,
            image: p.image ? `http://localhost:${PORT}${p.image}` : null
        })));
    } catch (error) {
        console.error("Errore nel recupero prodotti:", error);
        res.status(500).json({ error: 'Erreur dans la récupération des produits' });
    }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, description, price, stock, categoryId } = req.body;

    const imageRelativePath = req.file ? `/uploads/${req.file.filename}` : null;

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    const parsedCategoryId = parseInt(categoryId, 10);

    if (!name || isNaN(parsedPrice) || isNaN(parsedCategoryId)) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Errore nella pulizia del file non valido:", err);
            });
        }
        return res.status(400).json({ error: "Données manquantes: nom, prix ou catégorie sont requis." });
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: parsedPrice,
                stock: parsedStock,
                image: imageRelativePath,
                categoryId: parsedCategoryId,
            }
        });

        res.status(201).json({
            ...newProduct,
            image: newProduct.image ? `http://localhost:${PORT}${newProduct.image}` : null,
            message: 'Produit créé avec succès.'
        });

    } catch (error) {
        console.error("Errore salvataggio prodotto:", error);
        res.status(500).json({ error: 'Erreur interne du serveur lors de la publication.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
    console.log(`🔐 Auth API disponibile su http://localhost:${PORT}/api/auth`);
});