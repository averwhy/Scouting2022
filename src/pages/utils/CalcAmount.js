import react from 'react';
import database from './db';
import CalcAmountError from  './Errors';
const db = new database("shrewsbury-real");

class CalcAmount extends react.Component{

    constructor(props){
        super(props);
        this.state = {
          snapshot: []
        };
        if (!(['team','match'].includes(props.type))){
          // invalid type passed
          throw new CalcAmountError("Invalid type passed to CalcAmount component, type must be either 'team' or 'match'")
        }
        this.type = props.type
    }

    componentDidMount(){
        db.getAll().then((d) => {
          this.setState({snapshot: d})
        })
    }

    
    calc_amount(){
        // gets the amount of times a team has been scouted on (how many times its in the database)
        // requires state.data (should also be up to date)
        var occurences = 0;
        var counted = [];
        var query = this.type + "Number"
        this.state.snapshot.forEach(entry => {
          if (!(counted.includes(entry.get(query)))){
            occurences += 1;
            counted.push(entry.get(query))
          }
        })
        return occurences;
    }

    render(){
        var amount = this.calc_amount();
        if (amount === 0){ // Nothing was returned
            return (<br/>)
          }
        return (
            <h6>
                Showing {amount} entries
            </h6>
        )
    }

}

export default CalcAmount;