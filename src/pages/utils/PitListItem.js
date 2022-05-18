import react from 'react';
import database from './db';
import { Card, CardBody, ListGroupItem, ListGroupItemHeading, UncontrolledCollapse, Spinner } from 'reactstrap';
import config from './../../config';
const db = new database(config.database_collection + config.pit_suffix);
class PitListItem extends react.Component{
  
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
    var addedTeams = [];
    var listgroupItems = [];
    var collapseItems = [];
    this.state.snapshot.forEach(element => {
      var pnum = element.get("teamNumber");
      var element_id = "match" + pnum; // allows for unique collapses per listitem
      if (!(addedTeams.includes(pnum))){
        listgroupItems.push([element_id, pnum])
        collapseItems.push([element_id, pnum, //0,1
          element.get("auto"), // 2
          element.get("climber"), // 3
          element.get("highShooter"), // 4
          element.get("lowShooter"), // 5
          element.get("notes"), // 6
        ])
        addedTeams.push(pnum);
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
        <ListGroupItemHeading>Team {entry[1]}</ListGroupItemHeading>
        {/*<ListGroupItemText></ListGroupItemText>*/}
      </ListGroupItem>
    ))

    var newCollapseItems = collapseItems.map((entry) => (
      // for this: entry[0] = it's ID (e.g. team138)
      // entry[1] = the raw team number
      <UncontrolledCollapse toggler={entry[0]}>
        <Card>
          <CardBody>
            Autonomous? {entry[2].toString()} <br/>
            Climber? {entry[3].toString()} <br/>
            High goal shooter capability? {entry[4].toString()} <br/>
            Low goal shooter capability? {entry[5].toString()} <br/>
            <br/> 
            Notes: {entry[6]}
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
export default PitListItem;