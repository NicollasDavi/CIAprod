// NotText.tsx
import React, { ReactNode } from 'react';

interface NotTextProps {
    isNotTextOpen: boolean;
    onNotTextClose: () => void;
    onSave: () => void;
    children: ReactNode
    type: number
}

const NotText: React.FC<NotTextProps> = ({ isNotTextOpen, onNotTextClose, onSave, children, type}) => {
    return (
        <div className='w-11/12 md:w-full h-auto mb-10 bg-gray-400/60 p-3 mt-3 rounded-xl' style={{ display: isNotTextOpen ? 'block' : 'none' }}>
            {children}
            <div className='flex flex-row gap-3'>
                <button className='p-1 text-sm text-white rounded-lg bg-green-500/70' onClick={onSave}>Salvar</button>
                <button className='p-1 text-sm text-white rounded-lg bg-red-500/70' onClick={onNotTextClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default NotText;
