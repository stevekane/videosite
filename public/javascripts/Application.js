window.App = Ember.Application.create();

require('validations/Validations.js');
require('libs/forms.js');
require('behaviors/Behaviors.js');

require('Router.js');
require('Models.js');
require('Controllers.js');
require('Components.js');
require('Store.js');

//store.js uses the store variable globally.
//re-assign it here to avoid naming conflicts throughout app
App.localStore = store;
store = null;

Stripe.setPublishableKey('pk_test_k6jIoHGla5uwBW9G7qXzapro');
