import React from 'react';

const BudgetAlert = ({ expenses, budget }) => {
    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(budget).map((category) => (
                <div key={category} className="mb-2">
          <span>
            {category}: {categoryTotals[category] || 0}/{budget[category]}
          </span>
                    {categoryTotals[category] > budget[category] && (
                        <span className="text-red ml-2">Budget exceeded!</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BudgetAlert;
