import React, { StrictMode, useRef } from 'react'
import { makeStyles } from 'tss-react/mui';
import { withStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CircularProgress, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import bgimg from "../background.jpg";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';

import { DropzoneArea } from 'material-ui-dropzone';
// eslint-disable-next-line
// const axio = require("axios").default;

const styles = theme => ({
    button: {
        color: theme.palette.getContrastText(common.white),
        backgroundColor: common.white,
        '&:hover': {
            backgroundColor: '#ffffff7a',
        },
    },
});

const ColorButton = withStyles(styles)(({ classes, children, ...props }) => (
    <Button className={classes.button} {...props}>
        {children}
    </Button>
));


const useStyles = makeStyles()((theme) => ({
    mainContainer: {
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: "100vh",
    },
    gridContainer: {
        justifyContent: "center",
        marginTop: "0",
        padding: "4em 1em 0 1em",
    },
    imageCard: {
        margin: "auto",
        maxWidth: 400,
        height: 500,
        backgroundColor: 'transparent',
        boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
        borderRadius: '15px',
        borderWidth: '20px',
    },
    imageCardEmpty: {
        backgroundColor: 'transparent',
        height: 'auto',
    },
    noImage: {
        margin: "auto",
        width: 400,
        height: "400 !important",
    },
    media: {
        height: 400,
    },
    input: {
        display: 'none',
    },
    dropzone: {
        backgroundColor: 'transparent'
    },
    uploadIcon: {
        background: 'white',
    },
    loader: {
        color: '#be6a77 !important',
    },
    detail: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonGrid: {
        maxWidth: "416px",
        width: "100%",
    },
    text: {
        color: 'white !important',
        textAlign: 'center',
    },
    tableContainer: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important',
    },
    table: {
        backgroundColor: 'transparent !important',
    },
    tableHead: {
        backgroundColor: 'transparent !important',
    },
    tableRow: {
        backgroundColor: 'transparent !important',
    },
    tableCell: {
        fontSize: '22px',
        backgroundColor: 'transparent !important',
        borderColor: 'transparent !important',
        color: '#000000a6 !important',
        fontWeight: 'bolder',
        padding: '1px 24px 1px 16px',
    },
    tableCell1: {
        fontSize: '14px',
        backgroundColor: 'transparent !important',
        borderColor: 'transparent !important',
        color: '#000000a6 !important',
        fontWeight: 'bolder',
        padding: '1px 24px 1px 16px',
    },
    tableBody: {
        backgroundColor: 'transparent !important',
    },
    clearButton: {
        width: "-webkit-fill-available",
        borderRadius: "15px",
        padding: "15px 22px",
        color: "#000000a6",
        fontSize: "20px",
        fontWeight: 900,
    },
}));


export default function Form() {
    const { classes } = useStyles();

    //states
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [data, setData] = useState();
    const [image, setImage] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    let confidence = 0;

    // const sendFile = async () => {
    //     if (image) {
    //         let formData = new FormData();
    //         formData.append("file", selectedImage);
    //         let res = await axios.post(process.env.REACT_APP_API_URL, formData)
    //         // let res = await axio({
    //         //     method: "post",
    //         //     url: process.env.REACT_APP_API_URL,
    //         //     data: formData,
    //         // });
    //         if (res.status === 200) {
    //             setData(res.data);
    //         }
    //         setIsloading(false);
    //     }
    // }

    const onSelectFile = (files) => {
        if (!files || files.length === 0) {
            setSelectedImage(undefined);
            setImage(false);
            setData(undefined);
            return;
        }
        console.log(files[0]);
        setSelectedImage(files[0]);
        setData(undefined);
        setImage(true);
    };

    const clearData = () => {
        setData(null);
        setImage(false);
        setSelectedImage(null);
        setPreview("");
    };

    useEffect(() => {
        if (!selectedImage) {
            setPreview('');
            return;
        }
        const objectUrl = URL.createObjectURL(selectedImage);
        setPreview(objectUrl);
    }, [selectedImage]);

    useEffect(() => {
        if (!preview) {
            return;
        }
        setIsloading(true);
        const sendFile = async () => {
            if (image) {
                let formData = new FormData();
                formData.append("file", selectedImage);
                let res = await axios.post(process.env.REACT_APP_API_URL, formData)
                // let res = await axio({
                //     method: "post",
                //     url: process.env.REACT_APP_API_URL,
                //     data: formData,
                // });
                if (res.status === 200) {
                    setData(res.data);
                }
                setIsloading(false);
            }
        }
        sendFile();
    }, [preview, image, selectedImage]);

    if (data) {
        confidence = (parseFloat(data.confidence) * 100).toFixed(2);
    }

    const myRef = useRef(null);
    return (
        <StrictMode>
            <div ref={myRef}>
                <Container ref={myRef} maxWidth={false} className={classes.mainContainer} disableGutters={true} sx={{ margin: 0 }}>
                    <Grid container className={classes.gridContainer} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} >
                            <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`}>
                                {image && <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={preview}
                                        component="img"
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>}
                                {!image && <CardContent className={classes.content}>
                                    <DropzoneArea
                                        // style={{ opacity: 0.5 }}
                                        acceptedFiles={['image/*']}
                                        dropzoneText={"Drag and drop an image of a potato plant leaf to process"}
                                        onChange={onSelectFile}
                                        filesLimit={1}
                                        clearOnUnmount={true}
                                    />
                                </CardContent>}
                                {data && <CardContent className={classes.detail}>
                                    <TableContainer component={Paper} className={classes.tableContainer}>
                                        <Table className={classes.table} size="small" aria-label="simple table">
                                            <TableHead className={classes.tableHead}>
                                                <TableRow className={classes.tableRow}>
                                                    <TableCell className={classes.tableCell1}>Label:</TableCell>
                                                    <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className={classes.tableBody}>
                                                <TableRow className={classes.tableRow}>
                                                    <TableCell component="th" scope="row" className={classes.tableCell}>
                                                        {data.class}
                                                    </TableCell>
                                                    <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>}
                                {isLoading && <CardContent className={classes.detail}>
                                    <CircularProgress color="secondary" className={classes.loader} />
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        Processing
                                    </Typography>
                                </CardContent>}
                            </Card>
                        </Grid>

                        {data &&
                            <Grid item className={classes.buttonGrid} >

                                <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" startIcon={<Clear fontSize="large" />} onClick={clearData}>
                                    Clear
                                </ColorButton>
                            </Grid>}

                    </Grid>

                </Container>
            </div>
        </StrictMode>
    );
}
