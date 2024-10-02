import React, { useState, useReducer } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetAlert from './components/BudgetAlert';

function App() {
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
          <ExpenseList expenses={expenses} />
          <ExpenseSummary expenses={expenses} />
          <BudgetAlert expenses={expenses} budget={budget} />
        </div>
      </div>
  );
}

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    default:
      return state;
  }
}

export default App;
