import React from "react";
import SendIcon from '@material-ui/icons/Send';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import {Card, Grid} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "100%",
  },
  title: {
    backgroundColor: "#556ee6",
    margin: "0 20px 0 10px",
    padding: "4px 6px",
    borderRadius:"3px",
  },
  iconbutton: {
    border: "1px solid", 
    padding: "3px",
    margin: "3px",
    justifyContent:"space-evenly",
    backgroundColor:"white"
  },
  ContentHead:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    transform:"translate(-0px,-25px)",
    zIndex: 0,
    position: "absolute"
  },
  contentFooter: {
    position: 'absolute',
    bottom: '0',
  },
  card: {
    padding: "25px 8px"
  },
  contentL:{
    fontSize:"10px",
    display: 'inline-block'
  },
  contentR:{
    fontSize:"10px",
    display: 'inline-block'
  },
  borderBT: {
    borderBottom: '1px solid',
    margin: '0px 20px',
    padding: '5px'
  },
  bg: {
    borderRadius: '0px 5px',
    margin: '3px 30px 3px 40px',
    padding: '2px',

  }
}));

export default function LeadCard(props) {
  let classes = useStyles();
  const i = props.data;

  return(
    <Card className={classes.root} elevation={3}>
      <div className={classes.ContentHead}>
        <Typography variant="subtitle2" className={classes.title}>Email Replied</Typography>
        <IconButton color="secondary" className={classes.iconbutton} >
          <DirectionsCarIcon/>
        </IconButton>
        <IconButton color="primary" className={classes.iconbutton} >
          <DeleteForeverIcon/>
        </IconButton>
        <IconButton style={{ color: 'green' }} className={classes.iconbutton} >
          <SendIcon/>
        </IconButton>
        <IconButton className={classes.iconbutton} style={{color: 'rgb(241, 180, 76)'}} >
          <AutorenewIcon/>
        </IconButton>
      </div>
      <CardContent className={classes.card}>
        <Grid item container xs={12} md={12} >
            <Grid item container xs={6} style={{borderRight: '1px solid'}}>
                {[0,1,2,3,4,].map((index) => (<Grid item xs={12} key={index} className={classes.borderBT} style={{borderBottom:(index===4) ? 'none' : "1px solid" }}>
                      <Typography className={classes.contentL} display="inline">{i[index].name}</Typography>
                      <Typography className={classes.contentL}>{i[index].value}</Typography>
                    </Grid>
                ))} 
            </Grid>
            <Grid item container xs={6}>
                {[5,6,7,8,9,10].map((index) => (<Grid item container xs={12} key={index} className={classes.bg} style={{backgroundColor: i[index].color}}>
                      <Grid item xs={8}>
                        <Typography className={classes.contentR} display="inline">{i[index].name}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography className={classes.contentR}>{i[index].value}</Typography>
                      </Grid>
                    </Grid>
                ))} 
            </Grid>
        </Grid>
      </CardContent>
      <div className={classes.contentFooter}>
        <IconButton className={classes.iconbutton} style={{color: 'red'}} >
          <FireplaceIcon/>
        </IconButton>
        <IconButton className={classes.iconbutton}>
          <FileCopyIcon/>
        </IconButton>
      </div>
    </Card>
  );
};