import React from 'react';
import MpesaPayment from './MpesaPayment';

const AddCart = ({ cart, setCart }) => {
  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Calculate total price of items in cart
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className='container mt-4'>
      <h2>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className='list-group mb-3'>
            {cart.map((item, index) => (
              <li
                key={index}
                className='list-group-item d-flex align-items-center justify-content-between'
              >
                <div className='d-flex align-items-center'>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      marginRight: '10px',
                    }}
                  />
                  <div>
                    <div>{item.name}</div>
                    <div className='text-warning'>
                      KES {Number(item.price).toLocaleString()}
                    </div>
                  </div>
                </div>

                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => removeItem(index)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h5>Total Items: {cart.length}</h5>
          <h5>Total Price: KES {totalPrice.toLocaleString()}</h5>

          {/* Pass total price and cart items to MpesaPayment */}
          <MpesaPayment totalAmount={totalPrice} cartItems={cart} />
        </>
      )}
    </div>
  );
};

export default AddCart;