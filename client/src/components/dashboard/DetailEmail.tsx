import React from 'react';
import { match } from "react-router-dom";
import { EmailCRM} from "../../types";
import { Grid, Typography, IconButton, Tooltip  } from '@material-ui/core';
import {Print, Launch, AccountCircle, StarBorder, Reply, MoreVert, DoubleArrow} from '@material-ui/icons';

const useStyles = () => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%'
        },
        paper: {
            width: '100%',
            margin: 0,
            height: 'auto',
            backgroundColor: 'white',
        },
        iconLM: {
            textAlign: 'right'
        },
        breadcrumbsFont: {
            fontSize: '12px',
        },
        containerP: {
            padding: '20px 25px 0px 25px'
        }, 
        table: {
        minWidth: 'auto',
        },
        caret: {
            height: 15,
            backgroundImage: 'url(https://www.gstatic.com/images/icons/material/system/1x/arrow_drop_down_black_20dp.png)',
            width: 15,
            cursor: 'pointer',  
        },
        cellflex: {
            display: 'flex',
            fontSize: '12px'
        },
        font: {
            fontSize: '12px',
            lineHeight: 'o.5'
        },
        pad: {
            padding: '20px'
        }
    }
}
interface EmailCRMProps {
    match?: match;
    email: EmailCRM;
    emailData: EmailCRM;
}  
export default class DetailEmail extends React.Component<EmailCRMProps> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props) {
      super(props);
    }
  
    render() {
        const classes = useStyles();
        const {emailData} = this.props;
        
        return (
            <div style={classes.paper}>
                {/* <Paper elevation={3} style={classes.paper}> */}
                    <Grid item container xs={12}  style={classes.containerP}>
                        <Grid xs={6} item container style={classes.breadcrumbsFont}>
                            <Grid item xs={'auto'}>{'New Mail'} - {'Sample Creative'}</Grid>
                            <DoubleArrow />
                            <Grid item>Follow up</Grid>
                        </Grid>
                        <Grid xs={6} item style={{textAlign: 'right'}}>
                            <Tooltip title="Print" arrow>
                                <IconButton color="inherit">
                                    <Print />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Launch" arrow>
                                <IconButton color="inherit">
                                    <Launch />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} style={classes.containerP} >
                        <Grid item container xs={6}>
                            <Grid item container xs={2}>
                                <AccountCircle style={{fontSize: '40px'}}/>
                            </Grid>
                            <Grid item container xs={10}>
                                <Grid item xs={12}>{emailData.from}</Grid>
                                <Grid item xs={12} style={{display: 'flex'}}>
                                    <Typography style={classes.font}>to me</Typography>
                                    <div style={classes.caret}></div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={6} alignItems={'center'} direction={'row-reverse'}>
                            <Grid item xs={'auto'}>
                                <Tooltip title="MoreVert" arrow>
                                    <IconButton color="inherit">
                                        <MoreVert />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={'auto'}>
                                <Tooltip title="Reply" arrow>
                                    <IconButton color="inherit">
                                        <Reply />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={'auto'}>
                                <Tooltip title="StarBorder" arrow>
                                    <IconButton color="inherit">
                                        <StarBorder />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={'auto'}>
                                {emailData.date}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={classes.pad}>
                        {emailData.subject}
                    </Grid>
                {/* </ Paper>  */}
            </div>
        );
    }
}

