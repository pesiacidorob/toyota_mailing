import React from "react";
import clsx from 'clsx'
import Drawer from "@material-ui/core/Drawer";
import { blue, common } from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppDrawerMenu from "./AppDrawerMenu";

const blue600 = blue["900"];
const drawerWidth = 250;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    user: {
      fontSize: 15,
      color: common.white,
    },
    menuItem: {
      color: blue600,
      fontWeight: 500,
      paddingTop: "0.2em",
      paddingBottom: "0.2em",
      fontSize: 16,
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: "#2a3042",
      overflow: "auto",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: "#2a3042",
      overflow: "auto",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 60,
    },
  })
);
interface Props {
  navDrawerOpen: boolean;
  username: string;
  onSignoutClick: () => void;
  onChangePassClick: ()=>void;
  handleDrawerToggle: () => void;
  isSmallScreem: boolean;
  drawerStyle: {};
  children?: TODO;
}

export default function AppNavDrawer(props: Props) {
  const styles = useStyles();
  const {
    navDrawerOpen,
    isSmallScreem,
    handleDrawerToggle,
    drawerStyle,
  } = props;  

  const drawer = (
    <>
      {/* <AppUserMenu username={username} onSignoutClick={onSignoutClick}   onChangePassClick={onChangePassClick} /> */}
      <AppDrawerMenu />
    </>
  );

  return (
    <div className={styles.root}>
      <nav style={drawerStyle} aria-label="app navigation">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {!isSmallScreem ? (
          <Drawer
            variant="persistent"
            anchor="left"
            open={true}
            onClose={handleDrawerToggle}
            className={clsx(drawerStyle, {
              [styles.drawerOpen]: !navDrawerOpen,
              [styles.drawerClose]: navDrawerOpen,
            })}
            classes={{
              paper: clsx({
                [styles.drawerOpen]: !navDrawerOpen,
                [styles.drawerClose]: navDrawerOpen,
              }),
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            className={clsx(drawerStyle, {
              [styles.drawerOpen]: !navDrawerOpen,
              [styles.drawerClose]: navDrawerOpen,
            })}
            classes={{
              paper: clsx({
                [styles.drawerOpen]: !navDrawerOpen,
                [styles.drawerClose]: navDrawerOpen,
              }),
            }}
            variant="temporary"
            onClose={handleDrawerToggle}
            // open={navDrawerOpen}
          >
            {drawer}
          </Drawer>
        )}
      </nav>
    </div>
  );
}
