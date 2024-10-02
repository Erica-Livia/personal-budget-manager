import React from 'react';

const DeleteWarningModal = ({ handleDelete, setDeleteWarningOpen }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl mb-4 text-black">Are you sure you want to delete this expense?</h2> {/* Added text-black */}

                <div className="flex justify-end space-x-2 mt-4">
                    <button className="bg-gray-500 text-white p-2 rounded" onClick={() => setDeleteWarningOpen(false)}>
                        Cancel
                    </button>
                    <button className="bg-red text-white p-2 rounded" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarningModal;
