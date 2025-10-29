import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SuccessModal.css'; 

const modalRoot = document.getElementById('modal-root');

const SuccessModal = ({ isOpen, onClose, msg }) => {
    
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]); 

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal-backdrop-success" onClick={onClose}> 
            <div 
                className="modal-content-success" 
                onClick={(e) => e.stopPropagation()} 
            >
                <h3>Eliminado</h3>
                <p>{msg}</p>
            </div>
        </div>,
        modalRoot
    );
};

export default SuccessModal;