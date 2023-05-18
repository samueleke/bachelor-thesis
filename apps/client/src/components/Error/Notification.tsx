import React, { useState } from 'react';
import { Snackbar, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export type NotificationProps = {
    message: string;
    type?: 'error' | 'success' | 'warning' | 'info';
    onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
    message,
    type = 'error',
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        onClose && onClose();
        setIsVisible(false);
    };

    const getSeverity = () => {
        switch (type) {
            case 'error':
                return 'error';
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return 'error';
        }
    };

    return (
        <Snackbar
            open={isVisible}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                severity={getSeverity()}
                action={
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
