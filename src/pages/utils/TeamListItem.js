import react from 'react';
import database from './db';
import { ListGroupItem, ListGroupItemHeading, Badge } from 'reactstrap';
//import {collection} from "firebase/firestore";
const db = new database("testing");

class TeamListItem extends react.Component{
  
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    db.getAll().then((d) => {
      this.setState({data: d})
    })
  }

  getHighestAuto(){ // This should probably average
    var currentHighest = 0;
    var highestTeam = 0;
    db.getAll().then((d) => {
      d.forEach(element => {
        var AH = parseInt(element.get("autoHigh"));
        var AL = parseInt(element.get("autoLow"));
        if (currentHighest === 0){
          currentHighest = (AH + AL)
          highestTeam = element.get("teamNumber");
        }
        else if ((AH + AL) > currentHighest){
          currentHighest = (AH + AL);
          highestTeam = element.get("teamNumber");
        }
      })
      return highestTeam;
    })
  }
  getHighestClimberAverage(){ // TODO: Make this actually average it
    var currentHighest = 0;
    var highestTeam = 0;
    db.getAll().then((d) => {
      d.forEach(element => {
        var climbnum = element.get("climbLevel") //.match(/\d+/)[0]
        if (climbnum > currentHighest){
          currentHighest = climbnum;
          highestTeam = element.get("teamNumber");
        }
        if (currentHighest === 0){
          currentHighest = climbnum
          highestTeam = element.get("teamNumber");
        }
      })
      return highestTeam;
    })
  }
  
  generateList(){
    var items = [];
    var addedTeams = [];
    this.state.data.forEach(element => {
      var tnum = element.get("teamNumber")
      if (!(tnum in addedTeams)){
        items.push(
          <ListGroupItem action tag='button'>
              <ListGroupItemHeading>
                Team {tnum}
              </ListGroupItemHeading>
          </ListGroupItem>
        )
      }
    });
    return items
  }
  render() {
    return this.generateList();
  }
}
export default TeamListItem;