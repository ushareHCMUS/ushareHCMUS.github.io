import React from 'react';
import APPCONFIG from 'constants/Config';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import QueueAnim from 'rc-queue-anim';
import PageLoading from 'components/PageLoading';
import { connect } from 'react-redux';
import { register } from '../actions';
import PopupDialog from '../../../components/Dialogs/PopupDialog';
import PasswordTextField from '../../../components/Dialogs/PasswordTextField';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email:'',
      password:'',
      reenterPassword:'',
      emailError:'',
      passwordError:'',
      reenterPasswordError:'',
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

  registerHandler = () => {
    const data = {
      email: this.state.email,
      passsword: this.state.password,
      c_password: this.state.reenterPassword
    }

    this.props.register(data);
  }

  emailChangeHandler = (e) => {
    let { email } = this.state;
    email = e.currentTarget.value;
    this.setState({ email });
  }

  passwordChangeHandler = (e) => {
    let { password } = this.state;
    password = e.currentTarget.value;
    this.setState({ password });
  }

  reenterPasswordChangeHandler = (e) => {
    let { reenterPassword } = this.state;
    reenterPassword = e.currentTarget.value;
    this.setState({ reenterPassword });
  }

  render() {
    return (
      <div className="page-signup full-height" style={{
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat', 
        backgroundPosition:'center top',
        backgroundImage: `url('assets/images/login-background.jpg')`
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
                            fullWidth
                            floatingLabelText="Email"
                            onChange={this.emailChangeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <PasswordTextField
                            label="Password"
                            errorText={this.state.passwordError}
                            textChangeHandler={this.passwordChangeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <PasswordTextField
                            label="Re-enter Password"
                            errorText={this.state.reenterPasswordError}
                            textChangeHandler={this.reenterPasswordChangeHandler}
                          />
                        </div>
                      </fieldset>
                    </form>
                  </div>
                  <div className="card-action no-border text-right">
                    <FlatButton 
                      style={{margin:'5px'}}
                      onClick={this.registerHandler}>
                      <span className="color-primary" style={{fontSize:'15px', fontWeight:'400'}}>Register</span>
                    </FlatButton>
                  </div>
                </div>
              </div>
            </div>
          </QueueAnim>
          <PopupDialog
            dialogTitle={'Error'}
            content={this.props.requestStatus.error}
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

const mapDispatchToProps = {
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);