import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirmação</h2>
            <p className="mb-4">Tem certeza que deseja excluir este item?</p>
            <div className="flex justify-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4" onClick={onConfirm}>Confirmar</button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg" onClick={onClose}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
