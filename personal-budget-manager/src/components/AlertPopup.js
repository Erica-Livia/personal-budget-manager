import React from 'react';

const AlertPopup = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                <h2 className="text-lg font-bold mb-4">Alert</h2>
                <p>{message}</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-red text-black rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default AlertPopup;
