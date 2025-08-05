import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Sesuaikan dengan alamat IP komputer Anda
  timeout: 10000,
});

const initiatePayment = async (orderId: string, grossAmount: number, customerDetails: any) => {
  try {
    const response = await axios.post('http://localhost:3000/api/payment', {
      orderId,
      grossAmount,
      customerDetails
    });

    return response.data;
  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
};

export default initiatePayment;