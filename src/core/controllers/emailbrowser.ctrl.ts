import {DB} from "../lib/db";

module.exports = (req, res) => {
    const id: string = req.params.id;
    let DBObj = new DB();
    let emailObjectID = DB.createNewId(id);


    DBObj.db.collection("_sentEmails").findOne({ _id: emailObjectID}, (err, doc) => {
        if (doc === null) {
            res.send("This page is not available any more");
            return;
        }
        
        let email = doc.html;
        let re = new RegExp('{{_hideOnBrowser}}', 'g');
        email = email.replace(re, 'display:none');
        
        res.send(email);
    });
};