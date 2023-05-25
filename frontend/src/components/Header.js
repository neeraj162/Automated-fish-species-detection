import React, { StrictMode, useRef} from 'react'
import { makeStyles } from 'tss-react/mui';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const useStyles = makeStyles()((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        fontSize: '1.5rem',
    },
    button: {
        marginLeft: theme.spacing(2),
    },
}));

export default function Header() {
    
    const {classes} = useStyles();
    const myRef = useRef(null);
    return (

        <StrictMode>
        <div ref={myRef} className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Fish Eye
                    </Typography>
                    <Button color="inherit" className={classes.button}>Home</Button>
                    <Button color="inherit" className={classes.button}>About</Button>
                </Toolbar>
            </AppBar>
        </div>
        </StrictMode>
    );
}
