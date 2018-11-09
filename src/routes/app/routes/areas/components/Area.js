import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
} from 'material-ui';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import PowerIcon from 'material-ui/svg-icons/image/flash-on';
import WifiIcon from 'material-ui/svg-icons/hardware/router';
import PhIcon from 'material-ui/svg-icons/editor/insert-chart';
import QueueAnim from 'rc-queue-anim';
import { getAreaData } from '../actions/index';
import PopupDialog from '../../../../../components/Dialogs/PopupDialog';

//Storage region
const leftStorageZoneContainerStyle = {
  width:'200px',
  height:'500px',
  borderTop:'1px solid #AAAAAA',
  borderBottom:'1px solid #AAAAAA',
  borderLeft:'1px solid #AAAAAA'
};

const rightStorageZoneContainerStyle = {
  width:'200px',
  height:'500px',
  borderTop:'1px solid #AAAAAA',
  borderBottom:'1px solid #AAAAAA',
  borderRight:'1px solid #AAAAAA'
};

const zoneBlockStyle = {
  width:'100%',
  height:'50px',
  border:'1px solid #AAAAAA',
  position:'relative'
};

const horizontalLeftContentStyle = {
  display:'flex',
  justifyContent:'center',
  width:'90px',
  height:'24px',
  background:'#AAAAAA',
  position:'absolute',
  bottom:'-12px',
  left:'50%',
  transform:'translate(-50%, 0%)',
  zIndex:'10'
};

const horizontalRightContentStyle = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'60px',
  height:'24px',
  background:'red',
  position:'absolute',
  top:'23px',
  right:'-30px',
  transform:'translate(0%, -50%)',
  zIndex:'10'
};

const horizontalLineTopStyle = {
  border:'1px solid blue', 
  position:'absolute',
  bottom:'-2px',
  right:'-2px',
  width:'56px',
  zIndex:'10'
};

const horizontalLineBottomStyle = {
  border:'1px solid blue', 
  position:'absolute',
  bottom:'-2px',
  left:'-2px',
  width:'56px',
  zIndex:'10'
};

const verticalLineBottomStyle = {
  border:'1px solid blue', 
  position:'absolute',
  bottom:'0px',
  right:'-2px',
  width:'2px',
  height:'13px',
  zIndex:'10'
};

const verticalLineTopStyle = {
  border:'1px solid blue', 
  position:'absolute',
  top:'0px',
  right:'-2px',
  width:'2px',
  height:'13px',
  zIndex:'10'
};

//House region
const houseContainerStyle = {
  border:'2px solid #AAAAAA',
  width:'400px',
  height:'300px',
  position:'relative'
};

const centerVerticalLineStyle = {
  border:'1px solid blue',
  height:'150px',
  position:'absolute',
  left:'50%'
};

const wifiBoxStyle= {
  display:'flex',
  justifyContent:'center',
  width:'120px',
  height:'24px',
  background:'#AAAAAA',
  position:'absolute',
  top:'-24px',
  left:'50%',
  transform:'translate(-50%,0)',
  zIndex:'10'
};

const centerContentStyle = {
  border:'1px solid blue',
  width:'220px',
  height:'0px',
  position:'relative',
  top:'50%',
  left:'50%',
  transform:'translate(-50%,0)'
};

const contentLeftVerticalLine = {
  border:'1px solid blue',
  width:'0px',
  height:'10px',
  position:'absolute',
  left:'-1px',
  top:'-10px'
};

const contentLeftZone = {
  display:'flex',
  justifyContent:'center',
  width:'90px',
  height:'24px',
  background:'#AAAAAA',
  position:'absolute',
  top:'-24px',
  left:'-45px',
  zIndex:'10'
};

const contentRightVerticalLine = {
  border:'1px solid blue',
  width:'0px',
  height:'10px',
  position:'absolute',
  right:'-1px',
  top:'-10px'
};

const contentRightZone = {
  display:'flex',
  justifyContent:'center',
  width:'90px',
  height:'24px',
  background:'#AAAAAA',
  position:'absolute',
  top:'-24px',
  right:'-45px',
  zIndex:'10'
};

//PH region
const phContainerStyle = {
  border:'1px solid #AAAAAA',
  width:'260px', 
  height:'260px',
  display:'flex',
  flexDirection:'row'
};

const phBlockStyle = {
  border:'1px solid #AAAAAA',
  width:'130px', 
  height:'130px',
  position:'relative'
}
const phTopLeftBlockStyle = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'50px',
  height:'50px',
  background:'#AAAAAA',
  borderRight:'2px solid #AAAAAA',
  borderBottom:'2px solid #AAAAAA'
};

const phBottomLeftBlockStyle = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'50px',
  height:'50px',
  background:'#AAAAAA',
  borderRight:'2px solid #AAAAAA',
  borderTop:'2px solid #AAAAAA',
  position:'absolute',
  bottom:'0px'
};

const phTopRightBlockStyle = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'50px',
  height:'50px',
  background:'#AAAAAA',
  borderLeft:'2px solid #AAAAAA',
  borderBottom:'2px solid #AAAAAA',
  position:'absolute',
  right:'0px'
};

const phBottomRightBlockStyle = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  width:'50px',
  height:'50px',
  background:'#AAAAAA',
  borderLeft:'2px solid #AAAAAA',
  borderTop:'2px solid #AAAAAA',
  position:'absolute',
  right:'0px',
  bottom:'0px'
};

const phPowerStyle = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  background:'red',
  position:'absolute',
  width:'35%',
  height:'35%',
  left:'50%',
  top:'50%',
  transform:'translate(-50%,-50%)'
};

const topLeftLineStyle = {
  border:'1px solid blue', 
  position:'absolute',
  width:'50px',
  left:'-46%',
  top:'-20%',
  transform:'rotate(45deg)'
};

const bottomLeftLineStyle =  {
  border:'1px solid blue', 
  position:'absolute',
  width:'50px',
  left:'-46%',
  bottom:'-20%',
  transform:'rotate(-45deg)'
};

const bottomRighLineStyle = {
  border:'1px solid blue', 
  position:'absolute',
  width:'50px',
  right:'-46%',
  bottom:'-20%',
  transform:'rotate(45deg)'
};

const topRightLineStyle = {
  border:'1px solid blue', 
  position:'absolute',
  width:'50px',
  right:'-46%',
  top:'-20%',
  transform:'rotate(-45deg)'
};

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorDialogOpen: false,
      errorDialogTitle: '',
      errorDialogContent: ''
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

  render() {
    return (
      <div className="container-fluid no-breadcrumbs content-page">
        <QueueAnim type="bottom" className="ui-animate">
          <Paper className={'position-relative d-flex flex-column'} style={{padding:'15px'}}>
            <div className={'d-flex flex-row justify-content-between'}>
              <div className={'d-flex flex-column'}>
                <div>
                  Walls
                </div>
                <div>
                  Battery
                </div>
                <div>
                  Coffee Toaster
                </div>
                <div>
                  Ph meter
                </div>
                <div>
                  Wifi Router
                </div>
                <div>
                  Electric cable
                </div>
              </div>

              <div className={'d-flex flex-row'}>
                <div style={leftStorageZoneContainerStyle}>
                  <div style={zoneBlockStyle}>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>

                    <div style={horizontalLineTopStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={verticalLineTopStyle}>
                    
                    </div>

                    <div style={horizontalRightContentStyle}>
                      <PowerIcon style={{color:'yellow'}}/>
                    </div>

                    <div style={verticalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>

                    <div style={horizontalLineTopStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={verticalLineTopStyle}>
                    
                    </div>

                    <div style={horizontalRightContentStyle}>
                      <PowerIcon style={{color:'yellow'}}/>
                    </div>

                    <div style={verticalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>

                    <div style={horizontalLineTopStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={verticalLineTopStyle}>
                    
                    </div>

                    <div style={horizontalRightContentStyle}>
                      <PowerIcon style={{color:'yellow'}}/>
                    </div>

                    <div style={verticalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>

                    <div style={horizontalLineTopStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={verticalLineTopStyle}>
                    
                    </div>

                    <div style={horizontalRightContentStyle}>
                      <PowerIcon style={{color:'yellow'}}/>
                    </div>

                    <div style={verticalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                  </div>
                </div>     
                <div style={rightStorageZoneContainerStyle}>
                  <div style={zoneBlockStyle}>
                  </div>
                  <div style={zoneBlockStyle}>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>
                    <div style={horizontalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>
                    <div style={horizontalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>
                    <div style={horizontalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                  </div>
                  <div style={zoneBlockStyle}>
                    <div style={horizontalLeftContentStyle}>
                      <StorageIcon/>
                    </div>
                    <div style={horizontalLineBottomStyle}>
                    
                    </div>
                  </div>
                  <div style={zoneBlockStyle}>
                  </div>
                </div>
              </div>     
            </div>

            <div style={{height:'36px'}}>
            </div>

            <div className={'d-flex flex-row justify-content-between align-items-end'}>
              <div>
                <div className={'d-flex flex-row'}>
                  <div style={houseContainerStyle}>
                    <div style={centerVerticalLineStyle}>

                    </div>

                    <div style={centerContentStyle}>
                      <div style={contentLeftVerticalLine}>
                        <div style={contentLeftZone}>
                          <StorageIcon/>
                        </div>
                      </div>
                      <div style={contentRightVerticalLine}>
                        <div style={contentRightZone}>
                          <StorageIcon/>
                        </div>
                      </div>
                    </div>

                    <div style={wifiBoxStyle}>
                      <WifiIcon/>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className={'position-relative'}>
                <div style={phContainerStyle}>
                  <div>
                    <div style={phBlockStyle}>
                      <div style={phTopLeftBlockStyle}>
                        <PhIcon/>
                      </div>
                    </div>
                    <div style={phBlockStyle}>
                      <div style={phBottomLeftBlockStyle}>
                        <PhIcon/>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={phBlockStyle}>
                      <div style={phTopRightBlockStyle}>
                        <PhIcon/>
                      </div>
                    </div>
                    <div style={phBlockStyle}>
                      <div style={phBottomRightBlockStyle}>
                        <PhIcon/>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={phPowerStyle}>
                  <div style={topLeftLineStyle}>

                  </div>
                  <div style={bottomLeftLineStyle}>

                  </div>
                  <div style={bottomRighLineStyle}>

                  </div>
                  <div style={topRightLineStyle}>

                  </div>

                  <PowerIcon style={{color:'yellow',width:'36px',height:'36px'}}/>
                </div>
              </div>
            </div>
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