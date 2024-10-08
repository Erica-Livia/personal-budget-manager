import React, { useState, useMemo, useEffect } from 'react';

const BudgetAlert = ({ expenses = [], budget, setHasNewAlert, exceededCategories, setExceededCategories }) => {
    const totalSpendingByCategory = useMemo(() => {
        if (!Array.isArray(expenses)) return {};
        return expenses.reduce((acc, expense) => {
            if (expense && expense.category && expense.amount) {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            }
            return acc;
        }, {});
    }, [expenses]);

    useEffect(() => {
        const exceeded = [];
        Object.keys(budget).forEach((category) => {
            const totalSpent = totalSpendingByCategory[category] || 0;
            const categoryBudget = budget[category];

            if (totalSpent > categoryBudget) {
                exceeded.push({
                    category,
                    totalSpent,
                    amountExceeded: totalSpent - categoryBudget, // Calculate exceeded amount
                });
                setHasNewAlert(true); // Trigger alert notification dot
            }
        });

        setExceededCategories(exceeded); // Update exceeded categories in App.js
    }, [totalSpendingByCategory, budget, setHasNewAlert, setExceededCategories]);

    return (
        <div className="mb-4">
            <h2 className="text-xl mb-2">Budget Alerts</h2>
            <ul>
                {exceededCategories && exceededCategories.length > 0 ? (
                    exceededCategories.map((exceeded, index) => {
                        const { category, totalSpent, amountExceeded } = exceeded;
                        const categoryBudget = budget[category];
                        return (
                            <li key={index} className="mb-2 p-4 bg-gray-100 rounded-lg">
                                <div className="flex justify-between">
                                    <span className="text-black">{category}</span>
                                    <span className="text-black">
                                        {totalSpent}/{categoryBudget}
                                    </span>
                                </div>
                                <p className="text-red mt-1">
                                    Amount Exceeded: {amountExceeded}
                                </p>
                            </li>
                        );
                    })
                ) : (
                    <p className="text-green-500">All categories are within the budget.</p>
                )}
            </ul>
        </div>
    );
};

export default BudgetAlert;
