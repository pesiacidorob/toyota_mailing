import React from 'react';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import './react-super-responsive-table/SuperResponsiveTableStyle.css';

const useStyles = makeStyles({  
  column: {
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
  },
  from: {
    maxWidth: '150px',
    fontWeight: 700
  },
  sub: {
    maxWidth: '450px'
  },
  date: {
    width: '50px'
  }
});

export default function EmailListRow({ email, key, emailId, sendDataToParent }){

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
      <Tr key={key} onClick={()=>{sendDataToParent(emailId, emailDetail)}} hover>
        <Td>
          <Checkbox
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={rowCount > 0 && numSelected === rowCount}
              // onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
              onClick={func3}
              color="default"
            />
          </Td>
        <Td><p className={clsx(classes.column, classes.from)}>{e_from}</p></Td>
        <Td><p className={clsx(classes.column, classes.sub)}>{email.subject}</p></Td>
        <Td>{emailDate}</Td>
      </Tr>
    );    
}
