import React from 'react';
import { Grid } from '@material-ui/core';

const useStyles = () => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%'
        },
        column: {
            textOverflow: 'ellipsis',
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

export default function EmailListRow(email){

    const classes = useStyles();
    console.log(email);
    console.log(email.from);
    
    return (                
      <Grid item container xs={12} style={classes.containerP} key={email.id}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3} style={classes.column}>
              {email.email.from}
          </Grid>
          <Grid item xs={6} style={classes.column}>
              {email.email.subject}
          </Grid>
          <Grid item xs={1} style={classes.column}>
              {email.email.date}
          </Grid>
      </Grid> 
    );
    
}
