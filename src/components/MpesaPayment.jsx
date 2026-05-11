import React, { useState } from 'react';
import axios from 'axios';

const MpesaPayment = ({ totalAmount = 0, cartItems = [] }) => {
  const [loading, setLoading] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!phone) {
      setError('Please enter your phone number starting with 254.');
      return;
    }

    setLoading('Processing payment...');
    setSuccess('');
    setError('');

    try {
      const data = new FormData();
      data.append('phone', phone);
      data.append('amount', Number(totalAmount));
      data.append('items', JSON.stringify(cartItems));

      const response = await axios.post(
        'https://mary.alwaysdata.net/api/mpesa_payment',
        data
      );

      setLoading('');
      setSuccess(response.data.message || 'Payment successful!');
    } catch (err) {
      setLoading('');
      setError(err.response?.data?.message || err.message || 'Payment failed.');
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <h2>Lipa na Mpesa</h2>

      {cartItems.length > 0 && (
        <div className="mb-3">
          <h5>Products:</h5>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx}>
                {item.name || item.product_name} - KES{' '}
                {(item.price || item.product_cost).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-info">
        Total to pay: KES {Number(totalAmount).toLocaleString()}
      </p>

      <div className="col-md-6">
        <form onSubmit={submit}>
          {loading && <p className="text-warning">{loading}</p>}
          {success && <p className="text-success">{success}</p>}
          {error && <p className="text-danger">{error}</p>}

          <input
            type="tel"
            className="form-control"
            placeholder="Enter phone starting with 254"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <button className="btn btn-secondary w-100">Make Payment</button>
        </form>
      </div>
    </div>
  );
};

export default MpesaPayment;