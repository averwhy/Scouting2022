import react from 'react';
import database from './db';
import { ListGroupItem, ListGroupItemHeading } from 'reactstrap';
const db = new database("testing");

class TeamListItem extends react.Component{
  
  constructor(props){
    super(props);
    console.log("Constructor");
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    console.log("Mount");
    db.getAll().then((d) => {
      this.setState({data: d})
    })
  }

  getHighestAuto(){ // This should probably average
    var currentHighest = 0;
    db.getAll().then((d) => {
      d.forEach(element => {
        var AH = element.get("autoHigh");
        var AL = element.get("autoLow");
        if ((AH + AL) > currentHighest){
          currentHighest = (AH + AL);
        }
        if (currentHighest === 0){ currentHighest = (AH + AL)}
      })
    })
  }
  getHighestClimberAverage(){ // TODO: Make this actually average it
    var currentHighest = 0;
    db.getAll().then((d) => {
      d.forEach(element => {
        var climbnum = (element.get("climbingLevel")).match(/\d+/)[0]
        if (climbnum > currentHighest){
          currentHighest = climbnum;
        }
        if (currentHighest === 0){ currentHighest = climbnum}
      })
    })
  }

  generateList(){
    var items = [];
    console.log(this.getHighestAuto());
    console.log(this.getHighestClimberAverage());
    this.state.data.forEach(element => {
      console.log("Entry processed")
      items.push(
          <ListGroupItem
              tag="button">
              <ListGroupItemHeading>Team {element.get("teamNumber")}</ListGroupItemHeading>
              {/* addAutoPill(element.get("teamNumber")) */}
          </ListGroupItem>
      )
    });
    return items
  }

  render() {
    console.log('Render lifecycle')
    return this.generateList();
  }
}
    //.then((d) => {console.log(d._snapshot)})

export default TeamListItem;