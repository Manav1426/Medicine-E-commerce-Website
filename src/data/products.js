export const products = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      manufacturer: "PharmaCorp",
      price: 25,
      originalPrice: 30,
      description: "Effective pain reliever and fever reducer. Suitable for headaches, body aches, and fever.",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 150,
      ingredients: ["Paracetamol 500mg"],
      dosage: "1-2 tablets every 4-6 hours as needed",
      sideEffects: ["Nausea", "Stomach upset (rare)"],
      warnings: ["Do not exceed 8 tablets in 24 hours", "Avoid alcohol while taking this medication"]
    },
    {
      id: 2,
      name: "Amoxicillin 500mg",
      category: "Antibiotics",
      manufacturer: "MediPharm",
      price: 120,
      description: "Broad-spectrum antibiotic for treating various bacterial infections.",
      image: "https://images.pexels.com/photos/3683081/pexels-photo-3683081.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: true,
      stock: 75,
      ingredients: ["Amoxicillin 500mg"],
      dosage: "1 capsule every 8 hours for 7-10 days",
      sideEffects: ["Nausea", "Diarrhea", "Allergic reactions"],
      warnings: ["Complete the full course", "Inform doctor about allergies"]
    },
    {
      id: 3,
      name: "Vitamin D3 1000 IU",
      category: "Vitamins",
      manufacturer: "HealthPlus",
      price: 180,
      originalPrice: 200,
      description: "Essential vitamin for bone health and immune system support.",
      image: "https://images.pexels.com/photos/3683089/pexels-photo-3683089.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 200,
      ingredients: ["Cholecalciferol (Vitamin D3) 1000 IU"],
      dosage: "1 tablet daily with food",
      sideEffects: ["Rare: Hypercalcemia with excessive doses"],
      warnings: ["Store in cool, dry place", "Consult doctor if pregnant"]
    },
    {
      id: 4,
      name: "Omeprazole 20mg",
      category: "Digestive Health",
      manufacturer: "GastroMed",
      price: 85,
      description: "Proton pump inhibitor for treating acid reflux and stomach ulcers.",
      image: "https://images.pexels.com/photos/3683097/pexels-photo-3683097.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: true,
      stock: 100,
      ingredients: ["Omeprazole 20mg"],
      dosage: "1 capsule daily before breakfast",
      sideEffects: ["Headache", "Nausea", "Diarrhea"],
      warnings: ["Do not crush or chew capsules", "May interact with other medications"]
    },
    {
      id: 5,
      name: "Cetirizine 10mg",
      category: "Allergy Relief",
      manufacturer: "AllerCare",
      price: 45,
      description: "Antihistamine for treating allergies, hay fever, and hives.",
      image: "https://images.pexels.com/photos/3683105/pexels-photo-3683105.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 120,
      ingredients: ["Cetirizine Hydrochloride 10mg"],
      dosage: "1 tablet once daily",
      sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
      warnings: ["May cause drowsiness", "Avoid alcohol"]
    },
    {
      id: 6,
      name: "Ibuprofen 400mg",
      category: "Pain Relief",
      manufacturer: "PainAway",
      price: 35,
      originalPrice: 40,
      description: "Anti-inflammatory pain reliever for muscle pain and inflammation.",
      image: "https://images.pexels.com/photos/3683113/pexels-photo-3683113.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 90,
      ingredients: ["Ibuprofen 400mg"],
      dosage: "1 tablet every 6-8 hours as needed",
      sideEffects: ["Stomach upset", "Dizziness", "Headache"],
      warnings: ["Take with food", "Avoid if allergic to NSAIDs"]
    },
    {
      id: 7,
      name: "Metformin 500mg",
      category: "Diabetes",
      manufacturer: "DiabetCare",
      price: 95,
      description: "Medication for managing type 2 diabetes and blood sugar levels.",
      image: "https://images.pexels.com/photos/3683121/pexels-photo-3683121.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: true,
      stock: 85,
      ingredients: ["Metformin Hydrochloride 500mg"],
      dosage: "1-2 tablets twice daily with meals",
      sideEffects: ["Nausea", "Diarrhea", "Metallic taste"],
      warnings: ["Monitor blood sugar regularly", "Inform doctor about kidney problems"]
    },
    {
      id: 8,
      name: "Multivitamin Complex",
      category: "Vitamins",
      manufacturer: "VitaHealth",
      price: 250,
      description: "Complete daily vitamin and mineral supplement for overall health.",
      image: "https://images.pexels.com/photos/3683129/pexels-photo-3683129.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 180,
      ingredients: ["Vitamin A, B-Complex, C, D, E, Zinc, Iron, Calcium"],
      dosage: "1 tablet daily with breakfast",
      sideEffects: ["Rare: Stomach upset if taken on empty stomach"],
      warnings: ["Store away from children", "Do not exceed recommended dose"]
    },
    {
      id: 9,
      name: "Loratadine 10mg",
      category: "Allergy Relief",
      manufacturer: "AllerFree",
      price: 55,
      description: "Non-drowsy antihistamine for seasonal allergies and allergic reactions.",
      image: "https://images.pexels.com/photos/3683137/pexels-photo-3683137.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 140,
      ingredients: ["Loratadine 10mg"],
      dosage: "1 tablet once daily",
      sideEffects: ["Headache", "Dry mouth", "Fatigue"],
      warnings: ["Non-drowsy formula", "Consult doctor if pregnant"]
    },
    {
      id: 10,
      name: "Calcium Carbonate 500mg",
      category: "Supplements",
      manufacturer: "BoneStrong",
      price: 160,
      description: "Calcium supplement for bone health and muscle function.",
      image: "https://images.pexels.com/photos/3683145/pexels-photo-3683145.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 110,
      ingredients: ["Calcium Carbonate 500mg"],
      dosage: "1-2 tablets daily with meals",
      sideEffects: ["Constipation", "Bloating"],
      warnings: ["Take with vitamin D for better absorption", "Avoid with iron supplements"]
    },
    {
      id: 11,
      name: "Aspirin 75mg",
      category: "Cardiovascular",
      manufacturer: "HeartCare",
      price: 40,
      description: "Low-dose aspirin for cardiovascular protection and blood thinning.",
      image: "https://images.pexels.com/photos/3683153/pexels-photo-3683153.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: true,
      stock: 95,
      ingredients: ["Acetylsalicylic Acid 75mg"],
      dosage: "1 tablet daily with food",
      sideEffects: ["Stomach irritation", "Bleeding risk"],
      warnings: ["Monitor for bleeding", "Avoid if allergic to salicylates"]
    },
    {
      id: 12,
      name: "Zinc Sulfate 50mg",
      category: "Supplements",
      manufacturer: "ImmuneBoost",
      price: 130,
      description: "Zinc supplement for immune system support and wound healing.",
      image: "https://images.pexels.com/photos/3683161/pexels-photo-3683161.jpeg?auto=compress&cs=tinysrgb&w=400",
      requiresPrescription: false,
      stock: 125,
      ingredients: ["Zinc Sulfate 50mg"],
      dosage: "1 tablet daily with food",
      sideEffects: ["Nausea", "Stomach upset", "Metallic taste"],
      warnings: ["Take with food to reduce stomach upset", "Do not exceed recommended dose"]
    }
  ];
  
  export const categories = [
    "All",
    "Pain Relief",
    "Antibiotics",
    "Vitamins",
    "Digestive Health",
    "Allergy Relief",
    "Diabetes",
    "Supplements",
    "Cardiovascular"
  ];
  
  export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };
  
  export const getProductsByCategory = (category) => {
    if (category === "All") return products;
    return products.filter(product => product.category === category);
  };
  
  export const searchProducts = (query) => {
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.manufacturer.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  };