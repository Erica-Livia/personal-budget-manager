import React, { useReducer, useState } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetAlert from './components/BudgetAlert';

// Define the reducer function
function expenseReducer(state, action) {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, { ...action.payload, id: Date.now() }];
        case 'UPDATE_EXPENSE':
            return state.map((expense) =>
                expense.id === action.payload.id ? { ...action.payload } : expense
            );
        case 'DELETE_EXPENSE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function App() {
    // useReducer to manage expenses
    const [expenses, dispatch] = useReducer(expenseReducer, []);
    const [budget, setBudget] = useState({
        food: 500,
        transport: 300,
        entertainment: 200,
    });

    return (
        <div className="min-h-screen bg-lightBlack text-white font-manrope">
            <header className="p-4">
                <h1 className="text-3xl font-bold">Personal Budget Manager</h1>
            </header>
            <div className="p-4">
                <AddExpense dispatch={dispatch} />
                <ExpenseList expenses={expenses} dispatch={dispatch} />
                <ExpenseSummary expenses={expenses} />
                <BudgetAlert expenses={expenses} budget={budget} />
            </div>
        </div>
    );
}

export default App;
