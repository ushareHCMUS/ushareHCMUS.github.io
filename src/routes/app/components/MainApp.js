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

class MainApp extends React.Component {
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
