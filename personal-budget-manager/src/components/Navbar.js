import React from 'react';

const Navbar = ({ currentSection, setCurrentSection, hasNewAlert, numberOfAlerts }) => {
    return (
        <nav className="bg-blue500 text-white p-4 flex justify-around">
            <button
                onClick={() => setCurrentSection('add')}
                className={`hover:text-yellow-400 ${currentSection === 'add' ? 'underline' : ''}`}
            >
                Add Expense
            </button>
            <button
                onClick={() => setCurrentSection('view')}
                className={`hover:text-yellow-400 ${currentSection === 'view' ? 'underline' : ''}`}
            >
                View Expenses
            </button>
            <button
                onClick={() => setCurrentSection('budget')}
                className={`hover:text-yellow-400 ${currentSection === 'budget' ? 'underline' : ''}`}
            >
                Set Budget
            </button>
            <button
                onClick={() => setCurrentSection('summary')}
                className={`hover:text-yellow-400 ${currentSection === 'summary' ? 'underline' : ''}`}
            >
                Summary
            </button>
            <div className="relative flex items-center">
                <button
                    onClick={() => setCurrentSection('alerts')}
                    className={`hover:text-yellow-400 ${currentSection === 'alerts' ? 'underline' : ''}`}
                >
                    Alerts
                </button>
                {hasNewAlert && (
                    <span className="absolute top-0 right-0 transform translate-x-6 -translate-y-2 h-5 w-5 bg-red text-white text-xs flex items-center justify-center rounded-full">
                        {numberOfAlerts}
                    </span>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
