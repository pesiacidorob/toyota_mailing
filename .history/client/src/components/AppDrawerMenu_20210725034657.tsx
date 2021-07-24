import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, createStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Typography, ListItemIcon } from "@material-ui/core";
import data from "../data";
import { useState } from "react";

const useStyles = makeStyles((navId) =>
  createStyles(navId)({
    menuItem: {
      color: '#79829c',
      fontWeight: 800,
      paddingTop: "1em",
      paddingBottom: "1em",
      fontSize: 16,
    },
    menuItemIcon: {
      color: navId ? '#79829c' : 'white',
    },
  })
);



const theme = createTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        width: '1.5em',
        height: '1.5em',
      }
    }
  }
})


export default function AppDrawerMenu() {
  const [navId, setNavId] = useState(0);
  const handleColor = (id) => {
    setNavId(id)
  }
  const styles = useStyles(navId);
  console.log(navId)

  return (
    <div style={{paddingTop: '100px'}}>
      {data.menus.map((menu, id: id=index) => (
        <Link key={`link_${index}`} to={menu.link} className="MuiListItem-button">
          <MenuItem key={index} className="MuiListItem-button">
            <ListItemIcon className={styles.menuItemIcon} onClick={() => handleColor(index)}>
              <ThemeProvider theme={theme}>
                {menu.icon}
              </ThemeProvider>
            </ListItemIcon>
            <Typography  variant="h6" component="h6" className={styles.menuItem}>
              {menu.text}
            </Typography>
          </MenuItem>
        </Link>
      ))}
    </div>
  );
}
