import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, Checkbox, Typography, TableCell, Grid } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles({  
  sub: {
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    paddingRight: '15px',
    lineHeight: '41px',
  },
  from: {
    fontWeight: 600,
    lineHeight: '41px',
  },
  date: {
    lineHeight: '41px',
    textAlign: 'right',
    paddingRight: '5px'
  },
  hover: {
    '&:hover': {
        cursor: 'pointer'
    }
  }
});


export default function EmailListRow({ email, emailId, sendDataToParent }){

    const classes = useStyles();
    const e_from = email.from.slice(0, email.from.indexOf("<"));
    // ========== get email date ============
    const myEmailDate = new Date(email.date);
    const e_h = myEmailDate.getHours();
    const e_m = myEmailDate.getMinutes();
    const time = e_h + ":" + e_m;
    
    const month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
  
    const m = month[myEmailDate.getMonth()];
    const today = new Date().getDate();
    const d = myEmailDate.getDate();
    const e_last_date = m + d; 

    function getEmailDate(date) {
      if(date !== today){
        return e_last_date;
      } else {
        return time;
      }
    }

    const emailDate = getEmailDate(d);
    // ================================
    function func3(e){
      e.stopPropagation();
      console.log('Checkbox was clicked')
    };
    
    const emailDetail = { id: emailId, subject: email.subject, date: emailDate, from: e_from, text: email.from }
    console.log(e_from);
    return ( 
      <Grid container onClick={()=>{sendDataToParent(emailId, emailDetail)}} className={classes.hover}>
          <Grid item xs={1}>
              <Checkbox
                  // indeterminate={numSelected > 0 && numSelected < rowCount}
                  // checked={rowCount > 0 && numSelected === rowCount}
                  // onChange={onSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                  onClick={func3}
                  color="default"
              />
          </Grid>
          <Grid item xs={3} className={classes.from}>
              {e_from}
          </Grid>
          <Grid item xs={7} className={classes.sub}>
              {email.subject}
          </Grid>
          <Grid item xs={1} className={classes.date}>
              {emailDate}
          </Grid>
      </Grid>
    );    
}
