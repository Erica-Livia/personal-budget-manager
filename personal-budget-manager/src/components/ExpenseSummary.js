import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components you need
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseSummary = ({ expenses }) => {
    const categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categories),
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: ['#003e9c', '#2b7fff', '#c40c00'],
            },
        ],
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl mb-2">Expense Summary</h2>
            <Pie data={data} />
        </div>
    );
};

export default ExpenseSummary;
