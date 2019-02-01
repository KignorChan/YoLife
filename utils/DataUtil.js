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

    static async uploadPhoto(uri, uid) {
        return new Promise(async function(resolve, reject){
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  resolve(xhr.response);
                };
                xhr.onerror = function(e) {
                  console.log(e);
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
              });
            
              const ref = firebase
                .storage()
                .ref()
                .child('/images/avatar/'+uid+'.jpg');
              let snapshot = await ref.put(blob);
              let url = await snapshot.ref.getDownloadURL();
              // We're done with the blob, close and release it
              blob.close();
            
              return resolve(url);
        })
      }
}