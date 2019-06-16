import React, { Component } from 'react';
import { 
  Card,
  CardActions,
  CardHeader,
  CardText,
  FlatButton,
} from 'material-ui';

class RoomItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  getCurrentContent() {
    const roomData = this.props.blockData.rooms[this.state.selectedIndex];
    return <div>
      <div>
        {roomData.airCondition.toString()}
      </div>
      <div>
        {roomData.capacity}
      </div>
      <div>
        {roomData.projector.toString()}
      </div>
    </div>
  }

  render() {
    const { blockName, blockData } = this.props;
    return <Card className={'col-4'}>
      <CardHeader
        title={'Dãy ' + blockName}
      />
      <CardActions className={'d-flex flex-row'}>
      {
        blockData.rooms.map((item, index) => (
          <div style={(index == this.state.selectedIndex ? {border: '2px solid #AAAAAAAA'} : {})}>
            <FlatButton 
              label={item.idRoom}
              id={index}
              onClick={(e) => {
                const selectedIndex = e.currentTarget.id;
                this.setState({ selectedIndex });
              }}
            />
          </div>)
        )
      }
      </CardActions>
        {this.getCurrentContent()}
    </Card>
  }
}

export default RoomItem;