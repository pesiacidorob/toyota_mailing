import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import PaperInfo from './PaperInfo';
import Datepicker from "./Datepicker";
import FullWidthTabs from "./FullWidthTabs";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        maxWidth: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
    }
}));

const selectedDay = (val) =>{
    console.log(val)
  };
  
export default function RightSection(props){
    const classes = useStyles();
    return (
        <Paper className={classes.root}  elevation={3}>
            <>
                <Datepicker
                    beforeDate={3} 
                    endDate={6} 
                    selectDate={""}
                    getSelectedDay={selectedDay} 
                    labelFormat={"MMMM yyyy E"} 
                    color={"#374e8c"} 
                    language={"en"}
                />
                <PaperInfo data={props.data.information} /> 
            </>           
            <FullWidthTabs data={props.data.appointment} />
        </Paper>        
    );
};