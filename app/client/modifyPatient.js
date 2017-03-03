import patient from './patient.js'

Template.modifyPatient.events({
  'click #nameSave'(event, instance) {
    event.preventDefault();
    var name = $('#name').val();
    patient.instance().SetName(name, function(err,txHash) {
      if(err) {
        alert(err);
        return;
      }
      console.log('txHash:', txHash);
    });
  },
  'click #dobSave'(event, instance) {
    event.preventDefault();
    var dob = $('#dob').val();
    patient.instance().SetDateOfBirth(dob, function(err,txHash) {
      if(err) {
        alert(err);
        return;
      }
      console.log('txHash:', txHash);
    });
  },
  'click #genderSave'(event, instance) {
    event.preventDefault();
    var gender = $('#gender').val();
    patient.instance().SetGender(gender, function(err,txHash) {
      if(err) {
        alert(err);
        return;
      }
      console.log('txHash:', txHash);
    });
  }
})
