import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Login from '../Login/Login'




const MenuAppBar = () => {

    const [open, setOpen] = React.useState(false)

    const handleModalOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };


    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" align='center' component="div" sx={{ flexGrow: 1 }}>
                        Fix My Streets
                    </Typography>
                    <Button color="inherit" onClick={handleModalOpen} >Login</Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box >
                                <Login />
                            </Box>
                        </Fade>
                    </Modal>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MenuAppBar;