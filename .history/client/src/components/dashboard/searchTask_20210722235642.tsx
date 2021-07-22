import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import { grey } from "@material-ui/core/colors";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ListItemText from '@material-ui/core/ListItemText';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import { InputBase, Button } from '@material-ui/core';
import { createTheme, withStyles, createStyles, Theme, makeStyles,ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components'
import { FcCalendar, FcCollaboration, FcDecision, FcContacts, FcEditImage, FcList, FcBullish, FcDepartment, FcIphone, FcFaq, FcSms, FcTemplate,} from "react-icons/fc";

const grey600 = grey["600"];
const Button1 =styled(Button)`
  margin: 3px;
  border-radius: 0 4px 0 4px;
  line-height: 2;
  font-size: 10;  
`;
const Button2 =styled(Button)`
  min-width: fit-content;
  font-size: 12px;
  padding: 8px;
`;

const theme = createTheme({
    overrides: {
        // Style sheet name ⚛️
        MuiTypography: {
            // Name of the rule
            body1: {
            // Some CSS
            fontSize: '10px',
            },
        },
    },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
      width: '100%'
    },
    bar:{
      backgroundColor: grey["100"],
      fontSize: 10,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    toolbar: {
      padding: "10px",
      justifyContent: "space-between", 
      flexWrap: "wrap"
    },
    buttons: {
      display:"inline-flex",
      flexWrap: "wrap",

    },
    link: {
      fontWeight: 300,
      padding: "2px",
      fontSize: 10,
      marginBottom: '0px!important',
    },
    search: {
      fontSize: 10,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: 'white',
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1.5),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      '&:focus': {
        display: 'none',
      },
      alignItems: 'center',
      justifyContent: 'center',
      color:"grey",
    },
    inputRoot: {
      color: grey600,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: '11ch'
      },
    },
    apps: {
      color: "black",
      margin: "3px",
      justifyContent: "inherit",
    },
    leadBtn: {
      borderRadius: "4px", 
      lineHeight:2, 
      marginBottom: '0px!important', 
      backgroundColor: "#50a5f1",
      paddingTop: '10px',
      paddingBottom: '10px',
    },
    label: {
        display: 'block',
        fontSize: '10px'
    },
    listItemTextRoot: {
        marginTop: '-5px',
    },
    body1: {
        fontSize: '10px',
        color: 'black'
    }
  }),
);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '285px',
    display: 'inline-block',
    padding: '30px 0',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const IconButtonData = [
    { icon: <FcCalendar style={{ fontSize: 40 }} />, label: 'Calendar' },
    { icon: <FcCollaboration style={{ fontSize: 40 }} />, label: 'Team Chat' },
    { icon: <FcDecision style={{ fontSize: 40 }} />, label: 'Queries' },
    { icon: <FcContacts style={{ fontSize: 40 }} />, label: 'Contacts' },
    { icon: <FcEditImage style={{ fontSize: 40 }} />, label: 'Build' },
    { icon: <FcList style={{ fontSize: 40 }} />, label: 'Inventory' },
    { icon: <FcBullish style={{ fontSize: 40 }} />, label: 'Analytics' },
    { icon: <FcDepartment style={{ fontSize: 40 }} />, label: 'Marketing' },
    { icon: <FcIphone style={{ fontSize: 40 }} />, label: 'Intelligence' },
    { icon: <FcFaq style={{ fontSize: 40 }} />, label: 'Web chat' },
    { icon: <FcSms style={{ fontSize: 40 }} />, label: 'Email' },
    { icon: <FcTemplate style={{ fontSize: 40 }} />, label: 'Templates' },
];

// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);

export default function SearchTask() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root} >
      <AppBar position="static" className={classes.bar} >
        <Toolbar  variant="dense" className={classes.toolbar} >
          <div className={classes.buttons} >
            <Button1 variant="contained" size="small" style={{ backgroundColor: "#50a5f1" }}>
              Pending
            </Button1>
            <Button1 variant="contained" size="small" style={{ backgroundColor: "rgba(85,110,230,.25)" }}>
              Scheduled
            </Button1>
            <Button1 variant="contained" size="small" style={{ backgroundColor: "rgba(85,110,230,.25)" }}>
              Replied
            </Button1>
            <Button1 variant="contained" size="small" style={{ backgroundColor: "#f1b44c"}} >
                Accomplished
            </Button1 >
          {/* </div>
          <div> */}
            {['Email', 'Call', 'SMS', 'Appt', 'Build', 'Note', 'Solid'].map((text, index) => (
              <Button2 className={classes.link}  key={index}>
                {text}
              </Button2>
            ))}
          </div>
          <div>
            <Button variant="contained" size="medium" className={classes.leadBtn}>
              Creat leads
            </Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search Tasks"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div>
              <IconButton
                edge="end"
                className={classes.apps}
                size='medium'
                onClick={handleClick}
              >
                <AppsIcon style={{fontSize: 40}}/>
              </IconButton>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                  { 
                      IconButtonData.map((data, index) => 
                          <IconButton key={index} aria-label={data.label} classes={{label: classes.label}}>
                              {data.icon}
                              <ThemeProvider theme={theme}>
                                  <ListItemText primary={data.label} classes={{ root: classes.listItemTextRoot}}/>
                              </ThemeProvider>
                          </IconButton>
                      )
                  }
              </StyledMenu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}