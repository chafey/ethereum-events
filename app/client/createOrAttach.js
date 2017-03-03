import patient from './patient.js'


Template.createOrAttach.helpers({
  address() {
    if(patient.status.get() === "Creating") {
      return "Creating smart contract, please be patient...";
    }
    return patient.address.get();
  }
});

Template.createOrAttach.events({
  'click #attach'(event, instance) {
    event.preventDefault();
    var address = $('#address').val();
    var pat = patient.at(address);
  },
  'click #create'(event, instance) {
    event.preventDefault();
    patient.create().then((patient) => {
      $('#address').val(patient.address);
    });
  }
});
