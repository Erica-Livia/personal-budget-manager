import React, { useState } from 'react';

const AddExpense = ({ dispatch }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(''); // Initialize with an empty or default category
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && category && date) {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: { amount: parseFloat(amount), category, date },
            });
            // Clear the form fields
            setAmount('');
            setCategory(''); // Reset the selected category
            setDate('');
        } else {
            alert('Please fill all the fields');
        }
    };

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-2 p-2 w-full bg-black50 text-black" // Set text color to black for light background
            />

            {/* Dropdown for selecting category */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mb-2 p-2 w-full bg-black50 text-black" // Set text color to black for light background
            >
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Gas">Gas</option>
                <option value="Rent">Rent</option>
                <option value="Gym">Gym</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Travel">Travel</option>
                <option value="Vacation">Vacation</option>
                <option value="Gift">Gift</option>
            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mb-2 p-2 w-full bg-black50 text-black" // Set text color to black for light background
            />

            <button type="submit" className="bg-blue500 p-2 w-full text-white">
                Add Expense
            </button>
        </form>
    );
};

export default AddExpense;
