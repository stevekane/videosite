var validateEmail = function (email) {
  if (email.indexOf("@") === -1) {
    throw new Error("Valid email must contain @");
  }
}

var validateForm = function (form) {
  if (form.email === "" || form.password === "") {
    throw new Error("Must provide both email and password"); 
  }
}

var validateFields = function (form) {
  validateEmail(form.email); 
}

/*
LOGIN FORM SUBMIT FUNCTION (generic really, could be partially applied)
With correct functions to provide better interface?
only assumption is that submitFn returns a thennable
*/
Behaviors.login = {

  submit: function (context, form, submitFn, errorFn, successFn, failFn) {
    try {
      validateFields(form);
      validateForm(form);
    } catch (err) {
      return errorFn.call(context, err); 
    }

    submitFn.call(context, form)
    .then(function (result) {successFn.call(context, result);})
    .then(null, function (error) {failFn.call(context, error);});
  }
}
