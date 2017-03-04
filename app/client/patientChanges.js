
import patient from './patient.js'

Changes = new Mongo.Collection(null);

function getChanges() {
  Changes.remove({});
  // create a filter that returns all events associated with the patient
  // smart contract instance address
  var filter = web3.eth.filter({
        address: patient.instance().address,
        fromBlock: 0
      });
  // go and get all the events
  filter.get(function(err, result) {
    if(err) {
      alert(err);
      return;
    }
    // sort the events based on blockNumber since they don't seem to come
    // ordered
    result.sort(function(a,b) {
      return a.blockNumber - b.blockNumber;
    })
    // iterate over the events and get the data we need for the table
    // using the blockNumber in the event object.  Specifying the blockNumber
    // is how we access prior state for a smart contract instance
    result.forEach(function(e) {
      //console.log('e:', e);
      var pat = patient.at(e.address);
      web3.eth.getTransaction(e.transactionHash, function(err, tx) {
        var what = patient.decodePatientChangedEvent(e.data)[0];
        web3.eth.getBlock(e.blockNumber, function(err, block) {
          pat.name(e.blockNumber, function(err,name) {
            pat.dateOfBirth(e.blockNumber, function(err,dateOfBirth) {
              pat.gender(e.blockNumber, function(err,gender) {
                // Add an object with all the data so it can be displayed
                Changes.insert({
                  block: e.blockNumber,
                  ts: new Date(block.timestamp * 1000),
                  what: what,
                  name: name,
                  dateOfBirth: dateOfBirth,
                  gender:gender
                });
              });
            });
          });
        });
      });
    });
  });
}

Template.patientChanges.onCreated(() => {
  getChanges();
});

Template.patientChanges.helpers({
  changes() {
    return Changes.find();
  }
});

Template.patientChanges.events({
  'click'(event,instance) {
    getChanges();
  }
})
