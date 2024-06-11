import React, { useState } from 'react';
import { FaBug } from "react-icons/fa";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { MdDeleteForever } from 'react-icons/md';

interface BugCardProps {
    id: string;
    text: string;
    type: string;
    handleDelete: (id: string) => void;
    createdAt: Date;
}

const BugCard = ({ id, text, type, handleDelete, createdAt }: BugCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <section
            className={`flex flex-col items-start border border-gray-300 rounded-lg p-2 mb-4 bg-white shadow-md w-full shadow-blue1`}
            onClick={handleCardClick}
        >
            <div className="flex items-center w-full">
                <div className="text-xl mr-4">
                    {type === "Bug" ? <FaBug className='text-red-500' /> : <HiMiniRocketLaunch className='text-blue1' />}
                </div>
                <div
                    className={`text-base ${isExpanded ? 'w-full' : 'w-[40%]'} ${isExpanded ? '' : 'overflow-hidden whitespace-nowrap text-ellipsis'}`}
                    style={{maxWidth: '100%'}}
                >
                    {text}
                </div>
                <div className="text-sm text-gray-500 ml-auto">
                    <p>{createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</p>
                </div>
                <button onClick={() => handleDelete(id)} className="text-red-500 hover:text-red-700 ml-4">
                    <MdDeleteForever size={24} />
                </button>
            </div>
            {isExpanded && (
                <div className="w-full text-lg break-all">
                    {text}
                </div>
            )}
        </section>
    );
}

export default BugCard;
