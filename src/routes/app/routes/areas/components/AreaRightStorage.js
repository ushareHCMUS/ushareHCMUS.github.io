import React ,{ Component } from 'react';
import PowerIcon from 'material-ui/svg-icons/image/flash-on';
import {
  leftStorageZoneContainerStyle,
  horizontalLeftContentStyle,
  horizontalLineBottomStyle,
  horizontalLineTopStyle,
  horizontalRightContentStyle,
  rightStorageZoneContainerStyle,
  verticalLineBottomStyle,
  verticalLineTopStyle,
  zoneBlockStyle
} from './AreaStyle';

class AreaRightStorage extends Component {
  render(){
    return (
      <div className={'d-flex flex-row'}>
        <div style={leftStorageZoneContainerStyle}>
          <div style={zoneBlockStyle}>
          </div>
          <div style={zoneBlockStyle}>
            <div style={horizontalLeftContentStyle}>
              {this.props.renderStorageRegion('1','left')}
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
              {this.props.renderStorageRegion('2','left')}
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
              {this.props.renderStorageRegion('3','left')}
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
              {this.props.renderStorageRegion('4','left')}
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
              {this.props.renderStorageRegion('5','right')}
            </div>
            <div style={horizontalLineBottomStyle}>
            
            </div>
          </div>
          <div style={zoneBlockStyle}>
          </div>
          <div style={zoneBlockStyle}>
            <div style={horizontalLeftContentStyle}>
              {this.props.renderStorageRegion('6','right')}
            </div>
            <div style={horizontalLineBottomStyle}>
            
            </div>
          </div>
          <div style={zoneBlockStyle}>
          </div>
          <div style={zoneBlockStyle}>
            <div style={horizontalLeftContentStyle}>
              {this.props.renderStorageRegion('7','right')}
            </div>
            <div style={horizontalLineBottomStyle}>
            
            </div>
          </div>
          <div style={zoneBlockStyle}>
          </div>
          <div style={zoneBlockStyle}>
            <div style={horizontalLeftContentStyle}>
              {this.props.renderStorageRegion('8','right')}
            </div>
            <div style={horizontalLineBottomStyle}>
            
            </div>
          </div>
          <div style={zoneBlockStyle}>
          </div>
        </div>
      </div>     
    );
  }
}

export default AreaRightStorage;