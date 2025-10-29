import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ErrorModal.css'; 

const modalRoot = document.getElementById('modal-root');

const ErrorModal = ({ isOpen, onClose, msg }) => {
    
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
        <div className="modal-backdrop-error" onClick={onClose}> 
            <div 
                className="modal-content-error" 
                onClick={(e) => e.stopPropagation()} 
            >
                <h3>Error</h3>
                <p>{msg}</p>
            </div>
        </div>,
        modalRoot
    );
};

export default ErrorModal;