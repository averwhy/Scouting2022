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
      var tnum = element.get("teamNumber");
      var element_id = "team" + tnum;
      console.log(addedTeams);
      if (!(addedTeams.includes(tnum))){
        items.push(
          <ListGroupItem action tag='button' id={element_id}>
              <ListGroupItemHeading>
                Team {tnum}
              </ListGroupItemHeading>
          </ListGroupItem>
        )
        items.push(
          <UncontrolledCollapse toggler={element_id}>
            <Card>
              <CardBody>
                Notes: {element.get("notes")}
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