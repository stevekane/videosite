var testFields = {
  name: new Forms.Field("cats", ""),
  email: new Forms.Field("cat@email.gov", "") 
}

//example of a local Field Validation
var testFieldVal1 = function (fields) {
  return new Forms.Result("email", true, "");
}
var testFieldVal2 = function (fields) {
  return new Forms.Result("name", true, "");
}
var testFieldVal3 = function (fields) {
  return new Forms.Result("email", true, "");
}

var testFieldValidations = [
  testFieldVal1,
  testFieldVal2,
  testFieldVal3
];

//example of a local Form Validation
var testFormVal1 = function (fields) {
  return new Forms.Result(["name", "email"], true, "");
}

var testFormValidations = [testFormVal1];

var testRemoteVal1 = function (fields) {
  return Forms.Promise(function (resolve, reject) {
    window.setTimeout(function () { 
      resolve(new Forms.Result("email", true, ""));
    }, 4);
  });
}

var testSubmit = function (fields) {
  return Forms.Promise(function (resolve, reject) {
    window.setTimeout(function () {
      resolve("Fuckin yes bro, fuckin yess"); 
    }, 100); 
  });
}

//TODO: All submit functions themselves should probably be async?
function testCycle () {
  //Here we are sort of stubbing out a form submission implementation
  var fieldResults = Forms.runLocalValidations(testFieldValidations, testFields);
  var fieldErrors = Forms.checkForErrors(fieldResults);

  if (fieldErrors) {
    console.log("Field errors!", _.pluck(fieldErrors, "error")); 
    return;
  }

  var formResults = Forms.runLocalValidations(testFormValidations, testFields);
  var formErrors = Forms.checkForErrors(formResults);

  if (formErrors) {
    console.log("Form errors!", _.pluck(formErrors, "error")); 
    return;
  }

  Forms.runRemoteValidations([testRemoteVal1], testFields)
  .then(Forms.checkForErrorsPromised)
  .fail(function (remoteErrors) {
    return Forms.Promise(function (resolve, reject) {
      console.log("there were remote validation errors", remoteErrors);
      reject(); 
    })
  })
  .then(function () {
    return testSubmit(testSubmit, testFields)
    .then(function () {
      //Here you would handle form subission success
      console.log("Success!"); 
    })
    .fail(function (err) {
      //Here you would handle form submission failure
      console.log(err.message); 
    })
  })
}

testCycle();
