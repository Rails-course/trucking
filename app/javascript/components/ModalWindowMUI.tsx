import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog, DialogContent, DialogTitle, IconButton,
} from '@mui/material';

const colorStyle = {
    color: (theme) => theme.palette.grey[500],
};

const ModalWindowMui = function (props) {
    const {
        isActiveModal, title, children, clickButton, ...other
    } = props;
    return (
        <Dialog open={isActiveModal} {...other}>
            <DialogTitle>
                {title}
                <IconButton
                    onClick={clickButton}
                    aria-label="close"
                    sx={colorStyle}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default ModalWindowMui;