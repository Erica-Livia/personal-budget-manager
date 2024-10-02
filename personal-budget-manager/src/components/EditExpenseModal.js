import React, { useState } from 'react';

const EditExpenseModal = ({ expense, setEditModalOpen, dispatch }) => {
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const [date, setDate] = useState(expense.date);

    const handleUpdate = () => {
        dispatch({
            type: 'UPDATE_EXPENSE',
            payload: { id: expense.id, amount, category, date },
        });
        setEditModalOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl mb-4 text-black">Edit Expense</h2>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mb-2 p-2 w-full bg-gray-200 text-black" // Added text-black for input text color
                    placeholder="Amount"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mb-2 p-2 w-full bg-gray-200 text-black" // Added text-black for input text color
                    placeholder="Category"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mb-2 p-2 w-full bg-gray-200 text-black" // Added text-black for input text color
                />

                <div className="flex justify-end space-x-2 mt-4">
                    <button className="bg-red-500 text-white p-2 rounded" onClick={() => setEditModalOpen(false)}>
                        Cancel
                    </button>
                    <button className="bg-blue500 text-white p-2 rounded" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditExpenseModal;
