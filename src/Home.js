import { Button, Card, CardActions, CardContent, Grid, TextField } from '@mui/material'
import React from 'react'
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
import { } from "./Pages/TourDetails/_/"
import { Formik, FieldArray } from "formik";
import * as Yup from 'yup';




const AddTourSchema = Yup.object().shape({
    title: Yup.number().min(0).required('Required'),
    overviewList: Yup.array().of(Yup.object().shape({
        itemList: Yup.string().required('Required'),
        status: Yup.string().typeError('Required').required('Required'),
        order: Yup.number().typeError('Required').min(1).required('Required'),
    })),
    // notes: Yup.string(),
});

const drawerWidth = 240;
const defJobs = { itemList: '', status: true, order: 1 }

const Home = () => {
    return (
        <div>

            <Box sx={{ display: 'flex', }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            TourPillow Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Tours'} />
                            </ListItemButton>
                        </ListItem>

                    </List>

                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid item xs={6}>
                            <Card sx={{ minWidth: 275 }}>
                                <Typography variant="h5" mt={2} >
                                    Create Tour Details
                                </Typography>

                                <Formik
                                    initialValues={
                                        { title: '', notes: '', overviewList: [{ itemList: '', status: true, order: 1 }] }
                                    }
                                    validationSchema={AddTourSchema}
                                    enableReinitialize
                                    onSubmit={async (values, { setErrors }) => {
                                        // try {
                                        //     setIsLoading(true)
                                        //     // const { work, notes, title } = values;

                                        //     if (editWorkOrder) {
                                        //         // await updateWorkOrders({ oldItem: toJS(editWorkOrder), workOrder: { isReconciled: false, id: editWorkOrder.id, notes, title, work: JSON.stringify(work), hours: work.reduce((sum: any, job: any) => sum + job.hours!, 0), earnings: work.reduce((sum: any, job: any) => sum + job.earning!, 0) } })
                                        //     } else {
                                        //         // await createWorkOrder({
                                        //         //     notes, title, work: JSON.stringify(work),
                                        //         //     hours: work.reduce((sum: any, job: any) => sum + job.hours!, 0),
                                        //         //     earnings: work.reduce((sum: any, job: any) => job.earning * 1 ? sum + job.earning : sum, 0)
                                        //         // })
                                        //     }
                                        //      const startDate = DateTime.utc().startOf(filter).toISODate();
                                        //     const endDate = DateTime.utc().endOf(filter).toISODate();
                                        //     setIsLoading(false)
                                        //     setTimeout(async () => {
                                        //         await fetchWorkOrdersList()
                                        //         await fetchWorkOrders(startDate, endDate)
                                        //         await getBonusLevel()
                                        //         await setUpdateDashboard(true)

                                        //     }, 5000);
                                        //     handleClose();


                                        // } catch (error) {
                                        //     setIsLoading(false)
                                        // }
                                    }}


                                >
                                    {(formik) => <form onSubmit={formik.handleSubmit}>

                                        {/*@ts-ignore    */}
                                        <FieldArray name={'work'} render={(arrayHelpers) =>
                                            <>
                                                <Grid container style={{ padding: '1rem 3rem' }}>
                                                    <TextField label="Title" variant="standard" fullWidth={true} />
                                                    <TextField label="Slug" variant="standard" fullWidth={true} />
                                                    <TextField label="Price" variant="standard" fullWidth={true} />
                                                    <TextField label="Short Description" variant="standard" fullWidth={true} />
                                                    <TextField label="Reason To Choose Us" variant="standard" fullWidth={true} />
                                                    <TextField label="Note" variant="standard" fullWidth={true} />
                                                    <TextField label="Overview" multiline rows={4} variant="standard" fullWidth={true} />
                                                    <TextField label="Description" multiline rows={4} variant="standard" fullWidth={true} />
                                                </Grid>

                                            </>} />



                                    </form>}
                                </Formik>



                                <Grid container justifyContent={'flex-end'} style={{ padding: '1rem 3rem' }}>
                                    <Button size="small">Submit</Button>
                                </Grid>
                            </Card>
                        </Grid>


                    </Grid>

                </Box>
            </Box>
        </div>
    )
}

export default Home