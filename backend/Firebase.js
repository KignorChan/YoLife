'use-strict';

import firebase from 'firebase'

export default class Firebase{
    static initialize() {
        // init firebaes connection
        const config = {
            apiKey: "AIzaSyCqzojrW7szmLKgaITTKSqTG9NFejMRMyU",
            authDomain: "yolife-541a7.firebaseapp.com",
            databaseURL: "https://yolife-541a7.firebaseio.com",
            projectId: "yolife-541a7",
            storageBucket: "yolife-541a7.appspot.com",
            messagingSenderId: "972980896041"
        };
    
        try {
          firebase.app();
        } catch (err) {
          firebase.initializeApp(config);
        }
    }

    static signinWithEmailAndPassword(email, password){
        return new Promise(function(resolve, reject){
            firebase.auth().signInWithEmailAndPassword(email, password).then(result=>{
                resolve(result);
            }).catch(e=>{
                reject(e);
            });
        })
    }

    static onAuthStateChanged(){
        return new Promise((resolve, reject)=>{
            firebase.auth().currentUser.reload().then(()=>{
                firebase.auth().onAuthStateChanged(user=>{
                    resolve(user);
                })
            });
        })
    }

    static sendEmailVerification(){
        return new Promise((resolve, reject)=>{
            firebase.auth().currentUser.sendEmailVerification().then(()=>{
                resolve('Email sent!');
            }).catch(err=>{
                reject(err);
            })
        })
    }

    static signOut(){
        return new Promise((resolve, reject)=>{
            firebase.auth().signOut().then(()=>{
                resolve('Logout sucessfully!')
            });
        })
    }

    static createUserWithEmailAndPassword(email, password){
        return new Promise((resolve, reject)=>{
            firebase.auth().createUserWithEmailAndPassword(email, password).then(account=>{
                resolve(account);
            }).catch(e=>{
                reject(e);
            })
        })
    }
}

