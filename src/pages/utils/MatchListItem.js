import react from 'react';
import database from './db';
import { Card, CardBody, ListGroupItem, ListGroupItemHeading, UncontrolledCollapse, Spinner } from 'reactstrap';
// var humanize = require("humanize");
// var humanizeList = require('humanize-list')
const db = new database("shrewsbury-real");
class MatchListItem extends react.Component{
  
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

  entry_amount(matchNum){
    // gets the amount of times a team has been scouted on (how many times its in the database)
    // requires state.data (should also be up to date)
    var occurences = 0;
    this.state.snapshot.forEach(entry => {
      if (entry.get("matchNumber") === matchNum){
        occurences += 1;
      }
    })
    return occurences;
  }

  get_match_teams(matchNum, alliance){
    // alliance must be either "blue" or "red"
    var teams = [];
    this.state.snapshot.forEach(entry => {
      if (entry.get("matchNumber") === matchNum){
          if (entry.get("allianceColor").toLowerCase() === alliance){
              if (!teams.includes(entry.get("teamNumber"))){
                teams.push(entry.get("teamNumber"));
              }
          }
      }
    })
    for (var i = teams.length; 3 > i; i++){
      teams.push("?");
    }
    return teams;
  }

  point_average(type, matchNum){
    // requires state.data (should also be up to date)
    var results = [] // ints only
    this.state.snapshot.forEach(entry => {
      if (entry.get("matchNumber") === matchNum){
          results.push(entry.get(type));
      }
    })
    var average = 0;
    results.forEach(n => average += n);
    average = average / results.length
    return average;
  }

  point_data(matchNum, alliance){
    // requires state.data (should also be up to date)
    var total = 0;
    var results = [];
    this.state.snapshot.forEach(entry => {
      if (entry.get("matchNumber") === matchNum){
        if (entry.get("allianceColor").toLowerCase() === alliance){
          var query = (entry.get("final" + entry.get("allianceColor")))
          results.push(query)
        }
      }
    })
    var average = 0;
    results.forEach(n => average += n);
    average = average / results.length
    return total;
  }

  climb_data(matchNum, alliance){
    // requires state.data (should also be up to date)
    var results = [] // ints only
    var noData = "No data!"
    this.state.snapshot.forEach(entry => {
      if (entry.get("matchNumber") === matchNum){
        if (entry.get("allianceColor").toLowerCase() === alliance){
          results.push(entry.get("climbLevel"));
        }
    }
    })
    if (results.length === 0){
      return noData;
    }
    return results;
  }

  auto_move_data(matchNum, alliance){
    // does some data based on if they moved or not
    // requires state.data (should also be up to date)
    var moved = 0;
    var scoredLow = 0;
    var scoredHigh = 0;
    this.state.snapshot.forEach(entry => {
      if (entry.get("matchNumber") === matchNum){
        if (entry.get("allianceColor").toLowerCase() === alliance){
          if (entry.get("autoMoved")){
            moved += 1;
            scoredLow += entry.get("autoLow")
            scoredHigh += entry.get("autoHigh")
          }
        }
      }
      
    })
    return [moved, scoredLow, scoredHigh] // last one is for total
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
    var addedMatches = [];
    var listgroupItems = [];
    var collapseItems = [];
    this.state.snapshot.forEach(element => {
      var mnum = element.get("matchNumber");
      var element_id = "match" + mnum; // allows for unique collapses per listitem
      if (!(addedMatches.includes(mnum))){
        listgroupItems.push([element_id, mnum])
        collapseItems.push([element_id, mnum, //0,1
          this.get_match_teams(mnum, "blue"), //2
          this.get_match_teams(mnum, "red"), //3
          this.point_average("finalBlue", mnum), //4 
          this.point_average("finalRed", mnum), //5   
          this.climb_data(mnum, "blue"), //6
          this.climb_data(mnum, "red"), //7
          this.entry_amount(mnum), //8
          this.auto_move_data(mnum, "blue"), //9
          this.auto_move_data(mnum, "red"), //10
        ])
        addedMatches.push(mnum);
      }
    });

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
      return a[1] - b[1];
    });
    var newListItems = listgroupItems.map((entry) => (
      // for this: entry[0] = it's ID (e.g. team138)
      // entry[1] = the raw team number
      <ListGroupItem action tag="button" id={entry[0]}>
        <ListGroupItemHeading>Match {entry[1]}</ListGroupItemHeading>
        {/*<ListGroupItemText></ListGroupItemText>*/}
      </ListGroupItem>
    ))

    var newCollapseItems = collapseItems.map((entry) => (
      // for this: entry[0] = it's ID (e.g. team138)
      // entry[1] = the raw team number
      <UncontrolledCollapse toggler={entry[0]}>
        <Card>
          <CardBody>
            <h2>Match #{entry[1].toString()}</h2>
            <h4 style={{color: 'blue'}}>{entry[2].toString()}  @ {entry[4]} points</h4>
            vs
            <h4 style={{color: 'red'}}>{entry[3].toString()}  @ {entry[5]} points</h4>
            <br/><br/>
            <h5>Climb Data</h5>
            <body style={{color: 'blue'}}>{entry[6]}</body>
            <body style={{color: 'red'}}>{entry[7]}</body>
            <br/>
            <h5>Auto Data</h5>
            <body style={{color: 'blue'}}>{entry[9][0]} robots moved<br/>{entry[9][1]} balls scored low, {entry[9][2]} balls scored high</body>
            <body style={{color: 'red'}}>{entry[10][0]} robots moved<br/>{entry[10][1]} balls scored low, {entry[10][2]} balls scored high</body>
            <br/>Times scouted: {entry[8]}
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
export default MatchListItem;