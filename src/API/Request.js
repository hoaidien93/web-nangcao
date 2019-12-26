import axios from 'axios';

function Request(){
    "use strict";
    let endPoint = 'https://localhost:8000/';
    this.sendAPI = function(method = "POST", link, data, callback){
        if(method === 'POST'){
            
        }
        axios.post(endPoint+link,data).then(callback);
    }
}
export default Request;
