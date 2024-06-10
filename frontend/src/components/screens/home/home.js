import React from "react";
import "./home.css";
import { TimeFrame } from "./time_component";
import ToDo from './todo';
import Grid from '@mui/material/Unstable_Grid2'; // Ensure this is correctly imported as `Grid2`
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = (props) => (
    <Paper
        sx={{
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            padding: 2,
            textAlign: 'center',
            color: (theme) => theme.palette.text.secondary,
            maxHeight: '400px', // Fixed height
            minWidth: '120px',
            overflowY: 'auto', // Enable vertical scrolling
        }}
    >
        {props.children}
    </Paper>
);

export const Home = () => {
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Grid container spacing={2}>
                <Grid xs={12} md={10} mdOffset={1}>
                    <h2>Time</h2>
                    <Item><TimeFrame /></Item>
                </Grid>
                <Grid xs={12} md={5} mdOffset={1}>
                    <h2>Tasks</h2>
                    <Item><ToDo /></Item>
                </Grid>
                <Grid xs={12} md={5}>
                    <h2>Tasks</h2>
                    <Item><ToDo /></Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={12} md={10} mdOffset={1} className='heading'>
                    <h2>Habit Tracker</h2>
                </Grid>
                <Grid xs={6} md={2} mdOffset={1}>
                    <Item><h3>Yoga</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Meditation</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Boxing</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Boxing</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Boxing</h3></Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={12} md={10} mdOffset={1} className='heading'>
                    <h2>Stats</h2>
                </Grid>
                <Grid xs={6} md={2} mdOffset={1}>
                    <Item><h3>Intelligence</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Vitality</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Strength</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Satisfaction</h3></Item>
                </Grid>
                <Grid xs={6} md={2}>
                    <Item><h3>Agility</h3></Item>
                </Grid>
            </Grid>
        </Box>
    );
};
