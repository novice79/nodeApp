import Loki from 'lokijs';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
const idbAdapter = new LokiIndexedAdapter();
let db;

//export promise?
export default new Promise((resolve, reject) => {
    if (db) {
        resolve(db);
    } else {
        let mgrDB = new Loki("MgrApp.db", {
            adapter: idbAdapter,
            autoload: true,
            autoloadCallback: () => {
                db = {
                    user: mgrDB.getCollection("user") ? mgrDB.getCollection("user") : mgrDB.addCollection("user"),
                    play_list: mgrDB.getCollection("play_list") ? mgrDB.getCollection("play_list") : mgrDB.addCollection("play_list")
                }
                resolve(db);
            },
            autosave: true,
            autosaveInterval: 1000
        });
    }
})