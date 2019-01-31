import firebase from 'firebase';


export default class DataUtil{

    static parseTimeStamp(timestamp){
        date = new Date(timestamp);
        datevalues = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ];
        var formattedTime = datevalues[0]+'/'+datevalues[1]+'/'+datevalues[2]+' '+datevalues[3]+':'+datevalues[4]+':'+datevalues[5];

        return formattedTime;
    }

    static check_email_format(email){
        var reg = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@(([0-9a-zA-Z])+([-\w]*[0-9a-zA-Z])*\.)+[a-zA-Z]{2,9})$/;
        if(email != '')
        {
            if(reg.test(email))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

    static check_phone_format(phoneNumber){
        var reg = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        if(phoneNumber != '')
        {
            if(reg.test(phoneNumber))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

    static async uploadPhoto(uri, uid){
        alert(uri+'\n'+uid)
        // const response = await fetch(uri);
        // const blob = await response.blob();
        // const ref = firebase
        // .storage()
        // .ref()
        // .child('/images/avatar/'+uid);
        //const snapshot = await ref.put(blob);
        //console.log(JSON.stringify(snapshot))
        //return snapshot.downloadURL;
    };

}