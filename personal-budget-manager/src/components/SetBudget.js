import React, { useState, useEffect } from 'react';

const SetBudget = ({ budget, setBudget }) => {
    const [localBudget, setLocalBudget] = useState(budget);

    // Handle form input for each category's budget
    const handleBudgetChange = (e, category) => {
        setLocalBudget({ ...localBudget, [category]: parseFloat(e.target.value) });
    };

    // Save the budget to the main state and localStorage
    const handleSaveBudget = () => {
        setBudget(localBudget);
        localStorage.setItem('budget', JSON.stringify(localBudget));
    };

    useEffect(() => {
        // Load budget from local storage when the component mounts
        const storedBudget = JSON.parse(localStorage.getItem('budget'));
        if (storedBudget) {
            setLocalBudget(storedBudget);
        }
    }, []);

    return (
        <div className="mb-4">
            <h2 className="text-xl mb-4 text-white">Set Budget</h2>
            <ul>
                {Object.keys(localBudget).map((category) => (
                    <li key={category} className="mb-2">
                        <label className="text-white">{category}:</label>
                        <input
                            type="number"
                            value={localBudget[category] || ''}
                            onChange={(e) => handleBudgetChange(e, category)}
                            className="ml-2 p-2 bg-gray-100 text-black"
                            placeholder="Enter budget"
                        />
                    </li>
                ))}
            </ul>
            <button
                className="bg-blue500 text-white p-2 mt-2 rounded"
                onClick={handleSaveBudget}
            >
                Save Budget
            </button>
        </div>
    );
};

export default SetBudget;
