// data/pharmacyData.js

const medicines = [
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
  
  // Store active carts by session ID
  const activeCarts = {};
  
  export { medicines, activeCarts };
  