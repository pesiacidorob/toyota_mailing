import React from "react";
import "./search_input.css"
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, CssBaseline } from "@material-ui/core";
import LeadCard from "./leadCard";
import SearchInput from 'react-search-input';
import SimpleDatepicker from "./SimpleDatepicker";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: '100%'
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  datepicker: {
    margin: "5px",
  },
  card: {
    margin: "5px",
  },
  search: {
    borderWidth:"0 0 1px 0",
    borderStyle: "solid",
    borderColor: "#8080806b",
    margin: "0 20px 5px",
  },
  paper: {
    padding: 0,
    maxHeight: `calc(100%)`,
    height: 'auto'
  },
  list: {
    margin: theme.spacing(1),
    position: 'relative',
    overflow: 'auto',
    height:"auto",
    fontSize:"11px",
  },
  pad: {
    paddingLeft: 0,
    paddingRight: 0
  }
}));

const selectedDay = (val) =>{
  console.log(val)
};

export default function LeadSidebar(props) {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root} >
      <SimpleDatepicker /> 
      <SearchInput className={`${classes.search} search-input`}/>
      <Paper variant="outlined" className={classes.datepicker} >        
        <SimpleDatepicker
          beforeDate={3} 
          endDate={6} 
          selectDate={""}
          getSelectedDay={selectedDay} 
          labelFormat={"MMMM yyyy E"} 
          color={"#374e8c"} 
          language={"en"} /> 
      </Paper>
      <CssBaseline />
      <Paper elevation={0} className={classes.paper}>
        <List className={classes.list}>
          {[0, 1, 2, 3, 4].map((index) => (
            <ListItem key={index}  className={classes.pad} >
              <LeadCard data={props.data} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Paper>
  );
};