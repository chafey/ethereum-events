import patient from './patient.js'


Template.modifyPatient.onCreated(() => {
  var pat = patient.instance();
  pat.name(function(err,name) {
    $('#name').val(name);
    pat.dateOfBirth(function(err,dateOfBirth) {
      $('#dob').val(dateOfBirth);
      pat.gender(function(err,gender) {
        $('#gender').val(gender);
      });
    });
  });
});


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
