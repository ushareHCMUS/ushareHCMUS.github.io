import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import loadable from 'react-loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';

import PageLoading from 'components/PageLoading';
import Auth from '../../../utils/Auth';

function LoadingComponent() {
  return <div></div>;
}

const AsyncArea = loadable({
  loader: () => import('../routes/areas'),
  loading: LoadingComponent
})

const AsyncDashboard = loadable({
  loader: () => import('../routes/dashboard'),
  loading: LoadingComponent
})

const AsyncUserList = loadable({
  loader: () => import('../routes/userlist'),
  loading: LoadingComponent
})

class MainApp extends React.Component {
  authFilter = () => {
    if(Auth.isAdmin()) {
      return (
        <div>
          <Route path={`${this.props.match.url}/userlist`} component={AsyncUserList} />
          <Route path={`${this.props.match.url}/areas`} component={AsyncArea} />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="main-app-container">
        <Sidenav />
        <section id="page-container" className="app-page-container">
          <Header />
          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                <PageLoading open={this.props.requestStatus.sending} />
                <Route path={`${this.props.match.url}/dashboard`} component={AsyncDashboard} />
                {this.authFilter()}
              </div>
            </div>
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestStatus: state.requestStatus
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps,mapDispatchToProps)(MainApp);
