import axios from 'axios';
import Cors from 'cors';
import admin from 'firebase-admin';
import dotenv from 'dotenv'; // Tambahkan import dotenv

dotenv.config(); // Panggil dotenv.config() untuk memuat variabel lingkungan

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method untuk menjalankan middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  await runMiddleware(req, res, cors); // Jalankan middleware CORS

  if (req.method === 'GET') {
    try {
      console.log('Fetching transactions from Midtrans...');
      const response = await axios.get('https://api.sandbox.midtrans.com/v2/transactions', {
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY).toString('base64')}`, // Ganti dengan variabel lingkungan
          'Content-Type': 'application/json',
        },
      });

      const transactions = response.data;

      // Simpan transaksi ke Firestore
      const batch = db.batch();
      transactions.forEach(transaction => {
        const docRef = db.collection('transactions').doc(transaction.order_id);
        batch.set(docRef, transaction);
      });
      await batch.commit();

      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}