import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import patient from './patient.js'

import './main.html';

var isWeb3Enabled = new ReactiveVar(false);

Template.main.helpers({
  'isWeb3Enabled'() {
    return  isWeb3Enabled.get();
  },
  'address'() {
    return web3.eth.defaultAccount;
  },
  patientValid() {
    return patient.status.get() === "Valid";
  }
})

Meteor.startup(() => {
  var id = setInterval(function(){
    if(web3 && web3.eth && web3.eth.defaultAccount && web3.eth.defaultAccount.length) {
      isWeb3Enabled.set(true);
      clearInterval(id);
    }
  }, 10);
});
