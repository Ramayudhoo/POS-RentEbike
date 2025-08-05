import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import * as crypto from 'crypto';

admin.initializeApp();

const DOKU_CLIENT_ID = process.env.DOKU_CLIENT_ID!;
const DOKU_SHARED_KEY = process.env.DOKU_SHARED_KEY!;

export const createInvoice = functions.https.onRequest(async (req, res) => {
    const { amount, invoiceNumber, customerName, customerEmail } = req.body;

    const requestBody = {
        client_id: DOKU_CLIENT_ID,
        invoice: {
            amount: amount,
            invoice_number: invoiceNumber,
            expiry: {
                unit: "hours",
                duration: 1
            }
        },
        customer: {
            name: customerName,
            email: customerEmail
        },
        virtual_account_info: {
            merchant_unique_reference: invoiceNumber,
            locale: "en"
        }
    };

    const requestBodyString = JSON.stringify(requestBody);
    const signature = crypto.createHmac('sha256', DOKU_SHARED_KEY)
                            .update(requestBodyString)
                            .digest('hex');

    try {
        const response = await axios.post('https://api-sandbox.doku.com/checkout/v1/payment', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Signature': signature
            }
        });

        res.status(200).send({ paymentUrl: response.data.response.redirect_url });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).send({ error: (error as Error).message });
    }
});
