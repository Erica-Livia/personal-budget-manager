import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components you need
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the same color map for categories used in ExpenseList
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
                backgroundColor: Object.keys(categories).map(
                    category => categoryColors[category] || '#e9e9ea' // Fallback color if category not found
                ),
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
