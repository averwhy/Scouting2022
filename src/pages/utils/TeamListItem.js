import react from 'react';
import database from './db';
import { Card, CardBody, ListGroupItem, ListGroupItemHeading, UncontrolledCollapse } from 'reactstrap';
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

  do_average(){
    var items = Object.values(arguments);
    var average = 0;
    if (items[0] instanceof Array){
      items[0].forEach(n => average += n);
    } else {
    items.forEach(n => average += n);
    }
    return average;
  }

  getHighestAuto(){
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
  getHighestClimber(doAv){
    var currentHighest = 0;
    var highestTeam = 0;
    db.getAll().then((d) => {
      if (doAv === true){
        var nums = [];
        d.forEach(element => nums += element)
      }
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
      var tnum = element.get("teamNumber");
      var element_id = "team" + tnum; // allows for unique collapses per listitem
      console.log(addedTeams);
      if (!(addedTeams.includes(tnum))){
        items.push(
          <ListGroupItem action tag='button' id={element_id}>
              <ListGroupItemHeading>
                Team {tnum}
              </ListGroupItemHeading>
          </ListGroupItem>
        )
        var tmatches = db.getTeamMatches(tnum)
        items.push(
          <UncontrolledCollapse toggler={element_id}>
            <Card>
              <CardBody>
                Matches: {tmatches.toString()} {/*This shit is erroring right here and it's pissing me off*/}
                <h5>Teleop</h5>
                Points: {element.get("teleLow")} low, {element.get("teleHigh")} high
                <br/><br/>
                <h5>Auto</h5>
                Moved? {element.get("autoMoved").toString()}<br/>
                Points: {element.get("autoLow")} low, {element.get("autoHigh")} high
                <br/>
                Climb: {element.get("climbLevel")}
                <br/><br/>
                Other notes: {element.get("notes")}
              </CardBody>
            </Card>
          </UncontrolledCollapse>
        )
        addedTeams.push(tnum);
      }
    });
    return items
  }
  render() {
    return this.generateList();
  }
}
export default TeamListItem;