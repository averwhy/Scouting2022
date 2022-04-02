import react from 'react';
import ReactDOM from "react-dom";
import database from './db';
import { Card, CardBody, ListGroupItem, ListGroupItemHeading, UncontrolledCollapse, Spinner } from 'reactstrap';
var humanize = require("humanize");
var humanizeList = require('humanize-list')
const db = new database("shrewsbury-real");
class TeamListItem extends react.Component{
  
  constructor(props){
    super(props);
    this.state = {
      snapshot: []
    };
  }

  componentDidMount(){
    this.refresh_data()
  }

  refresh_data(){
    this.setState({snapshot: []})
    db.getAll().then((d) => {
      this.setState({snapshot: d})
    })
  }

  getInstance(){
    return ReactDOM.findDOMNode(this);
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
    average = average / results.length
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
          // none, so 0
          results.push(0);
        }
      }
    })
    var average = 0;
    var highest = Math.max(...results);
    var lowest = Math.min(...results);
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
        result = result + "\n-" + entry.get("notes");
      }
    })
    return result;
  }

  generateData(){
    var addedTeams = [];
    var listgroupItems = [];
    var collapseItems = [];
    this.state.snapshot.forEach(element => {
      var tnum = element.get("teamNumber");
      var element_id = "team" + tnum; // allows for unique collapses per listitem
      if (!(addedTeams.includes(tnum))){
        var tmatches = db.getTeamMatches(tnum, this.state.snapshot)
        listgroupItems.push([element_id, tnum])
        collapseItems.push([element_id, tmatches, //0,1
          this.point_average("teleLow", tnum), //2
          this.point_average("teleHigh", tnum), //3
          this.point_average("autoLow", tnum), //4
          this.point_average("autoHigh", tnum), //5
          this.climb_data(tnum), //6
          this.combine_notes(tnum), //7
          this.entry_amount(tnum), //8
          this.total_points(tnum), //9
          this.auto_move_data(tnum), //10
          tnum //11
        ])
        addedTeams.push(tnum);
      }
    });
    // so, all data has to be processed before being sent to render().
    // i was encountering an error where react was saying an object was being rendered
    // this was because the raw entry was included in the collapseItems list on line 121
    // even though it was not called at all, it thought it was being rendered
    return [listgroupItems, collapseItems];
  }

  render() { // This will map our generated data (which is just arrays) into html/jsx's for the Teams page
    // Len of both lists should always be the same, since each ListGroupItem has a Collapse
    var [listgroupItems, collapseItems] = this.generateData();
    var final_jsx = [];
    if (listgroupItems.length === 0){ // Nothing was returned so we'll do a loading icon
      return ( <Spinner type='border' color='dark'>Loading...</Spinner> )
    }
    listgroupItems.sort((a, b) => {
      return a[1] - b[1]
    });
    collapseItems.sort((a, b) => {
      return a[11] - b[11];
    });
    var newListItems = listgroupItems.map((entry) => (
      // for this: entry[0] = it's ID (e.g. team138)
      // entry[1] = the raw team number
      <ListGroupItem action tag='button' id={entry[0]}>
          <ListGroupItemHeading>
            Team {entry[1]}
          </ListGroupItemHeading>
      </ListGroupItem>
    ))

    var newCollapseItems = collapseItems.map((entry) => (
      // for this: entry[0] = it's ID (e.g. team138)
      // entry[1] = the raw team number
      <UncontrolledCollapse toggler={entry[0]}>
        <Card>
          <CardBody>
            Matches: {entry[1].toString()}
            <h5>Teleop</h5>
            Average Points: {entry[2]} low, {entry[3]} high
            <br/><br/>
            <h5>Auto</h5>
            Moved? {entry[10][0]} yes / {entry[10][2]}total<br/>
            Average Points: {entry[4]} low, {entry[5]} high
            <br/><br/>
            Average climb height: {entry[6][0]} <br/>
            Max/best climb height reached: {humanize.ordinal(entry[6][1])} bar <br/>
            Min/worst climb height reached: {humanize.ordinal(entry[6][2])} bar <br/>
            All climbs: {humanizeList(entry[6][3])}
            <br/><br/>
            Total points: {entry[9]} <br/>
            Other notes: {entry[7]} <br/>
            Times scouted: {entry[8]}
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    ))

    // and then, we'll combine it all together into final_jsx
    newListItems.forEach((lgi, index) => {
      const ci = newCollapseItems[index] // so we're basically iterating through both at once
      final_jsx.push(lgi);
      final_jsx.push(ci);
    })
    return final_jsx;
  }
}
export default TeamListItem;