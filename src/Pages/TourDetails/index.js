import { Button, Card, CardActions, CardContent, Grid, IconButton, Input, TextField } from '@mui/material'
import React, { useMemo, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail'
import { OverviewList, IncludedItems } from "./_/index"
import { Formik, FieldArray } from "formik";
import * as Yup from 'yup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];



const AddTourSchema = Yup.object().shape({
    title: Yup.string().min(0).required('Required'),
    overviewList: Yup.array().of(Yup.object().shape({
        itemList: Yup.string().required('Required'),
        status: Yup.boolean().typeError('Required').required('Required'),
        order: Yup.number().typeError('Required').min(1).required('Required'),
    })),
    includedItems: Yup.array().of(Yup.object().shape({
        title: Yup.string().required('Required'),
        status: Yup.boolean().typeError('Required').required('Required'),
        order: Yup.number().typeError('Required').min(1).required('Required'),
    })),
    // notes: Yup.string(),
});

const drawerWidth = 240;
const ordersList = Array.from(Array(15)).map((e, i) => (i + 1));

const TourDetails = () => {
    const [file, setFile] = useState([]);
    const [fileToShow, setFileToShow] = useState([]);
    // function handleChange(e) {
    //     console.log(e.target.files);
    //     setFile([...file, URL.createObjectURL(e.target.files[0])]);
    // }
    const handleChange = (f) => {
        setFile(f);
        let arr = [];
        for (let index = 0; index < f.length; index++) {
            const element = f[index];
            arr.push(URL.createObjectURL(element))
        }
        setFileToShow(arr);
    };
    console.log("name", fileToShow)
    return (
        <div>

            <Box sx={{ display: 'flex', }}>

                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid item xs={8}>
                            <Card sx={{ minWidth: 275 }}>
                                <Typography variant="h5" mt={2} >
                                    Create Tour Details
                                </Typography>
                                <Grid container justifyContent={'center'} style={{ padding: '0rem 3rem' }}>
                                    <FileUploader
                                        multiple={true}
                                        handleChange={handleChange}
                                        name="file"
                                        types={fileTypes}
                                        classes="drop_area drop_zone"
                                        style={{ width: '100% !important' }}
                                    >
                                        <Grid container justifyContent={'center'} alignItems="center"
                                            style={{ cursor: 'pointer', minWidth: '250px', height: '100px', borderRadius: '5px', border: '1px solid #000' }}>
                                            <p>+ Drop your files here</p>
                                        </Grid>
                                    </FileUploader>
                                    <Grid container>
                                        {fileToShow && fileToShow.map((item) => {
                                            return <Grid >
                                                <img src={item} height={"100px"} style={{margin:'10px',borderRadius:'5px'}} width="100px" />
                                            </Grid>

                                        })}
                                    </Grid>
                                </Grid>
                                <Formik
                                    initialValues={
                                        {
                                            title: '', notes: '', overviewList: [{ itemList: '', status: true, order: 1 }],
                                            includedItems: [{ title: '', status: true, order: 1 }]
                                        }
                                    }
                                    validationSchema={AddTourSchema}
                                    enableReinitialize
                                    onSubmit={async (values, { setErrors }) => {
                                        console.log("here", values)
                                        // try {
                                        // const { title } = values;

                                        // call api here   
                                        // } catch (error) {
                                        //     setIsLoading(false)
                                        // }
                                    }}


                                >
                                    {(formik) => <form onSubmit={formik.handleSubmit}>

                                        <FieldArray name={'overviewList'} render={(arrayHelpers) =>
                                            <>
                                                <Grid container style={{ padding: '1rem 3rem' }}>
                                                    <TextField name={'title'}
                                                        value={formik.values.title}
                                                        onChange={formik.handleChange}
                                                        label="Title" variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                    <TextField label="Slug" variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                    <TextField label="Price" variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                    <TextField label="Short Description" variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                    <TextField label="Reason To Choose Us" variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                    <TextField label="Note" variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                    <TextField label="Overview" multiline rows={4} variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                    <TextField label="Description" multiline rows={4} variant="outlined" style={{ marginTop: '1rem' }} fullWidth={true} />
                                                </Grid>
                                                <Grid container style={{ padding: '1rem 1rem' }}>
                                                    <Grid container justifyContent={'space-between'} style={{ padding: '0px 2rem' }}>
                                                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography>Add Overview List Item</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton
                                                                onClick={() => arrayHelpers.push({ itemList: '', status: true, order: formik.values.overviewList.length + 1 })}>
                                                                <AddCircleOutlineIcon />
                                                            </IconButton>

                                                        </Grid>

                                                    </Grid>
                                                    {formik.values.overviewList && formik.values.overviewList.map((job, index) =>
                                                        <OverviewList
                                                            key={index}
                                                            job={job}
                                                            arrayHelper={arrayHelpers}
                                                            formik={formik}
                                                            ordersList={ordersList}
                                                            index={index} />
                                                    )}
                                                </Grid>

                                            </>} />

                                        <FieldArray name={'includedItems'} render={(arrayHelpers) =>
                                            <>

                                                <Grid container style={{ padding: '1rem 1rem' }}>
                                                    <Grid container justifyContent={'space-between'} style={{ padding: '0px 2rem' }}>
                                                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Typography>Add Included Items</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton
                                                                onClick={() => arrayHelpers.push({ title: '', status: true, order: formik.values.includedItems.length + 1 })}>
                                                                <AddCircleOutlineIcon />
                                                            </IconButton>

                                                        </Grid>

                                                    </Grid>
                                                    {formik.values.includedItems && formik.values.includedItems.map((job, index) =>
                                                        <IncludedItems
                                                            key={index}
                                                            job={job}
                                                            arrayHelper={arrayHelpers}
                                                            formik={formik}
                                                            ordersList={ordersList}
                                                            index={index} />
                                                    )}
                                                </Grid>

                                            </>} />
                                        {/* IncludedItems */}
                                        <Grid container justifyContent={'flex-end'} style={{ padding: '1rem 3rem' }}>
                                            <Button type='submit' size="small">Submit</Button>
                                        </Grid>
                                    </form>}
                                </Formik>

                            </Card>
                        </Grid>


                    </Grid>

                </Box>
            </Box>
        </div>
    )
}

export default TourDetails;