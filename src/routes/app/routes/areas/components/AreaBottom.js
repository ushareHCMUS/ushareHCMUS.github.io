import React, { Component } from 'react'
import {
  houseContainerStyle,
  phBlockStyle,
  phBottomLeftBlockStyle,
  phBottomRightBlockStyle,
  phContainerStyle,
  phPowerStyle,
  phTopLeftBlockStyle,
  phTopRightBlockStyle,
  topLeftLineStyle,
  topRightLineStyle,
  wifiBoxStyle,
  centerContentStyle,
  centerVerticalLineStyle,
  bottomLeftLineStyle,
  bottomRighLineStyle,
  contentLeftVerticalLine,
  contentLeftZone,
  contentRightVerticalLine,
  contentRightZone,
} from './AreaStyle';

import PowerIcon from 'material-ui/svg-icons/image/flash-on';
import WifiIcon from 'material-ui/svg-icons/hardware/router';

class AreaBottom extends Component {
  render() {
    return (
      <div className={'d-flex flex-row justify-content-between align-items-end'}>
        <div>
          <div className={'d-flex flex-row'}>
            <div style={houseContainerStyle}>
              <div style={centerVerticalLineStyle}>

              </div>

              <div style={centerContentStyle}>
                <div style={contentLeftVerticalLine}>
                  <div style={contentLeftZone}>
                    {this.props.renderStorageRegion('9','bottom')}
                  </div>
                </div>
                <div style={contentRightVerticalLine}>
                  <div style={contentRightZone}>
                    {this.props.renderStorageRegion('10','bottom')}
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
                  {this.props.renderPhRegion('11')}
                </div>
              </div>
              <div style={phBlockStyle}>
                <div style={phBottomLeftBlockStyle}>
                  {this.props.renderPhRegion('12')}
                </div>
              </div>
            </div>
            <div>
              <div style={phBlockStyle}>
                <div style={phTopRightBlockStyle}>
                  {this.props.renderPhRegion('13')}
                </div>
              </div>
              <div style={phBlockStyle}>
                <div style={phBottomRightBlockStyle}>
                  {this.props.renderPhRegion('14')}
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
    );
  }
}

export default AreaBottom;