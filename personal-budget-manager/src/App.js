import React, { useReducer, useEffect, useState } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import BudgetAlert from './components/BudgetAlert';
import ExpenseSummary from './components/ExpenseSummary';
import SetBudget from './components/SetBudget';
import Navbar from './components/Navbar';

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
        case 'SET_EXPENSES':
            return action.payload; // To set initial expenses from localStorage
        default:
            return state;
    }
}

function App() {
    // Load expenses and budget from localStorage, or use default values
    const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const initialBudget = JSON.parse(localStorage.getItem('budget')) || {
        Groceries: 500,
        Gas: 100,
        Rent: 1000,
        Gym: 100,
        Restaurant: 200,
        Travel: 300,
        Vacation: 1000,
        Gift: 150,
    };

    const [expenses, dispatch] = useReducer(expenseReducer, initialExpenses);
    const [currentSection, setCurrentSection] = useState('add');
    const [hasNewAlert, setHasNewAlert] = useState(false); // Track if there's a new alert
    const [exceededCategories, setExceededCategories] = useState([]); // Track exceeded categories

    // State for budget, with initial value loaded from localStorage
    const [budget, setBudget] = useState(initialBudget);

    // Save expenses to localStorage whenever expenses state changes
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    // Save budget to localStorage whenever budget state changes
    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    }, [budget]);

    // Automatically update hasNewAlert when expenses or budget change
    useEffect(() => {
        const totalSpendingByCategory = expenses.reduce((acc, expense) => {
            if (expense && expense.category && expense.amount) {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            }
            return acc;
        }, {});

        const exceeded = Object.keys(budget).filter(category => {
            const totalSpent = totalSpendingByCategory[category] || 0;
            const categoryBudget = budget[category];
            return totalSpent > categoryBudget;
        });

        setExceededCategories(exceeded);
        setHasNewAlert(exceeded.length > 0); // If there are exceeded categories, set hasNewAlert to true
    }, [expenses, budget]);

    return (
        <div className="min-h-screen bg-lightBlack text-white font-manrope">
            <header className="p-4">
                <h1 className="text-3xl font-bold">Personal Budget Manager</h1>
            </header>

            {/* Navbar with Notification Dot */}
            <Navbar
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                hasNewAlert={hasNewAlert}
                numberOfAlerts={exceededCategories.length} // Pass number of exceeded categories to navbar
            />

            <div className="p-4">
                {/* Display Section Based on Current Section */}
                {currentSection === 'add' && <AddExpense dispatch={dispatch} />}
                {currentSection === 'view' && <ExpenseList expenses={expenses} dispatch={dispatch} />}
                {currentSection === 'budget' && <SetBudget budget={budget} setBudget={setBudget} />}
                {currentSection === 'alerts' && (
                    <BudgetAlert
                        expenses={expenses}
                        budget={budget}
                        setHasNewAlert={setHasNewAlert}
                        exceededCategories={exceededCategories} // Pass exceeded categories to BudgetAlert
                        setExceededCategories={setExceededCategories} // Allow BudgetAlert to update the exceeded categories
                    />
                )}
                {currentSection === 'summary' && (
                    <>
                        <ExpenseSummary expenses={expenses} />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
