import React, { useReducer, useEffect, useState } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetAlert from './components/BudgetAlert';

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
        case 'SET_EXPENSES':
            return action.payload;
        default:
            return state;
    }
}

function App() {
    // Get initial expenses from localStorage, if available
    const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const [expenses, dispatch] = useReducer(expenseReducer, initialExpenses);
    const [budget, setBudget] = useState({
        food: 500,
        transport: 300,
        entertainment: 200,
    });

    // Save expenses to localStorage whenever expenses state changes
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

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
