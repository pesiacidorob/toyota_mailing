import React from 'react';
import { match } from "react-router-dom";
import { connect } from "react-redux";
import DetailEmail from "./DetailEmail";
import { EmailCRM } from "../types";
import EmailListRow from "./EmailListRow";
import { getAction } from "../actions/emailcrm";
import { thunkApiCall } from "../services/thunks";
import { ApiAction, GET_EMAILCRM, LIST_EMAILCRM } from "../store/types";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Table } from '@material-ui/core';

const useStyles = () => {
    return {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            height: 'auto'
        },
        tableWidth: {
          minWidth: 300
        },
        paper: {
            width: '100%',
            margin: 0,
            height: 'auto',
            display: 'block',
            backgroundColor: 'white',
        },
        column: {
            overflowX: 'hidden',
            textOverflow: 'ellipsis',
        },
        breadcrumbsFont: {
            fontSize: '12px',
        },
        containerP: {
            padding: '20px 25px 0px 25px'
        }, 
        tablea: {
        minWidth: 'auto',
        },
        caret: {
            height: 15,
            backgroundImage: 'url(https://www.gstatic.com/images/icons/material/system/1x/arrow_drop_down_black_20dp.png)',
            width: 15,
            cursor: 'pointer',  
        },
        cellflex: {
            display: 'flex',
            fontSize: '12px'
        },
        font: {
            fontSize: '12px',
            lineHeight: 'o.5'
        },
        pad: {
            padding: '20px'
        }
    }
}
interface EmailCRMProps {
    match?: match;
    emailCrm: EmailCRM;
    emailCrmList: EmailCRM[];
    getEmailCRM: typeof thunkApiCall;
    errorMessage?: string;
    isFetching: boolean;
    updated: boolean;
}  
interface EmailCRMState {
    emailCrm: EmailCRM;
    emailCrmList: EmailCRM[];
    emailCrmId: number;
    emailData: EmailCRM;
  } 
class Inbox extends React.Component<EmailCRMProps, EmailCRMState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props) {
      super(props);
      // this.handleChange = this.handleChange.bind(this);
      this.sendDataToParent = this.sendDataToParent.bind(this);
      this.handleBack = this.handleBack.bind(this);
    }
  
    state = {
      emailCrm: {} as EmailCRM,
      emailCrmList: [] as EmailCRM[],
      emailCrmId: -1, 
      emailData: {} as EmailCRM,     
    };
    
    sendDataToParent = (index, emailDetail) => {
      console.log(index);
      console.log(emailDetail);
      this.setState({ emailCrmId: index });
      this.setState({emailData: emailDetail});
    };

    handleBack = () => {
      this.setState({ emailCrmId: -1 })
    };

    componentDidMount() {
      //   @ts-ignore
      let action: ApiAction;
      // const emailId = this.state.emailCrmId;
      const emailId = this.state.emailCrmId;
      
      if (emailId === -1) {
          action = getAction(LIST_EMAILCRM); //  Object.assign({}, this.getAction);
          this.props.getEmailCRM(action);
      } else {
          action = getAction(GET_EMAILCRM, emailId); //  Object.assign({}, this.getAction);
          console.log(emailId);
          this.props.getEmailCRM(action);  
      };
    } 

    componentDidUpdate(prevProps) {
      // reset page if items array has changed
      if (this.props.emailCrmList !== prevProps.emailCrmList) {
        this.setState({ emailCrmList: this.props.emailCrmList });
      } 
    }   
      
    render() {
        const classes = useStyles();
        const { emailCrm, emailCrmList } = this.props;
        const emailId = this.state.emailCrmId;
        // console.log(this.props);
        
        return (
            <div>
              <div style={{backgroundColor: 'white'}}>
                <Tooltip title="back" arrow placement="top">
                  <IconButton onClick={this.handleBack}>
                      <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
              </div>
              {
                (emailId === -1) ? (
                  <div style={classes.paper}>
                    <Table style={classes.tableWidth}>
                      <tbody>
                        { (emailCrmList.length>0) ? (emailCrmList.map((email, index) => 
                            <EmailListRow email={email} 
                                          key={index} 
                                          emailId={index} 
                                          sendDataToParent={this.sendDataToParent} 
                            />)) : (<tr><td style={{textAlign: 'center'}}>No data</td></tr>)
                        } 
                      </tbody>
                    </Table>
                  </ div> 
                ) : (

                  <DetailEmail email={emailCrm} emailData={this.state.emailData} />

                )
              }

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
      emailCrm,
      emailCrmList,
      isFetching,
      updated,
    } = state.emailCrm;
  
    return {
      emailCrm,
      emailCrmList,
      isFetching,
      updated,
    };
}
  
function mapDispatchToProps(dispatch) {
    return {
      getEmailCRM: (action) => dispatch(thunkApiCall(action)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
