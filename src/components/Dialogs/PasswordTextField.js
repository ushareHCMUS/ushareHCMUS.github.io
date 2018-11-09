import React, { Component } from 'react';
import {
  TextField,
} from 'material-ui';
import APPCONFIG from 'constants/Config';

class PasswordTextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentType: 'password',
      currentText: ''
    }
  }

  textChangeHandler = (e) => {
    this.setState({ currentText: e.currentTarget.value })
  }

  render() {
    return (
      <div className='w-100 d-inline-block' style={{ position: 'relative' }}>
        <TextField
          floatingLabelText={this.props.label}
          type={this.state.currentType}
          onChange={this.props.textChangeHandler}
          onKeyDown={this.props.onKeyDown}
          name={this.props.label}
          errorText={this.props.errorText}
          fullWidth
        />
        <i className='material-icons'
          style={{ position: 'absolute', right: '0px', top: '38px', fontSize: '24px', color: 'rgba(0,0,0,0.37)' }}
          onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
          onClick={(e) => {
            if (e.currentTarget.innerText === 'visibility_off') {
              e.currentTarget.innerText = 'visibility';
              this.setState({ currentType: 'password' });
            }
            else {
              e.currentTarget.innerText = 'visibility_off';
              this.setState({ currentType: 'text' });
            }
          }}
        >
          visibility
        </i>
      </div>
    )
  }
}

export default PasswordTextField;
