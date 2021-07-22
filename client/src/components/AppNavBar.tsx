import React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color:"red",
    display:"inline",
    fontWeight:"bold",
  },
  toolbar: {
    minHeight: 0,
    maxHeight:45,
  },
  button:{
    backgroundColor: "white",
    borderRadius: 0,
    marginLeft:"-23px",
  },
  brand: {
    color: "black",
    paddingLeft: "5px",
  }
}));
interface AppNavBarProps {
  handleDrawerToggle: () => void;
  styles: TODO;
}

const AppNavBar: React.FC<AppNavBarProps> = ({ styles, handleDrawerToggle}) => {
  
  let style = useStyles(styles);
  return (
    <div>
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar variant="dense" className={styles.toolbar}>
          <IconButton
            edge="start"
               onClick={handleDrawerToggle}
            color="inherit"
            aria-label="menu"
            className={style.button}
          >
            <Typography variant="h4"  className={style.title}>
              S
            </Typography>
          </IconButton>
          <Typography variant="h4" className={style.brand}>
            Drive
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavBar;
