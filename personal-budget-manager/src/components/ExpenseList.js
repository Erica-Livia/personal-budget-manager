import React, { useState } from 'react';
import EditExpenseModal from './EditExpenseModal';
import DeleteWarningModal from './DeleteWarningModal';

// Define a color map for categories
const categoryColors = {
    Groceries: '#f8b400', // Yellow
    Gas: '#ff4d4d', // Red
    Rent: '#00aaff', // Blue
    Gym: '#ffcc00', // Light Orange
    Restaurant: '#ff8000', // Orange
    Travel: '#00cc66', // Green
    Vacation: '#9966ff', // Purple
    Gift: '#ff3399', // Pink
};


const getTextColor = (bgColor) => {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'text-black' : 'text-white';
};

const ExpenseList = ({ expenses, dispatch }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    // Function to open edit modal
    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setEditModalOpen(true);
    };

    // Function to open delete confirmation
    const handleDeleteWarning = (expense) => {
        setSelectedExpense(expense);
        setDeleteWarningOpen(true);
    };

    // Function to confirm deletion
    const handleDelete = () => {
        dispatch({ type: 'DELETE_EXPENSE', payload: selectedExpense.id });
        setDeleteWarningOpen(false);
    };

    return (
        <div>
            <h2 className="text-xl mb-2">Expenses</h2>
            <ul>
                {expenses.map((expense, index) => {
                    const bgColor = categoryColors[expense.category] || '#e9e9ea';
                    const textColor = getTextColor(bgColor);

                    return (
                        <li key={index} className="mb-2 p-4 rounded-lg" style={{ backgroundColor: bgColor }}>
                            <div className={`flex justify-between ${textColor}`}>
                                <span>{expense.category}</span>
                                <span>{expense.amount}</span>
                            </div>
                            <span className={`text-sm ${textColor}`}>{expense.date}</span>

                            {/* Edit and Delete Buttons */}
                            <div className="flex justify-end space-x-2 mt-2">
                                <button
                                    className="bg-blue500 text-white p-2 rounded"
                                    onClick={() => handleEdit(expense)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white p-2 rounded"
                                    onClick={() => handleDeleteWarning(expense)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Edit Modal */}
            {editModalOpen && selectedExpense && (
                <EditExpenseModal
                    expense={selectedExpense}
                    setEditModalOpen={setEditModalOpen}
                    dispatch={dispatch}
                />
            )}

            {/* Delete Warning Modal */}
            {deleteWarningOpen && (
                <DeleteWarningModal
                    handleDelete={handleDelete}
                    setDeleteWarningOpen={setDeleteWarningOpen}
                />
            )}
        </div>
    );
};

export default ExpenseList;
