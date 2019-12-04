import $ from 'jquery';

function Request(){
    let endPoint = 'http://localhost:8000/';
    this.sendAPI = function(link,data,callback){
        $.ajax({
            url : endPoint + link,
            method: 'POST',
            data: data,
            success: callback
        });
    }
}
export default Request;
