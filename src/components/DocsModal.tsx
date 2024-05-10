import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  style: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, style }) => {
  if (!isOpen) return null;

  
  const addOnClickToChildren = (child: ReactNode): ReactNode => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child as React.ReactElement, {
      onClick: () => {
        onClose(); 
      }
    });
  };

  const childrenWithOnClick = React.Children.map(children, addOnClickToChildren);

  return (
    <div className={style}>
      <div className="z-20 bg-white p-4 rounded-md border">
        <div className='mb-5'>
          <button className="absolute top-2 right-2 bg-red-500 text-white px-2" onClick={onClose}>x</button>
        </div>
        {childrenWithOnClick}
      </div>
    </div>
  );
};

export default Modal;
