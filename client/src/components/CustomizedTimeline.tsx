import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { IconButton, Paper, Typography, Grid } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddCircle from '@material-ui/icons/AddCircle';
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    '& > h6': {
      margin: '4px'
    },
    backgroundColor: '#f4fffc'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  maxW: {
    maxWidth: '40px',
    padding: '5px'
  },
  pd0: {
    padding: '0px',
    fontSize: '11px'
  },
  disp: {
    display: 'block'
  },
  padY: {
    paddingTop: '12px',
    paddingBottom: '12px',
    '& > p': {
      fontSize: '12px'
    }
  }
}));

const GlobalCss = withStyles({
  '@global': {
    '.MuiTimelineOppositeContent-root': {
      textAlign: 'center'
    },
    '.MuiAvatar-root': {
      width: '20px',
      height: '20px'
    }
  }
})(() => null);

const AvatarContainer = styled.div`
  display: flex;
  & > * {
    margin: 4px;
  }
`;

const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
`;

function AvatarWithText(props) {
  return (
    <AvatarContainer>
      <AvatarLabel>
        <Avatar
          style={{ marginRight: "10px" }}
          alt="Jack Sparrow"
          src="https://images.pexels.com/photos/6386956/pexels-photo-6386956.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <Typography variant="inherit">Hosted By: {props.data[4].value}</Typography>
      </AvatarLabel>
    </AvatarContainer>
  );
}

export default function CustomizedTimeline(props) {
  const classes = useStyles();

  return (
    <Timeline align="left" className={classes.pd0}>
      <TimelineItem>
        <GlobalCss />
        <TimelineOppositeContent className={classes.maxW}>
          <Typography variant="subtitle2" color="textPrimary">
            Time
          </Typography><br/>
          <Typography variant="overline" color="textPrimary" className={classes.disp}>
            {props.data[0].value}
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {props.data[1].value}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2">Events</Typography><br/>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="subtitle2">Appointment</Typography>
            <Typography variant="subtitle2">Who: {props.data[2].value}</Typography>
            <AvatarContainer>
              <AvatarLabel>
                <LocationOnIcon/>
                <Typography variant="inherit">Where: {props.data[3].value}</Typography>
              </AvatarLabel>
            </AvatarContainer>
            <AvatarWithText data={props.data} />
          </Paper>
          <Grid container >
            <Grid item xs={'auto'}>
              <IconButton color="primary" component="span">
                <AddCircle />
              </IconButton>
            </Grid>
            <Grid item className={classes.padY}>
              <Typography>Add an event</Typography>
            </Grid>
          </Grid>          
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
