import './App.css';
import React, { useState, useEffect } from 'react';
import ingredientData from './data/ingredients.json';
import IngredientsForm from './components/IngredientsForm';
import { Modal, ConfirmModal } from './components/modal';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  // For editing modal
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedUnit, setEditedUnit] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedWeight, setEditedWeight] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);


  // Storage 
  useEffect(() => {
    const saved = localStorage.getItem('ingredients');
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setIngredients(parsed);
      } else {
        setIngredients(ingredientData);
      }
    } catch (err) {
      console.error("invalid JSON in localstorage", err);
      setIngredients(ingredientData);
    }
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) {
      localStorage.setItem('ingredients', JSON.stringify(ingredients));
    }
  }, [ingredients]);

  const handleAmountChange = (id, value) => {
    setAmounts(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    ingredients.forEach(ingredient => {
      const amount = parseFloat(amounts[ingredient.id]) || 0;
      total += amount * ingredient.pricePerUnit;
    });
    setTotalCost(total);
  };

  const clearTotal = () => {
    setTotalCost(0);
    setAmounts({});
  };

  const addIngredient = (ingredient) => {
    setIngredients(prev => [...prev, ingredient]);
  };

  // Open modal and set fields for editing
  const handleEdit = (id) => {
    const ingredient = ingredients.find(i => i.id === id);
    setEditedName(ingredient.name);
    setEditedUnit(ingredient.unit);
    setEditedWeight(ingredient.weight);
    setEditedPrice(ingredient.price);
    setEditingId(id);
    setModalOpen(true);
  };

  const saveEdit = () => {
    const weight = parseFloat(editedWeight);
    const price = parseFloat(editedPrice);

    if (isNaN(weight) || isNaN(price) || weight <= 0 || price <= 0) {
      alert('Invalid weight or price');
      return;
    }

    setIngredients(prev =>
      prev.map(i =>
        i.id === editingId ? {
          ...i,
          name: editedName,
          unit: editedUnit,
          weight,
          price,
          pricePerUnit: price / weight,
        } : i
      )
    );

    // Reset and close modal
    setEditingId(null);
    setModalOpen(false);
    setEditedName('');
    setEditedUnit('');
    setEditedWeight('');
    setEditedPrice('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setModalOpen(false);
    setEditedName('');
    setEditedUnit('');
    setEditedWeight('');
    setEditedPrice('');
  };

  const handleDelete = (id) => {
  setConfirmDeleteId(id);
  setConfirmDeleteOpen(true);
};

const confirmDelete = () => {
  setIngredients(prev => prev.filter(i => i.id !== confirmDeleteId));
  setConfirmDeleteOpen(false);
  setConfirmDeleteId(null);
};

const cancelDelete = () => {
  setConfirmDeleteOpen(false);
  setConfirmDeleteId(null);
};


  return (
    <div className="App">
      <h1>Cake Ingredients Calculator</h1>

      <div id="ingredients-list">
        {ingredients.map(ingredient => (
          <div key={ingredient.id} className="ingredient-row">
  <div className="ingredient-info">
    <span className="ingredient-name">{ingredient.name}</span>
    <span className="ingredient-details">
      {ingredient.weight} {ingredient.unit} &nbsp; | &nbsp; £{ingredient.price !== undefined && ingredient.price !== null ? ingredient.price.toFixed(2) : '0.00'}
    </span>
  </div>

          <div className="ingredient-actions">
            <button onClick={() => handleEdit(ingredient.id)}>Edit</button>
            <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
            <input
              type="number"
              min="0"
              step="0.1"
              className="amount-input"
              value={amounts[ingredient.id] || ''}
              onChange={e => handleAmountChange(ingredient.id, e.target.value)}
            />
          </div>
        </div>

        ))}
      </div>
      <div className='total-buttons'>
        <button onClick={calculateTotal}>Calculate Total Cost</button>
        <button onClick={clearTotal}>Clear Total Cost</button>
      </div>
      <h2>Total Cost: £{totalCost.toFixed(2)}</h2>

      <IngredientsForm onAddIngredient={addIngredient} ingredients={ingredients} />

      {/* Modal for editing */}
      <Modal isOpen={modalOpen} onClose={cancelEdit}>
        <h2>Edit Ingredient</h2>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={editedUnit}
          onChange={(e) => setEditedUnit(e.target.value)}
          placeholder="Unit"
        />
        <input
          type="number"
          value={editedWeight}
          onChange={(e) => setEditedWeight(e.target.value)}
          placeholder="Weight"
        />
        <input
          type="number"
          value={editedPrice}
          onChange={(e) => setEditedPrice(e.target.value)}
          placeholder="Price"
        />
        <button onClick={saveEdit}>Save</button>
        <button onClick={cancelEdit}>Cancel</button>
      </Modal>
      
      <ConfirmModal
  isOpen={confirmDeleteOpen}
  message="Are you sure you want to delete this ingredient?"
  onConfirm={confirmDelete}
  onCancel={cancelDelete}
/>

    </div>
  );
}

export default App;
