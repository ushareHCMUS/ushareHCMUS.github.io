import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import DisplayChart from './DisplayChart';
import { getData } from '../actions';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import { RaisedButton } from 'material-ui';

const csvData = [
  ["Time", "Nhiệt độ", "Độ ẩm", "pH"],
];
class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      regions_name: [],
      regions_data: []
    }
  }

  componentDidMount() {
    this.props.getData('',() => {
      //if request success
      let { regions_name, regions_data } = this.props.chartData;
      this.setState({ regions_name, regions_data });
    },() => {
      //if request error
      this.props.history.push('/login');
    });
  }

  render(){
    return (
      <div className="container-fluid no-breadcrumbs content-page">
        <QueueAnim type="bottom" className="ui-animate">
          <CSVLink data={csvData} filename={'data_info'}><RaisedButton label={'Download me'}></RaisedButton></CSVLink>
          <DisplayChart 
            type={'line'} //
            title={'Tempature Chart'}
            target={'temperature'}
            regionsArr={this.state.regions_name}
            regionsData={this.state.regions_data}
            yAxisTitle={'°C'}
            yAxisMax={70}
            yAxisMin={0}
            yAxisMinValue={10}
          />
          <DisplayChart 
            type={'bar'}
            title={'Humidity Chart'}
            target={'humidity'}
            regionsArr={this.state.regions_name}
            regionsData={this.state.regions_data}
            yAxisTitle={'%'}
            yAxisMax={100}
            yAxisMin={0}
            yAxisMinValue={10}
          />
        </QueueAnim>
      </div>
    );
  } 
}

function mapStateToProps(state) {
  return {
    requestStatus: state.requestStatus,
    chartData: state.chartData
  };
}

const mapDispatchToProps = {
  getData
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
