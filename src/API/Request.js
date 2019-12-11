import axios from 'axios';

function Request(){
    let endPoint = 'http://localhost:3000/';
    this.sendAPI = function(method = "POST", link, data, callback){
        if(method === 'POST'){
            
        }
        axios.post(endPoint+link,data).then(callback);
    }
}
export default Request;
