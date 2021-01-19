import React from 'react'
import './alert.css';
import Modal from 'react-modal';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: '25%',
        bottom: 'auto',
        marginRight: '-45%',
        transform: 'translate(-50%, -50%)',
        background: '#f9f9f9',
        maxWidth: '345px'
    },
    overlay: { zIndex: 1000 }
};

const Alert = ({ title, close, message }) => {
    return (
        <Modal isOpen={true} style={modalStyle} contentLabel='Alert'>
            <form className="rl-container">
                <div className="rl-close-button" onClick={() => close()}
                    data-qa="rl-confirmation-close-button">
                    x
                </div>
                <div className="rl-confirmation-header">
                    <p>{title}</p>
                </div>
                <hr className="rl-divider" />
                <div className="rl-confirmation-body">
                    <p>{message}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button className="rl-button rl-confirm-button" name="ok"
                        onClick={() => close()}>
                        OK
                        </button>
                </div>
            </form>
        </Modal>
    )
}

export default Alert;