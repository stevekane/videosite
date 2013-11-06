var testFields = {
  name: new Forms.Field("cats", ""),
  email: new Forms.Field("cat@email.gov", "") 
}

//example of a local Field Validation
var testFieldVal1 = function (fields) {
  return true;
}
var testFieldVal2 = function (fields) {
  return true;
}
var testFieldVal3 = function (fields) {
  return true;
}

var testFieldValidations = [
  {fn: testFieldVal1, error: "first was wrong", fields: ["email"]},
  {fn: testFieldVal2, error: "second was wrong", fields: ["email", "name"]},
  {fn: testFieldVal3, error: "third was wrong", fields: ["name"]},
];

//example of a local Form Validation
var testFormVal1 = function (fields) {
  return true;
}

var testFormValidations = [
  {fn: testFormVal1, error: "form validation went wack", fields: ["email", "name"]}
];

//Todo: should be rewritten
var testRemoteVal1 = function (fields) {
  return Forms.Promise(function (resolve, reject) {
    window.setTimeout(function () { 
      resolve(new Forms.Result(["email"], true, ""));
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
    console.log(Forms.buildFieldErrors(fieldResults));
    return;
  }

  var formResults = Forms.runLocalValidations(testFormValidations, testFields);
  var formErrors = Forms.checkForErrors(formResults);

  if (formErrors) {
    console.log(Forms.buildFieldErrors(formResults));
    return;
  }

  console.log("local test validations passed");
  console.log("remote test validations commented out");
  console.log("test submission commented out");

  //Forms.runRemoteValidations([testRemoteVal1], testFields)
  //.then(Forms.checkForErrorsPromised)
  //.fail(function (remoteErrors) {
  //  return Forms.Promise(function (resolve, reject) {
  //    console.log("there were remote validation errors", remoteErrors);
  //    reject(); 
  //  })
  //})
  //.then(function () {
  //  return testSubmit(testSubmit, testFields)
  //  .then(function () {
  //    //Here you would handle form subission success
  //    console.log("Success!"); 
  //  })
  //  .fail(function (err) {
  //    //Here you would handle form submission failure
  //    console.log(err.message); 
  //  })
  //})
}

testCycle();
