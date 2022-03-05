import {React} from 'react';
import database from './db';
import { ListGroupItem, ListGroupItemHeading } from 'reactstrap';
const db = new database("testing");

function TeamListItem(props){
    db.getAll().then((d) => {
      d.forEach(element => {
        return(
            <ListGroupItem
                tag="button">
                <ListGroupItemHeading>Team {element.get("teamNumber")}</ListGroupItemHeading>
                {/* addAutoPill(element.get("teamNumber")) */}
            </ListGroupItem>
        )
      });
    })
    }
    //.then((d) => {console.log(d._snapshot)})

export default TeamListItem;