import React from "react";
import "./home.css";
import { TimeFrame } from "./time_component";
import ToDo from './todo';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = ({ children }) => (
    <Paper className="item">
        {children}
    </Paper>
);

export const Home = () => {
    return (
        <Box className="home-container">
            <Grid container spacing={2}>
                <Grid xs={10} xsOffset={1}>
                    <Item><TimeFrame /></Item>
                </Grid>
                <Grid xs={5} xsOffset={1}>
                    <Item>
                        <h2>Tasks</h2>
                        <ToDo />
                    </Item>
                </Grid>
                <Grid xs={5}>
                    <Item>
                        <h2>Events</h2>
                        <ToDo />
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={10} xlOffset={1}>
                    <h2>Habit Tracker</h2>
                </Grid>
                <Grid xs={2} xlOffset={1}>
                    <Item>
                        <h3>Yoga</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Meditation</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Boxing</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Boxing</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Boxing</h3>
                    </Item>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={10} xlOffset={1}>
                    <h2>Stats</h2>
                </Grid>
                <Grid xs={2} xlOffset={1}>
                    <Item>
                        <h3>Intelligence</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Vitality</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Strength</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Satisfaction</h3>
                    </Item>
                </Grid>
                <Grid xs={2}>
                    <Item>
                        <h3>Agility</h3>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
};
