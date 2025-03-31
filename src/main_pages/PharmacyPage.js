import React, { useState, useEffect } from 'react';
import './PharmacyPage.css';

const PharmacyPage = () => {
  // Initial medicine list with random stock
  const initialMedicines = [
    { id: 1, name: "Paracetamol 500mg", price: 25, stock: Math.floor(Math.random() * 50) + 10, category: "Pain Relief" },
    { id: 2, name: "Amoxicillin 250mg", price: 120, stock: Math.floor(Math.random() * 50) + 10, category: "Antibiotics" },
    { id: 3, name: "Cetirizine 10mg", price: 35, stock: Math.floor(Math.random() * 50) + 10, category: "Allergy" },
    { id: 4, name: "Omeprazole 20mg", price: 85, stock: Math.floor(Math.random() * 50) + 10, category: "Digestive" },
    { id: 5, name: "Metformin 500mg", price: 65, stock: Math.floor(Math.random() * 50) + 10, category: "Diabetes" },
    { id: 6, name: "Losartan 50mg", price: 145, stock: Math.floor(Math.random() * 50) + 10, category: "Hypertension" },
    { id: 7, name: "Atorvastatin 10mg", price: 180, stock: Math.floor(Math.random() * 50) + 10, category: "Cholesterol" },
    { id: 8, name: "Aspirin 75mg", price: 30, stock: Math.floor(Math.random() * 50) + 10, category: "Blood Thinner" },
    { id: 9, name: "Azithromycin 500mg", price: 160, stock: Math.floor(Math.random() * 50) + 10, category: "Antibiotics" },
    { id: 10, name: "Diazepam 5mg", price: 95, stock: Math.floor(Math.random() * 50) + 10, category: "Anxiety" },
    { id: 11, name: "Ibuprofen 400mg", price: 40, stock: Math.floor(Math.random() * 50) + 10, category: "Pain Relief" },
    { id: 12, name: "Levothyroxine 50mcg", price: 110, stock: Math.floor(Math.random() * 50) + 10, category: "Thyroid" },
    { id: 13, name: "Simvastatin 20mg", price: 165, stock: Math.floor(Math.random() * 50) + 10, category: "Cholesterol" },
    { id: 14, name: "Ramipril 5mg", price: 125, stock: Math.floor(Math.random() * 50) + 10, category: "Hypertension" },
    { id: 15, name: "Amlodipine 5mg", price: 115, stock: Math.floor(Math.random() * 50) + 10, category: "Hypertension" },
    { id: 16, name: "Metoprolol 50mg", price: 135, stock: Math.floor(Math.random() * 50) + 10, category: "Hypertension" },
    { id: 17, name: "Pantoprazole 40mg", price: 95, stock: Math.floor(Math.random() * 50) + 10, category: "Digestive" },
    { id: 18, name: "Montelukast 10mg", price: 195, stock: Math.floor(Math.random() * 50) + 10, category: "Respiratory" },
    { id: 19, name: "Escitalopram 10mg", price: 175, stock: Math.floor(Math.random() * 50) + 10, category: "Depression" },
    { id: 20, name: "Fluoxetine 20mg", price: 155, stock: Math.floor(Math.random() * 50) + 10, category: "Depression" },
    { id: 21, name: "Sertraline 50mg", price: 165, stock: Math.floor(Math.random() * 50) + 10, category: "Depression" },
    { id: 22, name: "Gabapentin 300mg", price: 210, stock: Math.floor(Math.random() * 50) + 10, category: "Neuropathic Pain" },
    { id: 23, name: "Ciprofloxacin 500mg", price: 140, stock: Math.floor(Math.random() * 50) + 10, category: "Antibiotics" },
    { id: 24, name: "Warfarin 5mg", price: 85, stock: Math.floor(Math.random() * 50) + 10, category: "Blood Thinner" },
    { id: 25, name: "Albuterol Inhaler", price: 250, stock: Math.floor(Math.random() * 50) + 10, category: "Respiratory" },
    { id: 26, name: "Lisinopril 10mg", price: 130, stock: Math.floor(Math.random() * 50) + 10, category: "Hypertension" },
    { id: 27, name: "Furosemide 40mg", price: 75, stock: Math.floor(Math.random() * 50) + 10, category: "Diuretic" },
    { id: 28, name: "Clopidogrel 75mg", price: 195, stock: Math.floor(Math.random() * 50) + 10, category: "Blood Thinner" },
    { id: 29, name: "Diclofenac 50mg", price: 45, stock: Math.floor(Math.random() * 50) + 10, category: "Pain Relief" },
    { id: 30, name: "Tramadol 50mg", price: 120, stock: Math.floor(Math.random() * 50) + 10, category: "Pain Relief" }
  ];

  // State hooks
  const [medicines, setMedicines] = useState(initialMedicines);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to add medicine to cart
  const addToCart = (medicineId) => {
    // Find the medicine in the list
    const medicineIndex = medicines.findIndex(med => med.id === medicineId);
    
    if (medicineIndex !== -1 && medicines[medicineIndex].stock > 0) {
      // Create a copy of medicines array
      const updatedMedicines = [...medicines];
      // Decrease the stock by 1
      updatedMedicines[medicineIndex] = {
        ...updatedMedicines[medicineIndex],
        stock: updatedMedicines[medicineIndex].stock - 1
      };
      setMedicines(updatedMedicines);

      // Check if medicine is already in cart
      const cartItemIndex = cart.findIndex(item => item.id === medicineId);
      
      if (cartItemIndex !== -1) {
        // If already in cart, increase quantity
        const updatedCart = [...cart];
        updatedCart[cartItemIndex] = {
          ...updatedCart[cartItemIndex],
          quantity: updatedCart[cartItemIndex].quantity + 1
        };
        setCart(updatedCart);
      } else {
        // If not in cart, add it with quantity 1
        setCart([...cart, {
          id: medicineId,
          name: medicines[medicineIndex].name,
          price: medicines[medicineIndex].price,
          quantity: 1
        }]);
      }
    }
  };

  // Function to remove item from cart
  const removeFromCart = (medicineId) => {
    // Find the item in the cart
    const cartItemIndex = cart.findIndex(item => item.id === medicineId);
    
    if (cartItemIndex !== -1) {
      // Create a copy of the cart
      const updatedCart = [...cart];
      
      // If quantity is more than 1, decrease quantity
      if (updatedCart[cartItemIndex].quantity > 1) {
        updatedCart[cartItemIndex] = {
          ...updatedCart[cartItemIndex],
          quantity: updatedCart[cartItemIndex].quantity - 1
        };
        setCart(updatedCart);
      } else {
        // If quantity is 1, remove item from cart
        setCart(cart.filter(item => item.id !== medicineId));
      }
      
      // Return one item to stock
      const medicineIndex = medicines.findIndex(med => med.id === medicineId);
      if (medicineIndex !== -1) {
        const updatedMedicines = [...medicines];
        updatedMedicines[medicineIndex] = {
          ...updatedMedicines[medicineIndex],
          stock: updatedMedicines[medicineIndex].stock + 1
        };
        setMedicines(updatedMedicines);
      }
    }
  };

  // Calculate total price of cart
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Function to place order
  const placeOrder = () => {
    if (cart.length > 0) {
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
        setCart([]);
      }, 3000);
    }
  };

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