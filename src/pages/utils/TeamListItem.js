import react from 'react';
import database from './db';
import { Card, CardBody, ListGroupItem, ListGroupItemHeading, UncontrolledCollapse } from 'reactstrap';
var humanize = require("humanize");
var humanizeList = require('humanize-list')
const db = new database("testing");

class TeamListItem extends react.Component{
  
  constructor(props){
    super(props);
    this.state = {
      snapshot: []
    };
  }

  componentDidMount(){
    db.getAll().then((d) => {
      this.setState({snapshot: d})
    })
  }

  entry_amount(teamNum){
    // gets the amount of times a team has been scouted on (how many times its in the database)
    // requires state.data (should also be up to date)
    var occurences = 0;
    this.state.snapshot.forEach(entry => {
      if (entry.get("teamNumber") === teamNum){
        occurences += 1;
      }
    })
    return occurences;
  }

  point_average(type, teamNum){
    // type must be either teleopLow, teleopHigh, autoLow, teleopHigh (too lazy to implement this check TODO)
    // requires state.data (should also be up to date)
    var results = [] // ints only
    this.state.snapshot.forEach(entry => {
      if (entry.get("teamNumber") === teamNum){
          results.push(entry.get(type));
      }
    })
    var average = 0;
    results.forEach(n => average += n);
    return average;
  }

  total_points(teamNum){
    // total points for EVERYTHING (teleop, auto, low and high)
    // requires state.data (should also be up to date)
    var total = 0;
    this.state.snapshot.forEach(entry => {
      if (entry.get("teamNumber") === teamNum){
          total += (entry.get("teleLow") + entry.get("teleHigh") + entry.get("autoLow") + entry.get("autoHigh"))
      }
    })
    return total;
  }

  climb_data(teamNum){
    // requires state.data (should also be up to date)
    var results = [] // ints only
    this.state.snapshot.forEach(entry => {
      if (entry.get("teamNumber") === teamNum){
        if (!(entry.get("climbLevel") === "None")){
          var numLevel = (entry.get("climbLevel")).match(/(\d+)/)[0]
          results.push(parseInt(numLevel));
        } else {
          // none = 0
          results.push(0);
        }
      }
    })
    var average = 0;
    var highest = Math.max(results);
    var lowest = Math.min(results);
    results.forEach(n => average += n);
    average = average / results.length
    return [average, highest, lowest, results];
  }

  auto_move_data(teamNum){
    // does some data based on if they moved or not
    // requires state.data (should also be up to date)
    var moved = 0;
    var notMoved = 0;
    this.state.snapshot.forEach(entry => {
      if (entry.get("teamNumber") === teamNum){
        if (entry.get("autoMoved")){
          moved += 1;
        } else {
          notMoved += 1;
        }
      }
    })
    return [moved, notMoved, (moved + notMoved)] // last one is for total
  }

  combine_notes(teamNum){
    // requires state.data (should also be up to date)
    var result = "";
    this.state.snapshot.forEach(entry => {
      if (entry.get("teamNumber") === teamNum){
        result = result + "\n\n" + entry.get("notes");
      }
    })
    return result;
  }

  generateData(){
    console.log(this.state.snapshot)
    var addedTeams = [];
    var listgroupItems = [];
    var collapseItems = [];
    this.state.snapshot.forEach(element => {
      var tnum = element.get("teamNumber");
      var element_id = "team" + tnum; // allows for unique collapses per listitem
      if (!(addedTeams.includes(tnum))){
        var tmatches = db.getTeamMatches(tnum, this.state.snapshot)
        listgroupItems.push([element_id, tnum])
        collapseItems.push([element_id, tmatches, element, //0,1,2
          this.point_average("teleLow", tnum), //3
          this.point_average("teleHigh", tnum), //4
          this.point_average("autoLow", tnum), //5
          this.point_average("autoHigh", tnum), //6
          this.climb_data(tnum), //7
          this.combine_notes(tnum), //8
          this.entry_amount(tnum), //9
          this.total_points(tnum), //10
          this.auto_move_data(tnum) //11
        ])
        addedTeams.push(tnum);
      }
    });
    return [listgroupItems, collapseItems];
  }

  render() { // This will map our generated data (which is just arrays) into html/jsx's for the Teams page
    // Len of both lists should always be the same, since each ListGroupItem has a Collapse
    var [listgroupItems, collapseItems] = this.generateData();
    var final_jsx = [];
    listgroupItems.map((entry) => ( 
      // for this: entry[0] = it's ID (e.g. team138)
      // entry[1] = the raw team number
      <ListGroupItem action tag='button' id={entry[0]}>
          <ListGroupItemHeading>
            Team {entry[1]}
          </ListGroupItemHeading>
      </ListGroupItem>
    ))
    collapseItems.map((entry) => (
      // for this: entry[0] = it's ID (e.g. team138)
      // entry[1] = the raw team number
      <UncontrolledCollapse toggler={entry[0]}>
        <Card>
          <CardBody>
            Matches: {entry[1].toString()}
            <h5>Teleop</h5>
            Average Points: {entry[3]} low, {entry[4]} high
            <br/><br/>
            <h5>Auto</h5>
            Moved? {entry[11][0]} yes / {entry[11][2]}total<br/>
            Average Points: {entry[5]} low, {entry[6]} high
            <br/><br/>
            Average climb height: {entry[7][0]}
            Max/best climb height reached: {humanize.ordinal(entry[7][1])}
            Min/worst climb height reached: {humanize.ordinal(entry[7][2])}
            All climbs: {humanizeList(entry[7][3])}
            <br/><br/>
            Total points: {entry[10]}
            Other notes: {entry[8]}
            Times scouted: {entry[9]}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    ))

    // and then, we'll combine it all together into final_jsx
    listgroupItems.forEach((lgi, index) => {
      const ci = collapseItems[index] // so we're basically iterating through both at once
      final_jsx.push(lgi);
      final_jsx.push(ci);
    })

    return final_jsx;
  }
}
export default TeamListItem;