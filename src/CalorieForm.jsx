import React, { useState } from 'react';

const CalorieForm = ({ setResult }) => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [formula, setFormula] = useState('mifflin');
  const [bodyFat, setBodyFat] = useState('');

  const activityLevels = [
    { label: 'BMR (no activity)', value: 1.0 },
    { label: 'Sedentary', value: 1.2 },
    { label: 'Light', value: 1.375 },
    { label: 'Moderate', value: 1.465 },
    { label: 'Active', value: 1.55 },
    { label: 'Very Active', value: 1.725 },
    { label: 'Extra Active', value: 1.9 },
  ];
  const [sliderIndex, setSliderIndex] = useState(1); // Default to Sedentary
  const activity = activityLevels[sliderIndex].value;

  const calculate = () => {
    let bmr = 0;
    if (formula === 'mifflin') {
      bmr = gender === 'male'
        ? (10 * weight) + (6.25 * height) - (5 * age) + 5
        : (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else if (formula === 'harris') {
      bmr = gender === 'male'
        ? 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
        : 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    } else if (formula === 'katch' && bodyFat) {
      const leanMass = weight * (1 - bodyFat / 100);
      bmr = 370 + (21.6 * leanMass);
    }

    const maintenance = Math.round(bmr * activity);
    setResult({ maintenance });
  };

  return (
    <div className="form-container">
      <h2>Calorie Calculator</h2>

      <label>Gender</label>
      <div className="switch">
        <button className={gender === 'male' ? 'active' : ''} onClick={() => setGender('male')}>Male</button>
        <button className={gender === 'female' ? 'active' : ''} onClick={() => setGender('female')}>Female</button>
      </div>

      <label>Age (14-80)</label>
      <input type="number" min="14" max="80" value={age} onChange={e => setAge(+e.target.value)} />

      <label>Height (cm)</label>
      <input type="number" value={height} onChange={e => setHeight(+e.target.value)} />

      <label>Weight (kg)</label>
      <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} />

      <label>Activity Level: {activityLevels[sliderIndex].label}</label>
      <input
        type="range"
        min="0"
        max="6"
        step="1"
        value={sliderIndex}
        onChange={(e) => setSliderIndex(parseInt(e.target.value))}
      />

      <label>BMR Formula</label>
      <div className="switch">
        <button className={formula === 'mifflin' ? 'active' : ''} onClick={() => setFormula('mifflin')}>Mifflin</button>
        <button className={formula === 'harris' ? 'active' : ''} onClick={() => setFormula('harris')}>Harris-Benedict</button>
        <button className={formula === 'katch' ? 'active' : ''} onClick={() => setFormula('katch')}>Katch-McArdle</button>
      </div>

      {formula === 'katch' && (
        <>
          <label>Body Fat %</label>
          <input type="number" value={bodyFat} onChange={e => setBodyFat(e.target.value)} />
        </>
      )}

      <button className="calculate-btn" onClick={calculate}>Calculate</button>
    </div>
  );
};

export default CalorieForm;
