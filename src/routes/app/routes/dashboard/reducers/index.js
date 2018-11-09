import { GET_ALL_CHART_DATA_SUCCESS } from '../actions/';

function chartData(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CHART_DATA_SUCCESS: {
      let regions_name = [];
      let regions_data = [];

      if(action.payload) {

        //filter all distinct region
        action.payload.map((item) => {
          if(!regions_name.includes(item['zone_id'])) {
            regions_name.push(item['zone_id']);
          }
        });
        
        //sort region by index
        regions_name = regions_name.sort((a, b) => parseInt(a) - parseInt(b));
        regions_name.map((item) => {
          regions_data.push({
            zone_id: item,
            data_info:[]
          });
        });

        //init region data
        action.payload.map((item) => {
          regions_data.map((region) => {
            if(region['zone_id'] == item['zone_id']) {
              item['humidity'] = parseFloat(item['humidity']);
              item['id'] = parseInt(item['id']);
              item['ph'] = parseFloat(item['ph']);
              item['time'] = new Date(item['time']);
              item['temperature'] =  parseFloat(item['temperature']);
              region['data_info'].push(item);
            }
          });
        });

        //sort region data by time
        regions_data.map((region) => {
          region['data_info'] = region['data_info'].sort((a, b) => a['time'] > b['time']);
        });
      }

      return {
        ...state,
        regions_name,
        regions_data
      }      
    }
    default: {
      return state;
    }
  }
}

export default chartData;