import patient from './patient.js'


Template.createOrAttach.helpers({
  address() {
    if(patient.status.get() === "Creating") {
      return "Creating smart contract...";
    }
    return patient.address.get();
  }
});

Template.createOrAttach.events({
  'click #attach'(event, instance) {
    event.preventDefault();
    var address = $('#address').val();
    console.log(address);
    patient.at(address);
  },
  'click #create'(event, instance) {
    event.preventDefault();
    patient.create().then((patient) => {
      console.log(patient);
      $('#address').val(patient.address);
    });
  }
});
