import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <Dialog
            open={isOpen}
            // onClose={onClose}
            PaperProps={{
                style: {
                    backgroundColor: "#F6F6FF",
                    maxHeight: "150%", // Tamaño máximo
                    minWidth: "450px", // Ancho mínimo
                    maxWidth: "450px", // Ancho máximo
                },
            }}
            BackdropProps={{
                style: { backgroundColor: 'rgba(0, 0, 0, 0)' }
            }}
        >
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;