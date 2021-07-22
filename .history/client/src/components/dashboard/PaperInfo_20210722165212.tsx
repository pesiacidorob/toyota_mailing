import React from "react";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Typography, Grid, IconButton, withStyles  } from "@material-ui/core";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({   
    bd: {
        margin: '5px',
        backgroundColor: '#fff4fb'
    },
    mg: {
        margin: '5px',
    },
    typoPad: {
        paddingLeft: '10px'
    },
    align: {
        textAlign: 'right'
    },
    iconPad: {
        padding: '5px'
    },
    topPad: {
        paddingTop: '10px'
    },
}));

const theme = createMuiTheme({
    typography: {
      fontSize: 10,      
    },
  });
const GlobalCss = withStyles({
    '@global': {
        '.MuiSvgIcon-root': {
            fontSize: 'large'
        }
    }
})(() => null);

export default function PaperInfo(props){
    const classes = useStyles();
    return (
        <Paper className={classes.mg} elevation={3}>
            <Grid item container xs={12} className={classes.topPad}>
                {props.data.map((item, index) => (
                    <Grid key={index} item xs={6} className={classes.typoPad}>
                        <ThemeProvider theme={theme}>
                            <Typography display="inline">{item.name}</Typography>
                            <Typography style={{display: "inline-block"}}>{item.value}</Typography>
                        </ThemeProvider>
                    </Grid>
                ))} 
            </Grid>
            <Grid item className={classes.align}>
                {/* <GlobalCss/> */}
                <IconButton aria-label="AddCircleOutline" className={classes.iconPad}>
                    <AddCircleOutlineIcon style={{fontSize: '20px'}}/>
                </IconButton>
            </Grid>
        </Paper>     
    )
};