import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import patient from './patient.js'

import './main.html';

var metaMaskState = new ReactiveVar(0);
var network = new ReactiveVar("");
var account = new ReactiveVar("");

Template.main.helpers({
  isWeb3Enabled() {
    return  metaMaskState.get() > 0;
  },
  account() {
    return account.get();
  },
  network() {
    switch(network.get()) {
      case "1":
        return "the public main ethereum network (mainnet)";
        break;
      case "3":
        return "the public test ethereum network (ropsten)";
        break;
      default:
        return "a private ethereum network with id " + network.get();
        break;
    }
  },
  patientValid() {
    return patient.status.get() === "Valid";
  }
})

// poll for changes in the user account
function monitorMetaMaskAccountChange() {
  var id = setInterval(function(){
    if(web3.eth.accounts[0] !== account.get()) {
      account.set(web3.eth.accounts[0]);
      console.log("new user account selected in metamask!");
      metaMaskState.set(metaMaskState.get() + 1);
    }
  }, 100);
}

Meteor.startup(() => {
  // poll until metamask is initialized
  var id = setInterval(function(){
    if(web3 && web3.eth && web3.eth.accounts && web3.eth.accounts.length) {
      clearInterval(id);
      account.set(web3.eth.accounts[0]);
      metaMaskState.set(1);
      monitorMetaMaskAccountChange();
      web3.version.getNetwork((err, netId) => {
        if(network.get() !== netId) {
          network.set(netId);
        }
      });
    }
  }, 10);
});
