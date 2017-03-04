import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import patient from './patient.js'

import './main.html';

var metaMaskState = new ReactiveVar(0);
var network = new ReactiveVar("");
var address = new ReactiveVar("");

Template.main.helpers({
  isWeb3Enabled() {
    return  metaMaskState.get() > 0;
  },
  address() {
    return address.get();
  },
  network() {
    switch(network.get()) {
      case "1":
        return "public mainnet network";
        break;
      case "3":
        return "public test network";
        break;
      default:
        return "private network with id " + network.get();
        break;
    }
  },
  patientValid() {
    return patient.status.get() === "Valid";
  }
})

// poll for changes in the user and network so we can update the UI
function monitorMetaMask() {
  var id = setInterval(function(){
    if(web3.eth.accounts[0] !== address.get()) {
      address.set(web3.eth.accounts[0]);
      console.log("new account selected");
      metaMaskState.set(metaMaskState.get() + 1);
    }
    // NOTE: currently this only works the first time - getNetwork() does not
    // update when you change the network!
    web3.version.getNetwork((err, netId) => {
      if(network.get() !== netId) {
        console.log('new network ' + netId);
        network.set(netId);
        metaMaskState.set(metaMaskState.get() + 1);
      }
    })
  }, 100);
}

Meteor.startup(() => {
  // poll until metamask is initialized
  var id = setInterval(function(){
    if(web3 && web3.eth && web3.eth.accounts && web3.eth.accounts.length) {
      metaMaskState.set(1);
      monitorMetaMask();
      clearInterval(id);
    }
  }, 10);
});
