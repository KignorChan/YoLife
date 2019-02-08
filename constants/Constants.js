const DOMAIN = 'http://192.168.0.14:8080/yolife/'
//const DOMAIN = 'http://99.254.227.162:8080/yolife/'
//const DOMAIN = 'http:192.168.0.111:8080/yolife/'

export const CONSTANT_API = {
    usersList: DOMAIN+'users/usersList.html',
    addUsers: DOMAIN+'users/addUsers.html',
    getUserById:DOMAIN+'users/usersLoginByUid.html',
    getNearbyStoreIds:DOMAIN+'store/getNearByStroreIds.html',
    getStoreById:DOMAIN+'',
    
    GOOGLE_PLACES_API_KEY: 'AIzaSyBveFAZJ-LNXpYvmx1doaTMIxlNInQBdus',
    GOOGLE_MAPS_APIKEY:'AIzaSyDvsqBoRlQME8v8cN3QSPBG9t-dU2Hj8o8',
    GOOGLE_GEOCODE_API_KEY: 'AIzaSyBveFAZJ-LNXpYvmx1doaTMIxlNInQBdus',
}

export const ADDRESS_TYPE = {
    userHome:'userHome',
    userWork:'userWork',
    businessAddress:'businessAddress',
    pickupAddress:'pickupAddress'
}