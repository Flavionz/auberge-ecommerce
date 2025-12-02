const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer'); // NUOVO: per la gestione dell'upload dei file
const path = require('path'); // Per gestire i percorsi dei file
const fs = require('fs'); // Per cancellare i file in caso di errore
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// --- CONFIGURAZIONE MULTER (Upload Immagini) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Assicura che la directory 'uploads' esista prima di salvare
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Crea un nome file unico: timestamp-nomeoriginale.jpg
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// --- MIDDLEWARE ---
app.use(cors()); // Abilita le richieste cross-origin (dal frontend React)
app.use(express.json()); // Per leggere i body JSON
app.use(express.urlencoded({ extended: true })); // Per i dati del form
// NEW: Espone la cartella 'uploads' al browser (es. http://localhost:3000/uploads/immagine.jpg)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- ROTTE API ---

// ROTTA DI TEST
app.get('/', (req, res) => {
    res.send('Hola! Il server Auberge Espagnol è online 🇪🇸');
});

// ROTTA 1: GET - LEGGI TUTTE LE CATEGORIE (Usato dal form AddProduct)
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error("Errore di recupero categorie:", error);
        res.status(500).json({ error: 'Erreur de récupération des catégories' });
    }
});

// ROTTA 2: GET - LEGGI TUTTI I PRODOTTI (Usato dalla Boutique)
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true } // Includiamo anche il nome della categoria
        });
        res.json(products.map(p => ({
            ...p,
            // Aggiungiamo l'URL completo dell'immagine per il frontend
            image: p.image ? `http://localhost:${PORT}${p.image}` : null
        })));
    } catch (error) {
        console.error("Errore nel recupero prodotti:", error);
        res.status(500).json({ error: 'Erreur dans la récupération des produits' });
    }
});


// ROTTA 3: POST - CREA UN NUOVO PRODOTTO (Usato dal Backoffice)
app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, description, price, stock, categoryId } = req.body;

    // L'immagine è stata caricata da Multer, il percorso relativo è qui:
    const imageRelativePath = req.file ? `/uploads/${req.file.filename}` : null;

    // Convertiamo i valori numerici e l'ID
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    const parsedCategoryId = parseInt(categoryId, 10);

    // Validazione di base
    if (!name || isNaN(parsedPrice) || isNaN(parsedCategoryId)) {
        // Se i dati sono incompleti o errati, puliamo il file appena caricato
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Errore nella pulizia del file non valido:", err);
            });
        }
        return res.status(400).json({ error: "Données manquantes: nom, prix ou catégorie sont requis." }); // Messaggio in francese
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: parsedPrice,
                stock: parsedStock,
                image: imageRelativePath, // Salviamo il percorso relativo nel DB
                categoryId: parsedCategoryId,
            }
        });

        // Rispondiamo al frontend con l'oggetto creato
        res.status(201).json({
            ...newProduct,
            image: newProduct.image ? `http://localhost:${PORT}${newProduct.image}` : null,
            message: 'Produit créé avec succès.'
        });

    } catch (error) {
        console.error("Errore salvataggio prodotto:", error);
        res.status(500).json({ error: 'Erreur interne du serveur lors de la publication.' }); // Messaggio in francese
    }
});


// --- AVVIO DEL SERVER ---
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});