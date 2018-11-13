import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  IconButton,
} from 'material-ui';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import PhIcon from 'material-ui/svg-icons/editor/insert-chart';
import QueueAnim from 'rc-queue-anim';
import { getAreaData } from '../actions/index';
import PopupDialog from '../../../../../components/Dialogs/PopupDialog';
import AreaDefinitions from './AreaDefinitions';
import AreaBottom from './AreaBottom';
import AreaRightStorage from './AreaRightStorage';

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorDialogOpen: false,
      errorDialogTitle: '',
      errorDialogContent: '',
    };
  }

  componentDidMount() {
    this.props.getAreaData(() => {
      this.setState({
        errorDialogOpen: true,
        errorDialogTitle: 'Error',
        errorDialogContent: `Can't get zone data`
      });
    });
  }

  errorDialogCloseHandler = () => {
    this.setState({ errorDialogOpen: false });
  }

  renderStorageRegion = (zone_id,direction) => {
    let tooltipStyle = {
      width:'90px',
      fontSize:'15px',
    };
    if(direction == 'left') {
      tooltipStyle.left = '-90px';
      tooltipStyle.top = '14px';
    } else if(direction == 'right') {
      tooltipStyle.right = '-90px';
      tooltipStyle.top = '14px';
    } else if(direction == 'bottom') {
      
    }
    return (
      <IconButton
        disableFocusRipple={true}
        centerRipple={true}
        disableTouchRipple={true}
        tooltip=
        {<div>
          <div>Active</div>
          <div>t° : 39°C</div>
          <div>h  : 25% </div>
          <div>ph : 6   </div>
        </div>}
        tooltipPosition={''}
        tooltipStyles={tooltipStyle}
        style={{
          padding:'0px',
          width:'100%',
          height:'24px'
        }}
        children={
        <StorageIcon 
          style={{
            position:'absolute',
            top:'0px'
          }}/>}
      />
    );
  }

  renderPhRegion = (zone_id) => { 
    return (
      <IconButton
        disableFocusRipple={true}
        centerRipple={true}
        disableTouchRipple={true}
        tooltip=
        {<div>
          <div>Active</div>
          <div>ph : 6   </div>
        </div>}
        tooltipPosition={''}
        tooltipStyles={{
          width:'90px',
          fontSize:'15px'
        }}
        style={{
          padding:'0px',
          width:'100%',
          height:'24px'
        }}
        children={
        <PhIcon
          style={{
            position:'absolute',
            top:'0px'
          }}/>}
      />
    );
  }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs content-page">
        <QueueAnim type="bottom" className="ui-animate">
          <Paper className={'position-relative d-flex flex-column'} style={{padding:'15px'}}>
            <div className={'d-flex flex-row justify-content-between'}>
              <AreaDefinitions/>

              <AreaRightStorage
                renderStorageRegion={this.renderStorageRegion}
              />
            </div>

            <div style={{height:'36px'}}>
            </div>

            <AreaBottom
              renderPhRegion={this.renderPhRegion}
              renderStorageRegion={this.renderStorageRegion}
            />

            <PopupDialog
              dialogTitle={this.state.errorDialogTitle}
              content={this.state.errorDialogContent}
              isOpen={this.state.errorDialogOpen}
              handleCloseModal={this.errorDialogCloseHandler}
            />
          </Paper>
        </QueueAnim>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
  getAreaData
};

export default connect(mapStateToProps,mapDispatchToProps)(Area);