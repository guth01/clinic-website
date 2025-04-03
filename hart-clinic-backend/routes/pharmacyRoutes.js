import express from 'express';
import { medicines, activeCarts } from '../data/pharmacyData.js';

const router = express.Router();

router.get('/medicines', (req, res) => {
  try {
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medicines', error: error.message });
  }
});

router.get('/medicines/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const medicine = medicines.find(med => med.id === id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch medicine', error: error.message });
  }
});

router.get('/cart', (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || 'default-session';
    if (!activeCarts[sessionId]) {
      activeCarts[sessionId] = { items: [], total: 0 };
    }
    activeCarts[sessionId].total = activeCarts[sessionId].items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    res.status(200).json(activeCarts[sessionId]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
});

router.post('/cart/add', (req, res) => {
  try {
    const { medicineId, quantity = 1 } = req.body;
    const sessionId = req.headers['session-id'] || 'default-session';
    if (!activeCarts[sessionId]) {
      activeCarts[sessionId] = { items: [], total: 0 };
    }
    const medicineIndex = medicines.findIndex(med => med.id === parseInt(medicineId));
    if (medicineIndex === -1 || medicines[medicineIndex].stock < quantity) {
      return res.status(400).json({ success: false, message: 'Medicine not available in sufficient quantity' });
    }
    medicines[medicineIndex].stock -= quantity;
    const cartItemIndex = activeCarts[sessionId].items.findIndex(item => item.id === parseInt(medicineId));
    if (cartItemIndex !== -1) {
      activeCarts[sessionId].items[cartItemIndex].quantity += quantity;
    } else {
      activeCarts[sessionId].items.push({
        id: medicines[medicineIndex].id,
        name: medicines[medicineIndex].name,
        price: medicines[medicineIndex].price,
        quantity
      });
    }
    activeCarts[sessionId].total = activeCarts[sessionId].items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    res.status(200).json({ success: true, cart: activeCarts[sessionId] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add item to cart', error: error.message });
  }
});

router.post('/cart/remove', (req, res) => {
  try {
    const { medicineId, quantity = 1 } = req.body;
    const sessionId = req.headers['session-id'] || 'default-session';
    if (!activeCarts[sessionId] || !activeCarts[sessionId].items.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty or does not exist' });
    }
    const cartItemIndex = activeCarts[sessionId].items.findIndex(item => item.id === parseInt(medicineId));
    if (cartItemIndex === -1) {
      return res.status(400).json({ success: false, message: 'Item not found in cart' });
    }
    const medicineIndex = medicines.findIndex(med => med.id === parseInt(medicineId));
    if (medicineIndex !== -1) {
      medicines[medicineIndex].stock += quantity;
    }
    if (activeCarts[sessionId].items[cartItemIndex].quantity > quantity) {
      activeCarts[sessionId].items[cartItemIndex].quantity -= quantity;
    } else {
      activeCarts[sessionId].items.splice(cartItemIndex, 1);
    }
    activeCarts[sessionId].total = activeCarts[sessionId].items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    res.status(200).json({ success: true, cart: activeCarts[sessionId] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove item from cart', error: error.message });
  }
});

router.post('/cart/checkout', (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || 'default-session';
    if (!activeCarts[sessionId] || !activeCarts[sessionId].items.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty or does not exist' });
    }
    const order = {
      items: [...activeCarts[sessionId].items],
      total: activeCarts[sessionId].total,
      date: new Date(),
      orderId: Date.now()
    };
    activeCarts[sessionId] = { items: [], total: 0 };
    res.status(200).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to checkout', error: error.message });
  }
});

export default router;
