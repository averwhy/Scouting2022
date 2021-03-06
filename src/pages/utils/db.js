import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs} from "firebase/firestore";
import config from '../../config';

class database {
    constructor(colName){
        this.collection = colName;
        const firebaseApp = initializeApp({
            apiKey: config['firebase_key'],
            authDomain: config['firebase_auth_domain'],
            projectId: config['firebase_project_id']
          })
        this.app = firebaseApp;
        this.db = getFirestore(); // useless
        this.getTeamMatches = this.getTeamMatches.bind(this)
    }

    refreshDB(){
        this.db = getFirestore();
    }

    async getAll(){
        var data = await getDocs(collection(this.db, this.collection));
        return data;
    }
    
    async getTeam(num){
        var data = await getDocs(collection(this.db, this.collection));
        var results = [];
        data.forEach(d =>{
            if (d.get("teamNumber") === num){
                results.push(d);
            }
        })
        return results;
    }

    getTeamMatches(num, data) {
        var results = []
        data.forEach(entry => {
            if (entry.get("teamNumber") === num){
                results.push("#" + entry.get("matchNumber"))
            }
        })
        return results.sort();
    }

    async getMarker() {
        const snapshot = await collection(this.db, ("/" + this.collection)).get()
        return snapshot.docs.map(doc => doc.data());
    }

    newDoc(data){
        return addDoc(this.collection, data);
    }

    // getHighestAutoPoints(){
    //     var data = this.getAll();
    //     var highest = null;
    //     for (const entry of data){
    //         if (highest == null){
    //             highest = entry;
    //         } else {
    //             var entryTotal = (entry.autoHigh + entry.autoLow);
    //             var highestTotal = (highest.autoHigh + highest.autoLow);
    //             if (entryTotal >= highestTotal){
    //                 highest = entry;
    //             } else { continue }
    //         }
    //     }
    //     return highest;
    // }
}

export default database;