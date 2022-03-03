import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, Query } from "firebase/firestore";
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
        this.db = getFirestore();
    }

    refreshDB(){
        this.db = getFirestore();
    }

    async getAll(){
        var data = await getDocs(collection(this.db, this.collection));
        return data;
    }

    newDoc(data){
        return addDoc(this.collection, data);
    }

    getHighestAutoPoints(){
        var data = this.getAll();
        var highest = null;
        for (const entry of data){
            if (highest = null){
                highest = entry;
            } else {
                var entryTotal = (entry.autoHigh + entry.autoLow);
                var highestTotal = (highest.autoHigh + highest.autoLow);
                if (entryTotal >= highestTotal){
                    highest = entry;
                } else { continue }
            }
        }
        return highest;
    }
}

export default database;