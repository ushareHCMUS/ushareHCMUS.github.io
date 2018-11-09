import React, { Component } from 'react';
import ReactEcharts from 'components/ReactECharts';
import {
  Chip, 
  Paper,
  Popover,
  RaisedButton,
	FlatButton,
} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';
import CalendarIcon from 'material-ui/svg-icons/action/today';
import IntervalIcon from 'material-ui/svg-icons/action/alarm';
import { 
  stringToColor,
  formatUrlDateString,
  getTomorrowDate,
  formatUrlTimeString
} from '../../../../../utils/helper';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

const today = new Date();
today.setHours(0,0,0,0);
const tomorrow = getTomorrowDate(today);

class DisplayChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen:false,
      selectedRegions: [],
      shouldRedrawChart: false,
      startDate: today,
      endDate: tomorrow,
      option: {
        title: {
          text:'',
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              title:'Save'
            }
          }
        },
        grid: {
          top: 60,
          left: 30,
          right: 60,
          bottom:30
        },
        xAxis: {
          type: 'category',
          scale: true,
          name: this.props.XAxisTitle,
          boundaryGap: false,
          data: this.createDateData()
        },
        yAxis: {
          type: 'value',
          scale: true,
          name: this.props.yAxisTitle,
          max: this.props.yAxisMax,
          min: this.props.yAxisMin,
          splitNumber: this.props.yAxisMinValue,
        },
        dataZoom: {
          type:'inside',
        },
        series: [],
        legend: {
          data: [],
          orient: 'horizontal',
          x: 'center',
          y: 'top'
        }
      }
    }
  }

  componentDidMount() {
    //register an event to check if any regions were removed
    document.getElementById('region-container').addEventListener('DOMNodeRemoved',this.onRegionRemoved, true);
  }

  componentWillUnmount() {
    //remove the event
    document.getElementById('region-container').removeEventListener('DOMNodeRemoved',this.onRegionRemoved, true);
  }

  onRegionRemoved = () => {
    this.setState({ shouldRedrawChart:false });
  }

  displayText = (text) => {
    return 'Khu vực ' + text;
  }

  createDateData() {
    let startDate = today;
    let endDate = tomorrow;
    if(this.state) {
      startDate = this.state.startDate;
      endDate = this.state.endDate;
    }
    let res = [];
    while(startDate < endDate) {
      res.push(formatUrlTimeString(startDate));
      startDate = new Date(startDate.getTime() + 30 * 60 * 1000);
    }
    return res;
  }

  regionSelectHandler = (e) => {
    let { selectedRegions, menuOpen, option } = this.state;
    menuOpen = false;

    if(e.currentTarget.id != 'All') {
      selectedRegions.push(e.currentTarget.id);
      option.legend.data = [...selectedRegions];
      
      for(var i = 0;i < this.props.regionsData;i++) {
        if(this.props.regionsData['zone_id'] == e.currentTarget.id) {
          console.log()
        }
      }

      option.series.push({
        name:e.currentTarget.id,
        type:this.props.type,
        itemStyle:{
          normal: {
            color:stringToColor(e.currentTarget.id),
          }
        },
        data:(() => {
          let res = [];
          let len = 0;
          while (len < 20) {
            res.push((Math.random()*10 + 5).toFixed(1) - 0);
            len++;
          }
          return res;
        })()
      });
    }
    else {
      this.props.regionsArr.map(item => {
        selectedRegions.push(this.displayText(item));
      })
      option.legend.data = [...selectedRegions];
      option.series = selectedRegions.map(region => ({
        name:region,
        type:this.props.type,
        itemStyle:{
          normal: {
            color:stringToColor(region),
          }
        },
        data:(() => {
          let res = [];
          let len = 0;
          while (len < 20) {
            res.push((Math.random()*10 + 5).toFixed(1) - 0);
            len++;
          }
          return res;
        })()
      }));
    }
    this.setState({ selectedRegions, menuOpen, option });
  }

  regionRemoveHandler = (region) => {
    let { selectedRegions, option, shouldRedrawChart } = this.state;
    shouldRedrawChart = true;
    selectedRegions = selectedRegions.filter( item => item != region);
    option.legend.data = option.legend.data.filter(item => item != region);
    option.series = option.series.filter(item => item.name != region);
    this.setState({ selectedRegions, option, shouldRedrawChart });
  }

  menuPopUpHandler = (e) => {
    this.setState({ 
      menuOpen:true,
      anchorEl:e.currentTarget 
    });
  }

  menuCloseHandler = (e) => {
    this.setState({ 
      menuOpen: false,
      shouldRedrawChart:false
    });
  }

  startDateChangeHandler = (startDate) => {
    //if start date > end date endate = start date + 1
    let { endDate } = this.state;
    if(startDate > endDate) {
      endDate = getTomorrowDate(startDate);
    }
    this.setState({ startDate, endDate });
  }

  endDateChangeHandler = (endDate) => {
    this.setState({ endDate });
  }

  render() {
    let regionsArr = this.props.regionsArr;
    regionsArr = regionsArr && regionsArr.filter(region => !this.state.selectedRegions.includes(this.displayText(region)));
    return (
      <Paper 
        style={{
          width:'100%',
          padding:'10px 30px 15px 30px',
          marginBottom:'15px'
        }}>

        <div style={{margin:'10px 8px'}}>
          <h4 style={{margin:'0px'}}>{this.props.title}</h4>
        </div>

        <div 
          style={{margin:'0px 0px 0px 10px'}}
          className='d-flex flex-row'>
          <RaisedButton
            style={{minWidth:'141px',maxHeight:'36px',marginBottom:'5px'}}
            label={'Add region'}
            labelPosition={'after'}
            disabled={regionsArr && regionsArr.length == 0}
            onClick={this.menuPopUpHandler}
            icon={<AddIcon/>}>
            <Popover
              open={this.state.menuOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              onRequestClose={this.menuCloseHandler}>
              <div 
                className={'d-flex flex-column'}
                style={{minWidth:'141px'}}>
                {regionsArr && regionsArr.map((region) => 
                  (<FlatButton
                    fullWidth
                    id={this.displayText(region)}
                    key={region}
                    label={this.displayText(region)}
                    onClick={this.regionSelectHandler}
                    labelPosition={'after'}/>)
                  )}
                {regionsArr && regionsArr.length != 0 && 
                  (<FlatButton
                    fullWidth
                    id={'All'}
                    key={'All'}
                    label={'All'}
                    onClick={this.regionSelectHandler}
                    labelPosition={'after'}/>)}
              </div>
            </Popover>
          </RaisedButton>
          <div
            id={'region-container'} 
            style={{marginLeft:'5px'}} 
            className={'d-flex flex-wrap'}>
            {this.state.selectedRegions && this.state.selectedRegions.map((region) => 
              <Chip
                key={region}
                style={{
                  minHeight:'36px',
                  margin:'0px 5px 5px 0px'
                }}
                onRequestDelete={() => this.regionRemoveHandler(region)}>
                {region}
              </Chip>)
            }
          </div>
        </div>

        <div 
          className={'d-flex flex-row'}
					style={{margin:'10px 5px 10px 15px'}}>
          <div 
            className={'d-flex flex-row align-items-center'}>
            <h6 style={{margin:'24px 8px 24px 0px'}}>Time Interval</h6>
            <RaisedButton 
              label={'5 minute'}
              style={{minWidth:'141px'}}
              labelPosition={'after'}
              icon={<IntervalIcon/>}/>
          </div>
        </div>

        <div 
          className={'d-flex flex-row'}
					style={{marginLeft:'10px'}}>
					<div 
						style={{margin:'10px 5px'}}>
            <div 
              className={'d-flex flex-row align-items-center'}>
              <h6 style={{margin:'24px 8px 24px 0px'}}>From Date</h6>
              <RaisedButton 
                label={formatUrlDateString(this.state.startDate)}
                style={{minWidth:'141px'}}
                labelPosition={'after'}
                icon={<CalendarIcon/>}
                onClick={()=>this.startDatePicker.show()}/>
            </div>
						<DatePickerDialog 
							ref={(e) => this.startDatePicker = e}
              initialDate={this.state.startDate}
              onAccept={this.startDateChangeHandler}
							firstDayOfWeek={0}
							mode="portrait"/>
					</div>
            
					<div
						style={{margin:'10px 5px'}}>
            <div 
              className={'d-flex flex-row align-items-center'}>
              <h6 style={{margin:'24px 8px 24px 0px'}}>To Date</h6>
              <RaisedButton 
                label={formatUrlDateString(this.state.endDate)}
                style={{minWidth:'141px',}}
                labelPosition={'after'}
                icon={<CalendarIcon/>}
                onClick={() => this.endDatePicker.show()}/>
            </div>
						
						<DatePickerDialog 
							ref={(e) => this.endDatePicker = e}
              initialDate={this.state.endDate}
              shouldDisableDate={(d) => d <= this.state.startDate}
              onAccept={this.endDateChangeHandler}
							firstDayOfWeek={0}
							mode="portrait"/>
					</div>
				</div>

        <ReactEcharts
          shouldRedraw={this.state.shouldRedrawChart}
          style={{height:'500px'}}
          option={this.state.option}/>
      </Paper>
    );
  }
}

export default DisplayChart;