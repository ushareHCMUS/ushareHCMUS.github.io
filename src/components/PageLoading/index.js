import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import APPCONFIG from '../../constants/Config';

class PageLoading extends React.Component {
  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'fixed',
          zIndex: 99999999,
          top: 0,
          border: 0,
          left: 0,
          right: 0,
          background: '#00000022'
        }}
      >
        <CircularProgress size={100} thickness={5} color={APPCONFIG.color.primary} />
      </div>
    );
  }
}

export default PageLoading;