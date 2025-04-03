import React, { useState, useEffect } from 'react';
import './PharmacyPage.css';
import axios from 'axios'; // Make sure to install axios if not already installed

const PharmacyPage = () => {
  // State hooks
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate a session ID for cart management (or get from localStorage)
  const getSessionId = () => {
    let sessionId = localStorage.getItem('pharmacy_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now();
      localStorage.setItem('pharmacy_session_id', sessionId);
    }
    return sessionId;
  };

  const sessionId = getSessionId();
  const API_URL = 'http://localhost:5000/api/pharmacy';

  // Fetch medicines on component mount
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/medicines`);
        setMedicines(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch medicines. Please try again later.');
        setLoading(false);
        console.error('Error fetching medicines:', err);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_URL}/cart`, {
          headers: { 'session-id': sessionId }
        });
        setCart(response.data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchMedicines();
    fetchCart();
  }, [API_URL, sessionId]);

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add medicine to cart
  const addToCart = async (medicineId) => {
    try {
      const response = await axios.post(
        `${API_URL}/cart/add`,
        { medicineId, quantity: 1 },
        { headers: { 'session-id': sessionId } }
      );
      
      if (response.data.success) {
        // Update local state to reflect changes
        setCart(response.data.cart.items);
        // Update medicine stock in local state
        setMedicines(prevMedicines => 
          prevMedicines.map(med => 
            med.id === medicineId ? { ...med, stock: med.stock - 1 } : med
          )
        );
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // Function to remove item from cart
  const removeFromCart = async (medicineId) => {
    try {
      const response = await axios.post(
        `${API_URL}/cart/remove`,
        { medicineId, quantity: 1 },
        { headers: { 'session-id': sessionId } }
      );
      
      if (response.data.success) {
        // Update local state to reflect changes
        setCart(response.data.cart.items);
        // Update medicine stock in local state
        setMedicines(prevMedicines => 
          prevMedicines.map(med => 
            med.id === medicineId ? { ...med, stock: med.stock + 1 } : med
          )
        );
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  // Calculate total price of cart
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Function to place order
  const placeOrder = async () => {
    if (cart.length > 0) {
      try {
        const response = await axios.post(
          `${API_URL}/cart/checkout`,
          {},
          { headers: { 'session-id': sessionId } }
        );
        
        if (response.data.success) {
          setOrderPlaced(true);
          setCart([]);
          setTimeout(() => {
            setOrderPlaced(false);
          }, 3000);
        }
      } catch (err) {
        console.error('Error placing order:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading medicines...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pharmacy-page">
      <div className="pharmacy-header">
        <h1>HART Pharmacy</h1>
        <p>Quality medications at affordable prices. Check availability and order online.</p>
        
        <div className="search-section">
          <input 
            type="text" 
            placeholder="Search medicines by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="pharmacy-content">
        <div className="medicines-container">
          <h2>Available Medicines</h2>
          <div className="medicines-grid">
            {filteredMedicines.map(medicine => (
              <div key={medicine.id} className="medicine-card">
                <h3>{medicine.name}</h3>
                <p className="medicine-category">{medicine.category}</p>
                <p className="medicine-price">₹{medicine.price}</p>
                <p className="medicine-stock">Stock: {medicine.stock}</p>
                <button 
                  className="add-to-cart" 
                  onClick={() => addToCart(medicine.id)}
                  disabled={medicine.stock === 0}
                >
                  {medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="cart-item-actions">
                      <p className="item-total">₹{item.price * item.quantity}</p>
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="cart-total">
                  <h4>Total Amount:</h4>
                  <p>₹{totalPrice}</p>
                </div>
                <button 
                  className="place-order"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {orderPlaced && (
        <div className="order-confirmation">
          <div className="order-confirmation-content">
            <h3>Success!</h3>
            <p>Your order has been placed successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyPage;