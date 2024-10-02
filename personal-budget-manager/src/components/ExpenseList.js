import React from 'react';

const ExpenseList = ({ expenses }) => {
    return (
        <div>
            <h2 className="text-xl mb-2">Expenses</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index} className="mb-2">
                        <div className="flex justify-between">
                            <span>{expense.category}</span>
                            <span>{expense.amount}</span>
                        </div>
                        <span className="text-sm text-black400">{expense.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
