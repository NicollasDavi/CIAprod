import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const CardDoc = ({ nome, solicitante, onDelete, onReactivate }: { nome: string; solicitante: string, onDelete: () => void, onReactivate : () => void}) => {
    return (
        <div className="w-full bg-blue-500 rounded-xl p-2 mb-2">
            <div className="flex flex-row items-center justify-between text-white">
                <div className="flex flex-col">
                    <p className="text-base">{nome}</p>
                    <p className="text-sm">{solicitante}</p>
                </div>
                <div className="flex items-center">
                    <FaCheckCircle className="text-green-400 cursor-pointer mx-2" size={20} onClick={onDelete}/>
                    <FaTimesCircle className="text-red-400 cursor-pointer mx-2" size={20} onClick={onReactivate}/>
                </div>
            </div>
        </div>
    );
};

export default CardDoc;
