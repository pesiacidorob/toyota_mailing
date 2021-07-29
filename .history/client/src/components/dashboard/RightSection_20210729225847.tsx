import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
// import PaperInfo from '../PaperInfo';
import Datepicker from "./Datepicker";
import DatePicker from "react-horizontal-datepicker";
// import FullWidthTabs from "../FullWidthTabs";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        maxWidth: 'auto',
        height: '100%',
        marginTop: 8
    }
}));


export default function RightSection(props){
    const selectedDay = (val) =>{
        console.log(val)
      };
    const classes = useStyles();
    return (
        <Paper className={classes.root}  elevation={3}>
            {/* <Datepicker
                beforeDate={3} 
                endDate={6} 
                selectDate={""}
                getSelectedDay={selectedDay} 
                labelFormat={"MMMM yyyy E"} 
                color={"#374e8c"} 
                language={"en"}
            /> */}
            {/* <DatePicker getSelectedDay={selectedDay}
                  endDate={100}
                  selectDate={new Date("2020-04-30")}
                  labelFormat={"MMMM"}
                  color={"#374e8c"} />    */}
            {/* <PaperInfo data={props.data.information} />            
            <FullWidthTabs data={props.data.appointment} /> */}
        </Paper>        
    );
};