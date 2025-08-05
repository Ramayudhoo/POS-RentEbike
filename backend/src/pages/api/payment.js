import dotenv from 'dotenv';
dotenv.config();

import Midtrans from 'midtrans-client';
import Cors from 'cors';

// Initializing the CORS middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: ['http://localhost:8081', 'https://pos-coba-solo.vercel.app'],
});

// Helper method to wait for a middleware to execute before continuing
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

// Initialize the Midtrans Snap client
const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      const { item_details, transaction_details } = req.body;

      console.log('Received data:', { item_details, transaction_details });

      // Validasi item_details dan transaction_details
      if (!item_details || !transaction_details) {
        throw new Error("item_details and transaction_details are required");
      }

      const grossAmount = item_details.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      if (grossAmount !== transaction_details.gross_amount) {
        throw new Error("gross_amount must equal the sum of item_details");
      }

      const parameter = {
        transaction_details: {
          order_id: transaction_details.order_id,
          gross_amount: transaction_details.gross_amount,
        },
        item_details: item_details,
        payment_type: "qris", // Set payment type to QRIS
      };

      const transaction = await snap.createTransaction(parameter);
      const token = transaction.token;

      // Simpan data transaksi ke Firestore


      // Simpan transactionData ke Firestore (gunakan fungsi yang sesuai untuk menyimpan data ke Firestore)

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error creating transaction:', error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}