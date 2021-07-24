import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, ListItemIcon } from "@material-ui/core";
import data from "../data";

const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      color: '#79829c',
      fontWeight: 800,
      paddingTop: "0.5em",
      paddingBottom: "0.5em",
      fontSize: 16,
    },
    menuItemIcon: {
      color: '#79829c',
      width: '1.5em',
      height: '1.5em',
    } 
  })
);

export default function AppDrawerMenu() {
  const styles = useStyles();
  const classes = useStyles();

  return (
    <div style={{paddingTop: '100px'}}>
      {data.menus.map((menu, index) => (
        <Link key={`link_${index}`} to={menu.link} className="MuiListItem-button">
          <MenuItem key={index} className="MuiListItem-button">
            <ListItemIcon classes={{root: classes.menuItemIcon}}>{menu.icon}</ListItemIcon>
            <Typography  variant="h6" component="h6" className={styles.menuItem}>
              {menu.text}
            </Typography>
          </MenuItem>
        </Link>
      ))}
    </div>
  );
}
