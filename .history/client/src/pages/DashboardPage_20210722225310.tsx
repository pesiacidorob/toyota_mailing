import React from "react";
import Data from "../data";
import Inbox from '../components/dashboard/Inbox';
import { Grid } from '@material-ui/core';
import SearchTask from '../components/dashboard/searchTask'
import LeadsSidebar from '../components/dashboard/leadsSidebar'
import RightSection from '../components/dashboard/RightSection'

const styles = {
  navigation: {
    fontSize: 15,
    fontWeight: 400, 
    color: "grey600",
    // paddingBottom: 15,
    display: "block",
  },
  cell: {
    padding: "0.5em",
    display: 'flex', 
  },
  height: {
    height: `calc(100%-79px)`,
    margin: '1px',
    flex: '1' 
  },
  flexdir: {
    flexDirection: 'row'
  }
};

const DashboardPage = () => {
  console.log();
  return (
    <>
      <Grid container style={{padding: '1px', height: '100%'}}>
        <Grid item lg={3} md={4} xs={12} style={{height: '100%'}}>
          <LeadsSidebar data={Data.dashBoardPage.rightSection} />
        </Grid>
        <Grid item lg={9} md={8} xs={12} style={{display: 'flex', flexDirection: 'column' }}>
          <SearchTask />
          <Grid item container style={ styles.height } >
            <Grid item style={{}} lg={8} xs={12}>
              <Inbox />
            </Grid>
            <Grid item style={styles.cell} lg={4} xs={12}>
              <RightSection data={Data.dashBoardPage.rightSection} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
