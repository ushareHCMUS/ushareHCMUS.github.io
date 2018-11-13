import React ,{ Component } from 'react';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import PowerIcon from 'material-ui/svg-icons/image/flash-on';
import WifiIcon from 'material-ui/svg-icons/hardware/router';
import PhIcon from 'material-ui/svg-icons/editor/insert-chart';

class AreaDefinitions extends Component {
  render(){
    return (
      <div style={{marginLeft:'50px'}}>
        <div>
          <h3 style={{marginLeft:'-15px'}}>Zone map </h3>
          <h4>Definitions :</h4>
        </div>
        <div className={'d-flex flex-row'} style={{marginLeft:'25px'}}>
          <div className={'d-flex flex-column'}>
            <div>
              <h5>Walls :</h5>
            </div>
            <div>
              <h5>Battery :</h5>
            </div>
            <div>
              <h5>Coffee Toaster :</h5>
            </div>
            <div>
              <h5>Ph :</h5>
            </div>
            <div>
              <h5>Wifi Router :</h5>
            </div>
            <div>
              <h5>Electric cable :</h5>
            </div>
          </div>
          <div className={'d-flex flex-column'} style={{marginLeft:'20px'}}>
            <div className={'d-flex flex-row justify-content-center'} style={{border:'2px solid #AAAAAA',width:'80px',height:'36px', margin:'13px 0px'}}/>
            <div className={'d-flex flex-row justify-content-center align-items-center'} style={{background:'red',width:'80px',height:'36px', margin:'13px 0px'}}>
              <PowerIcon color={'yellow'}/>
            </div>
            <div className={'d-flex flex-row justify-content-center align-items-center'} style={{background:'#AAAAAA',border:'2px solid #AAAAAA',width:'80px',height:'36px', margin:'13px 0px'}}>
              <StorageIcon/>
            </div>
            <div className={'d-flex flex-row justify-content-center align-items-center'} style={{background:'#AAAAAA',border:'2px solid #AAAAAA',width:'80px',height:'36px', margin:'13px 0px'}}>
              <PhIcon/>
            </div>
            <div className={'d-flex flex-row justify-content-center align-items-center'} style={{background:'#AAAAAA',border:'2px solid #AAAAAA',width:'80px',height:'36px', margin:'13px 0px'}}>
              <WifiIcon/>
            </div>
            <div className={'d-flex flex-row justify-content-center align-items-center'} style={{width:'80px',height:'36px', margin:'13px 0px'}}>
              <div style={{width:'80px',border:'1px solid blue'}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AreaDefinitions;