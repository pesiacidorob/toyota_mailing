import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { blue } from "@material-ui/core/colors";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, ListItemIcon } from "@material-ui/core";
import data from "../data";

const blue600 = blue["800"];
const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      '&:active': {
        color: 'white'
      },
      color: '#79829c',
      fontWeight: 800,
      paddingTop: "0.2em",
      paddingBottom: "0.2em",
      fontSize: 16,
    },
    menuItemIcon: {
      color: '#79829c',
    } 
  })
);

export default function AppDrawerMenu() {
  const styles = useStyles();

  return (
    <div style={{paddingTop: '100px'}}>
      {data.menus.map((menu, index) => (
        <Link key={`link_${index}`} to={menu.link} className="MuiListItem-button">
          <MenuItem key={index} className="MuiListItem-button">
            <ListItemIcon className={styles.menuItemIcon}>{menu.icon}</ListItemIcon>
            <Typography  variant="h6" component="h6" className={styles.menuItem}>
              {menu.text}
            </Typography>
          </MenuItem>
        </Link>
      ))}
    </div>
  );
}
