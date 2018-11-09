import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import loadable from 'react-loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';

import PageLoading from 'components/PageLoading';

function LoadingComponent() {
  return <div></div>;
}

let AsyncArea = loadable({
  loader: () => import('../routes/areas'),
  loading: LoadingComponent
})

let AsyncDashboard = loadable({
  loader: () => import('../routes/dashboard'),
  loading: LoadingComponent
})

let AsyncUserList = loadable({
  loader: () => import('../routes/userlist'),
  loading: LoadingComponent
})

class MainApp extends React.Component {

  render() {
    const { match, location } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />
        <section id="page-container" className="app-page-container">
          <Header />
          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                <PageLoading open={this.props.requestStatus.sending} />
                <Route path={`${match.url}/dashboard`} component={AsyncDashboard} />
                <Route path={`${match.url}/userlist`} component={AsyncUserList} />
                <Route path={`${match.url}/areas`} component={AsyncArea} />
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
