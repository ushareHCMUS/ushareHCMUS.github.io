import React from 'react';
import APPCONFIG from 'constants/Config';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';
import PageLoading from 'components/PageLoading';
import { connect } from 'react-redux';
import { login } from '../actions/';
import PopupDialog from '../../../components/Dialogs/PopupDialog';
import PasswordTextField from '../../../components/Dialogs/PasswordTextField';
import { isEmail } from '../../../utils/helper';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email:'',
      password:'',
      emailError:'',
      passwordError:'',
      isError: false
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.requestStatus.error) {
      this.setState({ isError: true });
    }
  }

  handleCloseErrorModal = () => {
    this.setState({ isError: false });
  }

  loginHandler = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }

    if(data.email != '' && data.password != ''){
      if(isEmail(data.email)){
        this.props.login(data, () => {
          this.props.history.push('/app/groups');
        },() => {
          this.setState({
            isError: true
          });
        });
      } else {
        let { emailError } = this.state;
        emailError = `Wrong Email format`;
        this.setState({ emailError });
      }
    } else {
      let { emailError, passwordError } = this.state;
      if(data.email == '') {
        emailError = `Email can't be empty`;
      }
      if(data.password == '') {
        passwordError = `Password can't be empty`;
      }
      this.setState({ emailError, passwordError });
    }
  }

  emailChangeHandler = (e) => {
    let { email, emailError } = this.state;
    email = e.currentTarget.value;
    emailError = '';
    this.setState({ email, emailError });
  }

  passwordChangeHandler = (e) => {
    let { password, passwordError } = this.state;
    password = e.currentTarget.value;
    passwordError = '';
    this.setState({ password, passwordError });
  }

  keyDownHandler = (e) => {
    //if is ENTER key
    if(e.keyCode == 13) {
      this.loginHandler();
    }
  }

  render() {
    return (
      <div className="page-login full-height" style={{
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat', 
        backgroundPosition:'center top',
        backgroundImage: `url('https://www.hcmus.edu.vn/images/2018/11/21/bn2.png')`
      }}>
        <PageLoading open={this.props.requestStatus.sending} />
        <div className="main-body">
          <QueueAnim type="bottom" className="ui-animate">
            <div key="1">
              <div className="body-inner">
                <div className="card bg-white">
                  <div className="card-content">

                    <section className="logo text-center">
                      <h1>{APPCONFIG.brand}</h1>
                    </section>

                    <form className="form-horizontal">
                      <fieldset>
                        <div className="form-group">
                          <TextField
                            floatingLabelText="Email"
                            fullWidth
                            onKeyDown={this.keyDownHandler}
                            errorText={this.state.emailError}
                            onChange={this.emailChangeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <PasswordTextField
                            label="Password"
                            onKeyDown={this.keyDownHandler}
                            errorText={this.state.passwordError}
                            textChangeHandler={this.passwordChangeHandler}
                          />
                        </div>
                      </fieldset>
                    </form>
                  </div>
                  <div className="card-action no-border text-right">
                    <FlatButton 
                      style={{margin:'5px'}}
                      onClick={this.loginHandler}>
                      <span className="color-primary" style={{fontSize:'15px', fontWeight:'400'}}>Login</span>
                    </FlatButton>
                  </div>
                </div>
              </div>
            </div>
          </QueueAnim>
          <PopupDialog
            dialogTitle={'Error'}
            content={'Error while login'}
            isOpen={this.state.isError}
            handleCloseModal={this.handleCloseErrorModal}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestStatus: state.requestStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (creds, onSuccess, onErr) => dispatch(login(creds, onSuccess, onErr))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
