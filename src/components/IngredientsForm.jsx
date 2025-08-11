import React, { useState } from 'react';

function IngredientsForm({ onAddIngredient, ingredients }) {
  const [newName, setNewName] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName || !newUnit || !newWeight || !newPrice) {
      alert('Please fill in all fields');
      return;
    }

    const weight = parseFloat(newWeight);
    const price = parseFloat(newPrice);

    if (weight <= 0 || price <= 0) {
      alert('Weight and price must be positive numbers');
      return;
    }

    // Check if ingredient already exists
  const exists = ingredients.some(ing => ing.name.toLowerCase() === newName.toLowerCase());
  if (exists) {
    alert('This ingredient already exists!');
    return;
  }

    onAddIngredient({
      id: Date.now(),
      name: newName,
      unit: newUnit,
      weight,
      price,
      pricePerUnit: price / weight,
    });

    setNewName('');
    setNewUnit('');
    setNewWeight('');
    setNewPrice('');
  };

  return (
   <form onSubmit={handleSubmit}>
  <h2>Add New Ingredient</h2>

  <div className="input-group">
    <input
      type="text"
      placeholder="Ingredient Name"
      value={newName}
      onChange={e => setNewName(e.target.value)}
    />
    <div className="helper-tips">
      <strong>Ingredient Name:</strong> Choose a simple, clear name (e.g., <em>Flour</em>, <em>Eggs</em>).<br />
      Ingredient names must be unique — no duplicates allowed.<br />
      To edit later, use the <strong>Edit</strong> button next to the ingredient.
    </div>
  </div>

  <div className="input-group">
    <input
      type="text"
      placeholder="Unit (e.g. grams/individual)"
      value={newUnit}
      onChange={e => setNewUnit(e.target.value)}
    />
    <div className="helper-tips">
      <strong>Unit:</strong> This is how the ingredient is measured.<br />
      Examples:<br />
      Flour → <strong>grams</strong><br />
      Milk → <strong>ml</strong><br />
      Eggs → <strong>individual or S (single)</strong>
    </div>
  </div>

  <div className="input-group">
    <input
      type="number"
      placeholder="Total Weight"
      value={newWeight}
      onChange={e => setNewWeight(e.target.value)}
    />
    <div className="helper-tips">
      <strong>Total Weight:</strong> Enter the full weight or count of the product.<br />
      Example:<br />
      1.5kg flour → <strong>1500</strong><br />
      6 eggs → <strong>6</strong>
    </div>
  </div>

  <div className="input-group">
    <input
      type="number"
      placeholder="Total Price (£)"
      value={newPrice}
      onChange={e => setNewPrice(e.target.value)}
    />
    <div className="helper-tips">
      <strong>Total Price:</strong> Full price of the product.<br />
      Example: Flour (1500g) costs £0.78 → enter <strong>0.78</strong><br />
      (No need for the <strong>£</strong> symbol.)
    </div>
  </div>

  <button type="submit">Add Ingredient</button>
</form>


  );
}

export default IngredientsForm;
