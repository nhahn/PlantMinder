(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var AddPlantActions = (function () {
  function AddPlantActions() {
    _classCallCheck(this, AddPlantActions);

    this.generateActions('updateId', 'invalidId', 'associateSuccess', 'associateFail');
  }

  _createClass(AddPlantActions, [{
    key: 'associateDevice',
    value: function associateDevice(payload) {
      var _this = this;

      $.ajax({
        type: 'POST',
        url: 'api/plants/associate',
        data: { uuid: payload.id }
      }).done(function (data) {
        _this.actions.associateSuccess(payload);
      }).fail(function (jqXhr) {
        (0, _underscore.assign)(payload, { errorMessage: jqXhr.responseJSON.err });
        _this.actions.associateFail(payload);
      });
    }
  }]);

  return AddPlantActions;
})();

exports['default'] = _alt2['default'].createActions(AddPlantActions);
module.exports = exports['default'];

},{"../alt":10,"underscore":"underscore"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var AuthActions = (function () {
  function AuthActions() {
    _classCallCheck(this, AuthActions);

    this.generateActions('authSuccess', 'authFail', 'updateEmail', 'updatePassword', 'invalidEmail', 'invalidPassword', 'fetchingToken', 'logout');
  }

  _createClass(AuthActions, [{
    key: 'auth',
    value: function auth(payload) {
      var _this = this;

      this.actions.fetchingToken();
      $.ajax({
        type: 'POST',
        url: '/auth/login',
        data: { email: payload.email, password: payload.password }
      }).done(function (data) {
        (0, _underscore.assign)(payload, { message: data.message });
        _this.actions.authSuccess(payload);
      }).fail(function (jqXhr) {
        (0, _underscore.assign)(payload, { errorMessage: jqXhr.responseJSON.err });
        _this.actions.authFail(payload);
      });
    }
  }]);

  return AuthActions;
})();

exports['default'] = _alt2['default'].createActions(AuthActions);
module.exports = exports['default'];

},{"../alt":10,"underscore":"underscore"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var FooterActions = function FooterActions() {
  _classCallCheck(this, FooterActions);

  this.generateActions('getTopCharactersSuccess', 'getTopCharactersFail');
};

exports['default'] = _alt2['default'].createActions(FooterActions);
module.exports = exports['default'];

},{"../alt":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var HomeActions = function HomeActions() {
  _classCallCheck(this, HomeActions);

  this.generateActions();
};

exports['default'] = _alt2['default'].createActions(HomeActions);
module.exports = exports['default'];

},{"../alt":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var NavbarActions = (function () {
  function NavbarActions() {
    _classCallCheck(this, NavbarActions);

    this.generateActions('updateOnlineUsers', 'updateAjaxAnimation', 'updateSearchQuery', 'getCharacterCountSuccess', 'getCharacterCountFail', 'findCharacterSuccess', 'findCharacterFail');
  }

  _createClass(NavbarActions, [{
    key: 'findCharacter',
    value: function findCharacter(payload) {
      var _this = this;

      $.ajax({
        url: '/api/characters/search',
        data: { name: payload.searchQuery }
      }).done(function (data) {
        (0, _underscore.assign)(payload, data);
        _this.actions.findCharacterSuccess(payload);
      }).fail(function () {
        _this.actions.findCharacterFail(payload);
      });
    }
  }, {
    key: 'getCharacterCount',
    value: function getCharacterCount() {
      var _this2 = this;

      $.ajax({ url: '/api/characters/count' }).done(function (data) {
        _this2.actions.getCharacterCountSuccess(data);
      }).fail(function (jqXhr) {
        _this2.actions.getCharacterCountFail(jqXhr);
      });
    }
  }]);

  return NavbarActions;
})();

exports['default'] = _alt2['default'].createActions(NavbarActions);
module.exports = exports['default'];

},{"../alt":10,"underscore":"underscore"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var PlantActions = function PlantActions() {
  _classCallCheck(this, PlantActions);

  this.generateActions();
};

exports['default'] = _alt2['default'].createActions(PlantActions);
module.exports = exports['default'];

},{"../alt":10,"underscore":"underscore"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var PlantsActions = (function () {
  function PlantsActions() {
    _classCallCheck(this, PlantsActions);

    this.generateActions('plantsGathered', 'plantsDropped', 'setCurrentLocation', 'imageUpdated', 'imageFailed', 'plantUpdateSuccess', 'plantUpdateFail');
  }

  _createClass(PlantsActions, [{
    key: 'fetchPlants',
    value: function fetchPlants() {
      var _this = this;

      $.ajax({
        type: 'GET',
        url: '/api/plants'
      }).done(function (data) {
        _this.actions.plantsGathered({ locations: data });
      }).fail(function (jqXhr) {
        _this.actions.plantsDropped({ errorMessage: jqXhr.responseJSON.err });
      });
    }
  }, {
    key: 'updatePlant',
    value: function updatePlant(location, plant, update) {
      var _this2 = this;

      $.ajax({
        type: 'POST',
        url: '/api/plants/' + location._id + '/' + plant._id + '/update',
        data: update
      }).done(function (data) {
        _this2.actions.updateSuccess({ location: location, plant: data });
      }).fail(function (jqXhr) {
        _this2.actions.updateFail({ errorMessage: jqXhr.responseJSON.err });
      });
    }
  }, {
    key: 'uploadImage',
    value: function uploadImage(location, plant, image) {
      var _this3 = this;

      $.ajax({
        type: 'PUT',
        url: '/api/plants/' + location._id + '/' + plant._id + '/image',
        data: { image: image }
      }).done(function (data) {
        _this3.actions.imageUpdated({ location: location, plant: plant, image: image });
      }).fail(function (jqXhr) {
        _this3.actions.imageFailed({ errorMessage: jqXhr.responseJSON.err });
      });
    }
  }]);

  return PlantsActions;
})();

exports['default'] = _alt2['default'].createActions(PlantsActions);
module.exports = exports['default'];

},{"../alt":10,"underscore":"underscore"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var ProfileActions = (function () {
  function ProfileActions() {
    _classCallCheck(this, ProfileActions);

    this.generateActions('updateUser', 'updateUserFail');
  }

  _createClass(ProfileActions, [{
    key: 'fetchUser',
    value: function fetchUser() {
      var _this = this;

      $.ajax({
        type: 'GET',
        url: '/api/profile'
      }).done(function (data) {
        _this.actions.updateUser({ user: data });
      }).fail(function (jqXhr) {
        _this.actions.updateUserFail({ errorMessage: jqXhr.responseJSON.err });
      });
    }
  }, {
    key: 'updatePassword',
    value: function updatePassword(password) {
      var _this2 = this;

      $.ajax({
        type: 'POST',
        url: '/api/profile/update/password',
        data: { password: password }
      }).done(function (data) {
        //Some type of password update success
      }).fail(function (jqXhr) {
        (0, _underscore.assign)(payload, { errorMessage: jqXhr.responseJSON.err });
        _this2.actions.updateUserFail(payload);
      });
    }
  }, {
    key: 'updateEmail',
    value: function updateEmail(email) {
      var _this3 = this;

      $.ajax({
        type: 'POST',
        url: '/api/profile/update/email',
        data: { email: email }
      }).done(function (data) {
        _this3.actions.updateUser({ user: data });
      }).fail(function (jqXhr) {
        _this3.actions.updateUserFail({ errorMessage: jqXhr.responseJSON.err });
      });
    }
  }]);

  return ProfileActions;
})();

exports['default'] = _alt2['default'].createActions(ProfileActions);
module.exports = exports['default'];

},{"../alt":10,"underscore":"underscore"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _actionsAuthActions = require('../actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var SignupActions = (function () {
  function SignupActions() {
    _classCallCheck(this, SignupActions);

    this.generateActions('signupSuccess', 'signupFail', 'updateEmail', 'updatePassword', 'updateConfirmation', 'invalidEmail', 'invalidPassword', 'invalidConfirmation');
  }

  _createClass(SignupActions, [{
    key: 'signup',
    value: function signup(payload) {
      var _this = this;

      $.ajax({
        type: 'POST',
        url: '/auth/signup',
        data: { email: payload.email, password: payload.password }
      }).done(function (data) {
        (0, _underscore.assign)(payload, { token: data.token });
        _actionsAuthActions2['default'].authSuccess(payload);
      }).fail(function (jqXhr) {
        (0, _underscore.assign)(payload, { errorMessage: jqXhr.responseJSON.err });
        _this.actions.signupFail(payload);
      });
    }
  }]);

  return SignupActions;
})();

exports['default'] = _alt2['default'].createActions(SignupActions);
module.exports = exports['default'];

},{"../actions/AuthActions":2,"../alt":10,"underscore":"underscore"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

exports['default'] = new _alt2['default']();
module.exports = exports['default'];

},{"alt":"alt"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesAddPlantStore = require('../stores/AddPlantStore');

var _storesAddPlantStore2 = _interopRequireDefault(_storesAddPlantStore);

var _actionsAddPlantActions = require('../actions/AddPlantActions');

var _actionsAddPlantActions2 = _interopRequireDefault(_actionsAddPlantActions);

var _underscore = require('underscore');

var AddPlant = (function (_React$Component) {
    _inherits(AddPlant, _React$Component);

    function AddPlant(props) {
        _classCallCheck(this, AddPlant);

        _get(Object.getPrototypeOf(AddPlant.prototype), 'constructor', this).call(this, props);
        this.state = _storesAddPlantStore2['default'].getState();
        this.onChange = this.onChange.bind(this);
    }

    _createClass(AddPlant, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _storesAddPlantStore2['default'].listen(this.onChange);
            this.controller = new ScrollMagic.Controller({ globalSceneOptions: {
                    triggerHook: 0.35
                } });
            var batteryTween = TweenMax.to("#battery1", 1, { className: "+=battery-transition" });
            this.batteryScene = new ScrollMagic.Scene({ triggerElement: "#trigger1", duration: "25%", offset: -150 }).setTween(batteryTween).addTo(this.controller);
            var batteryTween2 = TweenMax.to("#battery2", 1, { className: "+=battery-transition" });
            this.batteryScene = new ScrollMagic.Scene({ triggerElement: "#trigger1", duration: "25%", offset: -100 }).setTween(batteryTween2).addTo(this.controller);
            this.stickScene = new ScrollMagic.Scene({ triggerElement: "#fixed", duration: 850, offset: 50 }).setPin("#device").addTo(this.controller);
            var switchTween = TweenMax.to("#switch", 1, { yPercent: "-92%" });
            this.switchScene = new ScrollMagic.Scene({ triggerElement: "#switchTrigger", duration: 80 }).setTween(switchTween).addTo(this.controller);
            var wifiAnimation = TweenMax.staggerFromTo(".wifiBar", 2, { opacity: 0 }, { opacity: 1, repeat: -1 }, 0.2);
            var wifiTween = TweenMax.fromTo(".wifiBar", 2, { display: "none" }, { display: "initial" });
            this.wifiScene = new ScrollMagic.Scene({ triggerElement: "#switchTrigger", offset: 80 }).setTween(wifiTween).addTo(this.controller);
            this.menuScene = new ScrollMagic.Scene({ triggerElement: "#menuTrigger" }).setClassToggle("#netDropDown", "showNet").addTo(this.controller);
            this.menuWifiScene = new ScrollMagic.Scene({ triggerElement: "#menuTrigger", offset: 50 }).setClassToggle(".wifiHighlight", "plantWifi").addTo(this.controller);
            var plantTween = TweenMax.to("#device", 1, { yPercent: 87, scale: 0.2 });
            this.plantScene = new ScrollMagic.Scene({ triggerElement: "#plantTrigger", duration: 100, offset: -100 }).setTween(plantTween).addTo(this.controller);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _storesAddPlantStore2['default'].unlisten(this.onChange);
        }
    }, {
        key: 'onChange',
        value: function onChange(state) {
            this.setState(state);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            var sensor = this.state.sensorID.trim();

            if (!sensor || !sensor.match(/[a-z]+-[a-z]+-[a-z]+/)) {
                _actionsAddPlantActions2['default'].invalidId();
                this.refs.sensorIDField.getDOMNode().focus();
            } else {
                _actionsAddPlantActions2['default'].associateDevice({ router: this.context.router, id: sensor });
            }
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2['default'].createElement(
                'div',
                { className: 'container fadeInX animated' },
                _react2['default'].createElement(
                    'div',
                    { className: 'row' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'col-sm-7 col-sm-offset-1' },
                        _react2['default'].createElement(
                            'h2',
                            { id: 'title' },
                            'Adding a New Plant'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'In order to add a sensor to a new plant, you need perform a series of steps to setup the sensor, and then associate it with your account'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'Just follow the instructions on this screen, and you will up and runnin in no time!'
                        )
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'col-sm-2' },
                        _react2['default'].createElement('img', { src: '/img/topPlant.svg', className: 'img-responsive' })
                    )
                ),
                _react2['default'].createElement('hr', null),
                _react2['default'].createElement(
                    'div',
                    { className: 'row', id: 'fixed' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'col-sm-2 col-sm-offset-1' },
                        _react2['default'].createElement('img', { src: '/img/device.svg', className: 'img-responsive', id: 'device' })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'col-sm-9' },
                        _react2['default'].createElement(
                            'h4',
                            null,
                            'First, ensure you device is powered up and has a fresh set of batteries'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'If you were having trouble recieving data from your device, it might have just run out of battery!'
                        ),
                        _react2['default'].createElement('img', { id: 'battery1', src: '/img/battery.svg', style: { width: "15%" } }),
                        _react2['default'].createElement('img', { id: 'battery2', src: '/img/battery.svg', style: { width: "15%" } }),
                        _react2['default'].createElement('div', { id: 'trigger1', className: 'spacer', style: { minHeight: 100 } }),
                        _react2['default'].createElement(
                            'h4',
                            { id: 'switchTrigger' },
                            'Next, turn on your device'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'If you are trying to reset your device, turn it one for about 1 second, and then power it off. When you turn it on again, it should allow you to enter new WiFi settings'
                        ),
                        _react2['default'].createElement(
                            'svg',
                            { version: '1.1', id: 'Layer_1', xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px',
                                viewBox: '-289 381.3 32 31.7', 'enable-background': 'new -289 381.3 32 31.7', style: { width: "16%" } },
                            _react2['default'].createElement('path', { fill: '#363942', d: 'M-261,383.1h-24c-1.1,0-2,0.9-2,2v24c0,1.1,0.9,2,2,2h24c1.1,0,2-0.9,2-2v-24 C-259,384-259.9,383.1-261,383.1z' }),
                            _react2['default'].createElement('rect', { x: '-279', y: '387.1', fill: '#FFFFFF', width: '12', height: '20' }),
                            _react2['default'].createElement('rect', { x: '-277', y: '397.1', fill: '#363942', width: '8', height: '8', id: 'switch' })
                        ),
                        _react2['default'].createElement(
                            'svg',
                            { version: '1.1', id: 'Layer_1', xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px',
                                viewBox: '1 77 462 509.8', 'enable-background': 'new 1 77 462 509.8', style: { width: '16%', marginLeft: 40 } },
                            _react2['default'].createElement('path', { className: 'wifiBar', d: 'M47,365c-17.7,0-32-14.3-32-32c0-17.7,14.3-32,32-32s32,14.3,32,32C79,350.7,64.7,365,47,365z' }),
                            _react2['default'].createElement('path', { className: 'wifiBar', d: 'M108.6,259.4L88,283.9c29.2,24.5,29.2,73.8,0,98.3l20.5,24.6c21.9-18.3,34.5-45.2,34.5-73.7 C143,304.5,130.5,277.6,108.6,259.4z' }),
                            _react2['default'].createElement('path', { className: 'wifiBar', d: 'M154.4,214.4l-21.5,23.7c26.8,24.2,42.1,58.8,42.1,94.9c0,36.1-15.3,70.6-42,94.8l21.5,23.7C187.9,421.2,207,378.1,207,333 C207,287.9,187.8,244.7,154.4,214.4z' }),
                            _react2['default'].createElement('path', { className: 'wifiBar', d: 'M199.9,169.3l-21.8,23.4C216.8,228.9,239,280,239,333c0,53.8-21.6,103.6-60.9,140.3l21.9,23.4c45.1-42.2,71-101.8,71-163.7 C271,271.2,245.1,211.5,199.9,169.3z' }),
                            _react2['default'].createElement('path', { className: 'wifiBar', d: 'M245.3,124.1l-22,23.2C274.7,196.1,303,262.1,303,333c0,70.9-28.3,136.8-79.6,185.6l22,23.2C303.2,486.9,335,412.7,335,333 C335,253.2,303.1,179,245.3,124.1z' }),
                            _react2['default'].createElement('path', { className: 'wifiBar', d: 'M399,333c0-96.5-38.6-186.6-108.7-253.8l-22.2,23.1C331.9,163.4,367,245.4,367,333c0,87.7-35.1,169.6-98.8,230.7l22.2,23.1 C360.4,519.6,399,429.5,399,333z' })
                        ),
                        _react2['default'].createElement(
                            'h4',
                            { id: 'menuTrigger' },
                            'Connect a computer, phone, or tablet to the ',
                            _react2['default'].createElement(
                                'b',
                                null,
                                'PlantMinder'
                            ),
                            ' WiFi network created by the device'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'It might take a few moments for the WiFi network to appear.'
                        ),
                        _react2['default'].createElement(
                            'svg',
                            { version: '1.1', id: 'Layer_1', xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px',
                                viewBox: '0 0 364.9 282.4', 'enable-background': 'new 0 0 364.9 282.4', style: { width: "50%", margin: "auto", display: "block" } },
                            _react2['default'].createElement('path', { fill: '#4C6C32', stroke: '#000000', 'stroke-width': '3', 'stroke-miterlimit': '10', d: 'M11.6,265.2c0,6.6,5.4,12,12,12h320 c6.6,0,12-5.4,12-12V40.3h-344V265.2z' }),
                            _react2['default'].createElement('path', { fill: '#FCFCF8', stroke: '#000000', 'stroke-width': '3', 'stroke-miterlimit': '10', d: 'M343.6,10.2h-320c-6.6,0-12,5.4-12,12v18.1h344 V22.2C355.6,15.6,350.2,10.2,343.6,10.2z' }),
                            _react2['default'].createElement(
                                'g',
                                null,
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M103.5,34.5c0,1-0.8,1.9-1.9,1.9c-1,0-1.9-0.8-1.9-1.9s0.8-1.9,1.9-1.9C102.7,32.6,103.5,33.4,103.5,34.5z'
                                }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M97.3,30.9l1.4,1.2c1.4-1.7,4.3-1.7,5.8,0l1.4-1.2c-1.1-1.3-2.7-2-4.3-2C100,28.8,98.4,29.6,97.3,30.9z' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M94.7,28.2l1.4,1.3c1.4-1.6,3.5-2.5,5.6-2.5s4.1,0.9,5.6,2.5l1.4-1.3c-1.8-2-4.3-3.1-7-3.1 C99,25.1,96.4,26.2,94.7,28.2z' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M92,25.5l1.4,1.3c2.1-2.3,5.1-3.6,8.2-3.6c3.2,0,6.1,1.3,8.2,3.6l1.4-1.3c-2.5-2.6-6-4.2-9.6-4.2 C98,21.3,94.5,22.8,92,25.5z' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M89.4,22.8l1.4,1.3c2.9-3,6.7-4.7,10.9-4.7c4.2,0,8,1.7,10.9,4.7l1.4-1.3c-3.2-3.4-7.6-5.3-12.3-5.3 C96.9,17.6,92.6,19.4,89.4,22.8z' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M101.6,13.8c-5.7,0-11,2.3-14.9,6.4l1.4,1.3c3.6-3.7,8.4-5.8,13.5-5.8c5.1,0,10,2.1,13.5,5.8l1.4-1.3 C112.6,16.1,107.3,13.8,101.6,13.8z' })
                            ),
                            _react2['default'].createElement(
                                'g',
                                null,
                                _react2['default'].createElement('polygon', { fill: '#010101', points: '142,21.8 142,28 147.4,28 151.6,32.2 151.6,17.6 147.4,21.8 \t' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M157.6,24.9L157.6,24.9L157.6,24.9C157.6,24.9,157.6,24.9,157.6,24.9c0-2.7-0.9-5-2.8-7 c-0.7-0.7-1.7,0.4-1,1c1.6,1.7,2.3,3.6,2.4,5.9c0,2.3-0.8,4.2-2.4,5.9c-0.7,0.7,0.4,1.7,1,1C156.6,29.9,157.5,27.6,157.6,24.9 L157.6,24.9z' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M161.3,24.9L161.3,24.9L161.3,24.9C161.3,24.9,161.3,24.9,161.3,24.9c-0.1-3.6-1.3-6.9-3.8-9.5 c-0.7-0.7-1.7,0.4-1,1c2.2,2.4,3.3,5.2,3.4,8.5c0,3.2-1.1,6.1-3.4,8.5c-0.7,0.7,0.4,1.7,1,1C160,31.8,161.2,28.6,161.3,24.9 L161.3,24.9z' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M165,24.9L165,24.9L165,24.9c-0.1-4.6-1.7-8.8-4.8-12.1c-0.7-0.7-1.7,0.4-1,1c2.9,3,4.4,6.9,4.4,11 c0,4.2-1.5,8-4.4,11c-0.7,0.7,0.4,1.7,1,1C163.3,33.7,164.9,29.5,165,24.9C165,24.9,165,24.9,165,24.9L165,24.9z' })
                            ),
                            _react2['default'].createElement(
                                'g',
                                null,
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M308,18.9h-0.7v-1.7c0-2.1-1.7-3.8-3.8-3.8h-49.7c-2.1,0-3.8,1.7-3.8,3.8v15.5c0,2.1,1.7,3.8,3.8,3.8h49.7 c2.1,0,3.8-1.7,3.8-3.8V31h0.7c1.7,0,3.2-1.4,3.2-3.2V22C311.2,20.3,309.8,18.9,308,18.9z M308.7,27.8c0,0.4-0.3,0.6-0.6,0.6h-3.2 v4.2c0,0.7-0.6,1.3-1.3,1.3h-49.7c-0.7,0-1.3-0.6-1.3-1.3V17.2c0-0.7,0.6-1.3,1.3-1.3h49.7c0.7,0,1.3,0.6,1.3,1.3v4.2h3.2 c0.3,0,0.6,0.3,0.6,0.6L308.7,27.8L308.7,27.8z' }),
                                _react2['default'].createElement('path', { fill: '#010101', d: 'M301.8,17.2h-46.6c-0.7,0-1.3,0.6-1.3,1.3v12.9c0,0.7,0.6,1.3,1.3,1.3h46.6c0.7,0,1.3-0.6,1.3-1.3V18.5 C303.1,17.8,302.5,17.2,301.8,17.2z M280.2,27.7l-0.7,0.5l-0.7-2.2L266,30.3l10.8-8.1l0.7-0.5l0.7,2.2l12.7-4.2L280.2,27.7z' })
                            ),
                            _react2['default'].createElement(
                                'text',
                                { transform: 'matrix(1 0 0 1 191.1095 30.8321)', 'font-family': '\'ArialMT\'', 'font-size': '18.7046px' },
                                '100%'
                            ),
                            _react2['default'].createElement(
                                'g',
                                { id: 'netDropDown' },
                                _react2['default'].createElement('rect', { x: '76.9', y: '40.3', fill: '#FCFCF8', stroke: '#010101', 'stroke-width': '3', 'stroke-miterlimit': '10', width: '181.1', height: '193.8' }),
                                _react2['default'].createElement(
                                    'g',
                                    null,
                                    _react2['default'].createElement(
                                        'text',
                                        { transform: 'matrix(1 0 0 1 92.3267 106.2575)', 'font-family': '\'ArialMT\'', 'font-size': '15px' },
                                        'GuestNetwork'
                                    ),
                                    _react2['default'].createElement(
                                        'g',
                                        null,
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M232.8,108c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4S232.8,107.2,232.8,108z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M228.1,105.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5 C230.1,103.8,228.9,104.3,228.1,105.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M226.1,103.3l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9s3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3 C229.4,100.9,227.5,101.8,226.1,103.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M224.1,101.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2 C228.7,98.1,226,99.2,224.1,101.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M222.1,99.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5s6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4 C227.9,95.2,224.6,96.7,222.1,99.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M231.4,92.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1 C239.7,94.1,235.7,92.4,231.4,92.4z' })
                                    )
                                ),
                                _react2['default'].createElement(
                                    'g',
                                    null,
                                    _react2['default'].createElement(
                                        'text',
                                        { transform: 'matrix(1 0 0 1 92.3265 134.2465)', 'font-family': '\'ArialMT\'', 'font-size': '15px' },
                                        'SecureNet'
                                    ),
                                    _react2['default'].createElement(
                                        'g',
                                        null,
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M232.8,136c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4S232.8,135.2,232.8,136z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M228.1,133.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5 C230.1,131.8,228.9,132.3,228.1,133.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M226.1,131.2l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9s3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3 C229.4,128.9,227.5,129.8,226.1,131.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M224.1,129.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2 C228.7,126.1,226,127.2,224.1,129.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M222.1,127.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5s6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4 C227.9,123.2,224.6,124.6,222.1,127.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M231.4,120.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1 C239.7,122.1,235.7,120.4,231.4,120.4z' })
                                    ),
                                    _react2['default'].createElement('path', { fill: '#010101', d: 'M210.3,127.9v-3.2c0-3.5-2.9-6.4-6.4-6.4s-6.4,2.9-6.4,6.4v3.2h-1.2v11.7h15.1v-11.7H210.3z M199.3,124.8 c0-2.6,2.1-4.7,4.7-4.7c2.6,0,4.7,2.1,4.7,4.7v3.2h-9.3V124.8z' })
                                ),
                                _react2['default'].createElement('rect', { x: '78.6', y: '144.7', fill: '#1D75BC', width: '177.8', height: '26.1', className: 'wifiHighlight', id: 'wifiHighlight' }),
                                _react2['default'].createElement(
                                    'g',
                                    { className: 'wifiHighlight' },
                                    _react2['default'].createElement(
                                        'text',
                                        { transform: 'matrix(1 0 0 1 92.3265 162.2355)', fill: '#010101', 'font-family': '\'ArialMT\'', 'font-size': '15px' },
                                        'PlantMinder'
                                    ),
                                    _react2['default'].createElement(
                                        'g',
                                        null,
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M232.8,164c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4 C232.2,162.6,232.8,163.2,232.8,164z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M228.1,161.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5 C230.1,159.7,228.9,160.3,228.1,161.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M226.1,159.2l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9c1.6,0,3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3 C229.4,156.9,227.5,157.8,226.1,159.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M224.1,157.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2 C228.7,154.1,226,155.2,224.1,157.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M222.1,155.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5c3.1,0,6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4 C227.9,151.2,224.6,152.6,222.1,155.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M231.4,148.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1 C239.7,150.1,235.7,148.4,231.4,148.4z' })
                                    )
                                ),
                                _react2['default'].createElement(
                                    'g',
                                    null,
                                    _react2['default'].createElement(
                                        'text',
                                        { transform: 'matrix(1 0 0 1 92.3264 190.2244)', 'font-family': '\'ArialMT\'', 'font-size': '15px' },
                                        'FiosWiFi'
                                    ),
                                    _react2['default'].createElement(
                                        'g',
                                        null,
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M232.8,192c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4 C232.2,190.6,232.8,191.2,232.8,192z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M228.1,189.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5 C230.1,187.7,228.9,188.3,228.1,189.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M226.1,187.2l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9c1.6,0,3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3 C229.4,184.9,227.5,185.7,226.1,187.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M224.1,185.2l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2 C228.7,182.1,226,183.2,224.1,185.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M222.1,183.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5c3.1,0,6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4 C227.9,179.2,224.6,180.6,222.1,183.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M231.4,176.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1 C239.7,178.1,235.7,176.4,231.4,176.4z' })
                                    ),
                                    _react2['default'].createElement('path', { fill: '#010101', d: 'M210.3,183.9v-3.2c0-3.5-2.9-6.4-6.4-6.4c-3.5,0-6.4,2.9-6.4,6.4v3.2h-1.2v11.7h15.1v-11.7H210.3z M199.3,180.7c0-2.6,2.1-4.7,4.7-4.7c2.6,0,4.7,2.1,4.7,4.7v3.2h-9.3V180.7z' })
                                ),
                                _react2['default'].createElement(
                                    'g',
                                    null,
                                    _react2['default'].createElement(
                                        'text',
                                        { transform: 'matrix(1 0 0 1 92.3265 80.2686)', 'font-family': '\'ArialMT\'', 'font-size': '15px' },
                                        'NetworkA'
                                    ),
                                    _react2['default'].createElement(
                                        'g',
                                        null,
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M232.8,80c0,0.8-0.6,1.4-1.4,1.4S230,80.8,230,80c0-0.8,0.6-1.4,1.4-1.4S232.8,79.3,232.8,80z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M228.1,77.3l1.1,0.9c1.1-1.3,3.3-1.3,4.4,0l1.1-0.9c-0.8-1-2-1.5-3.3-1.5 C230.1,75.8,228.9,76.3,228.1,77.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M226.1,75.3l1.1,1c1.1-1.2,2.6-1.9,4.2-1.9s3.1,0.7,4.2,1.9l1.1-1c-1.3-1.5-3.3-2.3-5.3-2.3 C229.4,72.9,227.5,73.8,226.1,75.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M224.1,73.3l1,1c1.6-1.7,3.9-2.7,6.2-2.7c2.4,0,4.6,1,6.2,2.7l1-1c-1.9-2-4.5-3.2-7.3-3.2 C228.7,70.1,226,71.2,224.1,73.3z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M222.1,71.2l1,1c2.2-2.3,5.1-3.5,8.2-3.5s6.1,1.3,8.2,3.5l1-1c-2.4-2.6-5.7-4-9.3-4 C227.9,67.3,224.6,68.7,222.1,71.2z' }),
                                        _react2['default'].createElement('path', { fill: '#010101', d: 'M231.4,64.4c-4.3,0-8.3,1.7-11.3,4.8l1,1c2.7-2.8,6.4-4.4,10.2-4.4c3.9,0,7.5,1.6,10.2,4.4l1-1 C239.7,66.1,235.7,64.4,231.4,64.4z' })
                                    ),
                                    _react2['default'].createElement('path', { fill: '#010101', d: 'M210.3,72v-3.2c0-3.5-2.9-6.4-6.4-6.4s-6.4,2.9-6.4,6.4V72h-1.2v11.7h15.1V72H210.3z M199.3,68.8 c0-2.6,2.1-4.7,4.7-4.7c2.6,0,4.7,2.1,4.7,4.7V72h-9.3V68.8z' })
                                )
                            )
                        ),
                        _react2['default'].createElement(
                            'h4',
                            { id: 'netTrigger' },
                            'A connection screen should appear on your device, or try to navigate to a URL in your browser'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'A connection screen might take a little while to appear. If entering a URL in the browser, you should automatically be redirected to the device connection page'
                        ),
                        _react2['default'].createElement(
                            'h4',
                            { id: 'credTrigger' },
                            'Enter your WiFi credentials into the web page. Your device will restart and try to connect to the WiFi network.'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'If there was an error, the device will restart and the ',
                            _react2['default'].createElement(
                                'b',
                                null,
                                'PlantMinder'
                            ),
                            ' will reappear. Reconnect to the network and try your credentials again'
                        ),
                        _react2['default'].createElement(
                            'h4',
                            null,
                            'Finally, enter the device identifier found on the back into the form below. This will associated the device with your account.'
                        ),
                        _react2['default'].createElement(
                            'p',
                            null,
                            'If trying to tranfer a device from one person to another, contact ',
                            _react2['default'].createElement(
                                'a',
                                { href: 'mailto:nphahn@gmail.com' },
                                'nphahn@gmail.com'
                            )
                        )
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'row', id: 'plantTrigger' },
                    _react2['default'].createElement(
                        'div',
                        { className: 'col-sm-2 col-sm-offset-1' },
                        _react2['default'].createElement('img', { src: '/img/plantTop.svg', className: 'img-responsive', style: { zIndex: -10, position: 'relative' } }),
                        _react2['default'].createElement('img', { src: '/img/tableBottom.svg', className: 'img-responsive', style: { zIndex: 3, position: 'relative' } })
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: 'col-sm-9' },
                        _react2['default'].createElement(
                            'div',
                            { className: 'panel panel-default' },
                            _react2['default'].createElement(
                                'div',
                                { className: 'panel-heading' },
                                'Add Sensor'
                            ),
                            _react2['default'].createElement(
                                'div',
                                { className: 'panel-body' },
                                _react2['default'].createElement(
                                    'form',
                                    { onSubmit: this.handleSubmit.bind(this) },
                                    _react2['default'].createElement(
                                        'div',
                                        { className: 'form-group ' + this.state.idValidationState ? this.state.idValidationState : '' },
                                        _react2['default'].createElement(
                                            'label',
                                            { className: 'control-label' },
                                            'Sensor ID'
                                        ),
                                        _react2['default'].createElement('input', { type: 'text', className: 'form-control', ref: 'sensorIDField', value: this.state.sensorId,
                                            onChange: _actionsAddPlantActions2['default'].updateId }),
                                        _react2['default'].createElement(
                                            'span',
                                            { className: 'help-block' },
                                            this.state.helpBlock
                                        )
                                    ),
                                    _react2['default'].createElement(
                                        'div',
                                        { className: 'form-group pull-left' },
                                        _react2['default'].createElement(
                                            'button',
                                            { type: 'submit', className: 'btn btn-primary btn-space' },
                                            'Add Sensor'
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2['default'].createElement('div', { className: 'spacer', style: { minHeight: 100 } })
            );
        }
    }]);

    return AddPlant;
})(_react2['default'].Component);

AddPlant.contextTypes = {
    router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = AddPlant;
module.exports = exports['default'];
/*Battery Animation*/ /*Switch Animation*/ /*Network Animation*/

},{"../actions/AddPlantActions":1,"../stores/AddPlantStore":30,"react":"react","underscore":"underscore"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _storesAuthStore = require('../stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _underscore = require('underscore');

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var App = (function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
    this.state = _storesAuthStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  //Tookout <Footer />

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      _storesAuthStore2['default'].listen(this.onChange);

      //Allows us to put our AuthStore token into our ajax requests
      $.ajaxSetup({
        beforeSend: function beforeSend(jqXHR) {
          if (_this.state.loggedIn) {
            jqXHR.setRequestHeader('Authorization', 'JWT ' + _this.state.token);
          }
        }
      });

      //If we ever get an authorization error, automatically redirect us to
      //the login page
      $(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
        if (jqXHR.status == 401) {
          console.log("Token authentication error");
          console.log(currentPath);
          var currentPath = _this.context.router.getCurrentPathname();
          _this.context.router.transitionTo('/auth');
        }
      });

      $(document).ajaxComplete(function (event, xhr, settings) {
        var _raw_messages = xhr.getResponseHeader("X-FlashMessages");
        if (_raw_messages) {
          var messages = JSON.parse(_raw_messages);
          messages.forEach(function (message) {
            toastr[message[1]](message[0]);
          });
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesAuthStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        token: this.state.token
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(_Navbar2['default'], null),
        _react2['default'].createElement(_reactRouter.RouteHandler, null),
        _react2['default'].createElement(_Footer2['default'], null)
      );
    }
  }]);

  return App;
})(_react2['default'].Component);

App.childContextTypes = {
  token: _react2['default'].PropTypes.string.isRequired
};

App.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = App;
module.exports = exports['default'];

},{"../actions/HomeActions":4,"../stores/AuthStore":31,"./Footer":15,"./Navbar":18,"react":"react","react-router":"react-router","underscore":"underscore"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesAuthStore = require('../stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _actionsAuthActions = require('../actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _underscore = require('underscore');

var Auth = (function (_React$Component) {
  _inherits(Auth, _React$Component);

  function Auth(props) {
    _classCallCheck(this, Auth);

    _get(Object.getPrototypeOf(Auth.prototype), 'constructor', this).call(this, props);
    this.state = _storesAuthStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Auth, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesAuthStore2['default'].listen(this.onChange);
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      AuthAction.logOut();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesAuthStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var email = this.state.email.trim();
      var password = this.state.password;

      if (!email) {
        _actionsAuthActions2['default'].invalidEmail();
        this.refs.emailTextField.getDOMNode().focus();
      }

      if (!password) {
        _actionsAuthActions2['default'].invalidPassword();
        this.refs.passwordTextField.getDOMNode().focus();
      }

      if (email && password) {
        _actionsAuthActions2['default'].auth({ router: this.context.router, token: this.state.token, email: email, password: password });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var inner = '';

      switch (this.state.status) {
        case 'fetchingToken':
          inner = _react2['default'].createElement(
            'div',
            { className: 'row' },
            _react2['default'].createElement(
              'div',
              { className: 'col-xs-10 col-sm-6 col-sm-offset-3 col-xs-offset-1' },
              _react2['default'].createElement(
                'div',
                { className: 'thumbnail fadeInUp animated row' },
                _react2['default'].createElement(
                  'div',
                  { className: 'col-xs-12' },
                  _react2['default'].createElement(
                    'h4',
                    null,
                    'Logging You In'
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'progress' },
                    _react2['default'].createElement(
                      'div',
                      { className: 'progress-bar progress-bar-striped active', role: 'progressbar', 'aria-valuenow': '100', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { width: "100%" } },
                      _react2['default'].createElement(
                        'span',
                        { className: 'sr-only' },
                        'In Progress'
                      )
                    )
                  )
                )
              )
            )
          );
          break;
        case 'authError':
        case 'loggedOut':
          inner = _react2['default'].createElement(
            'div',
            { className: 'row flipInX animated' },
            _react2['default'].createElement(
              'div',
              { className: 'col-sm-8' },
              _react2['default'].createElement(
                'div',
                { className: 'panel panel-default' },
                _react2['default'].createElement(
                  'div',
                  { className: 'panel-heading' },
                  'Log In'
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'panel-body' },
                  _react2['default'].createElement(
                    'form',
                    { onSubmit: this.handleSubmit.bind(this) },
                    _react2['default'].createElement(
                      'div',
                      { className: 'form-group ' + this.state.emailValidationState ? this.state.emailValidationState : '' },
                      _react2['default'].createElement(
                        'label',
                        { className: 'control-label' },
                        'Email'
                      ),
                      _react2['default'].createElement('input', { type: 'email', className: 'form-control', ref: 'emailTextField', value: this.state.email,
                        onChange: _actionsAuthActions2['default'].updateEmail, autoFocus: true })
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'form-group ' + this.state.passwordValidationState ? this.state.passwordValidationState : '' },
                      _react2['default'].createElement(
                        'label',
                        { className: 'control-label' },
                        'Password'
                      ),
                      _react2['default'].createElement('input', { type: 'password', className: 'form-control', ref: 'passwordTextField', value: this.state.password,
                        onChange: _actionsAuthActions2['default'].updatePassword }),
                      _react2['default'].createElement(
                        'span',
                        { className: 'help-block' },
                        this.state.helpBlock
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'form-group pull-left' },
                      _react2['default'].createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-primary btn-space' },
                        'Submit'
                      ),
                      _react2['default'].createElement(
                        'a',
                        { href: '/auth/signup', className: 'btn btn-default' },
                        'Sign Up'
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'form-group pull-right' },
                      _react2['default'].createElement(
                        'a',
                        { href: '/auth/facebook', className: 'btn btn-space', style: { backgroundColor: "#3b5998", color: "#fff" } },
                        _react2['default'].createElement('span', { className: 'fa fa-facebook-square' }),
                        ' Login'
                      ),
                      _react2['default'].createElement(
                        'a',
                        { href: '/auth/google', className: 'btn', style: { backgroundColor: "#DC4E41", color: "#fff" } },
                        _react2['default'].createElement('span', { className: 'fa fa-google-plus-square' }),
                        ' Login'
                      )
                    )
                  )
                )
              )
            )
          );
          break;

      }
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        inner
      );
    }
  }]);

  return Auth;
})(_react2['default'].Component);

Auth.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = Auth;
module.exports = exports['default'];

},{"../actions/AuthActions":2,"../stores/AuthStore":31,"react":"react","underscore":"underscore"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var Feedback = (function (_React$Component) {
  _inherits(Feedback, _React$Component);

  function Feedback(props) {
    _classCallCheck(this, Feedback);

    _get(Object.getPrototypeOf(Feedback.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Feedback, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //FooterStore.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      //FooterStore.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', { className: 'container' });
    }
  }]);

  return Feedback;
})(_react2['default'].Component);

exports['default'] = Feedback;
module.exports = exports['default'];

},{"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesFooterStore = require('../stores/FooterStore');

var _storesFooterStore2 = _interopRequireDefault(_storesFooterStore);

var _actionsFooterActions = require('../actions/FooterActions');

var _actionsFooterActions2 = _interopRequireDefault(_actionsFooterActions);

var Footer = (function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    _get(Object.getPrototypeOf(Footer.prototype), 'constructor', this).call(this, props);
    this.state = _storesFooterStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Footer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesFooterStore2['default'].listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesFooterStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'footer',
        null,
        _react2['default'].createElement(
          'div',
          { className: 'container' },
          _react2['default'].createElement(
            'div',
            { className: 'row' },
            _react2['default'].createElement(
              'div',
              { className: 'col-sm-5' },
              _react2['default'].createElement(
                'h3',
                { className: 'lead' },
                _react2['default'].createElement(
                  'strong',
                  null,
                  'Information'
                ),
                ' and ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'Copyright'
                )
              ),
              _react2['default'].createElement(
                'p',
                null,
                'Powered by ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'Node.js'
                ),
                ', ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'MongoDB'
                ),
                ' and ',
                _react2['default'].createElement(
                  'strong',
                  null,
                  'React'
                ),
                ' with Flux architecture and server-side rendering.'
              ),
              _react2['default'].createElement(
                'p',
                null,
                '© Nathan Hahn, HCII Carnegie Mellon University'
              ),
              _react2['default'].createElement(
                'p',
                null,
                'Contact ',
                _react2['default'].createElement(
                  'a',
                  { href: 'mailto:nhahn@cs.cmu.edu' },
                  'nhahn@cs.cmu.edu'
                ),
                ' with questions'
              )
            ),
            _react2['default'].createElement('div', { className: 'col-sm-7' })
          )
        )
      );
    }
  }]);

  return Footer;
})(_react2['default'].Component);

exports['default'] = Footer;
module.exports = exports['default'];

},{"../actions/FooterActions":3,"../stores/FooterStore":32,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesHomeStore = require('../stores/HomeStore');

var _storesHomeStore2 = _interopRequireDefault(_storesHomeStore);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var Home = (function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    _get(Object.getPrototypeOf(Home.prototype), 'constructor', this).call(this, props);
    this.state = _storesHomeStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesHomeStore2['default'].listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesHomeStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row fadeInUp animated' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-10 col-sm-offset-1 thumbnail' },
            _react2['default'].createElement('img', { src: '/img/home_plant.jpg' })
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-3 col-sm-offset-2' },
            _react2['default'].createElement(
              'h3',
              null,
              'Peace of Mind'
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-5' },
            _react2['default'].createElement(
              'p',
              null,
              'Plant Minder helps you take care of and monitor your indoor plants. Your can install the application on your iPhone or Android advice to recieve alerts about care information. '
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-3 col-sm-offset-2' },
            _react2['default'].createElement(
              'h3',
              null,
              'Optimal Care'
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-5' },
            _react2['default'].createElement(
              'p',
              null,
              'Plant Minder provides you history about sunlight, humidity, temperature, and soil moisture'
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-3 col-sm-offset-2' },
            _react2['default'].createElement(
              'h3',
              null,
              'Set it and Forget It'
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-5' },
            _react2['default'].createElement(
              'p',
              null,
              'Plant Minder is powered by two AA batteries, can last for months!'
            )
          )
        )
      );
    }
  }]);

  return Home;
})(_react2['default'].Component);

exports['default'] = Home;
module.exports = exports['default'];

},{"../actions/HomeActions":4,"../stores/HomeStore":33,"react":"react","react-router":"react-router"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function SelectInputText(element) {
    element.setSelectionRange(0, element.value.length);
}

var InlineEdit = (function (_React$Component) {
    _inherits(InlineEdit, _React$Component);

    function InlineEdit(props) {
        _classCallCheck(this, InlineEdit);

        _get(Object.getPrototypeOf(InlineEdit.prototype), 'constructor', this).call(this, props);
        this.state = {
            editing: false,
            text: this.props.text,
            minLength: this.props.minLength || 1,
            maxLength: this.props.maxLength || 256,
            hasError: '',
            helpText: ''
        };
        this.helpText = this.props.errorText;
        if (this.props.validate) this.isInputValid = this.props.validate;else this.helpText = 'Text length must be between ' + this.state.minLength + ' and ' + this.state.maxLength;
    }

    _createClass(InlineEdit, [{
        key: 'startEditing',
        value: function startEditing() {
            this.setState({ editing: true, text: this.props.text });
        }
    }, {
        key: 'finishEditing',
        value: function finishEditing(event) {
            if (event) event.preventDefault();
            if (this.props.text === this.state.text) {
                this.cancelEditing();
            } else if (!this.isInputValid(this.state.text)) {
                this.setState({
                    hasError: 'has-error',
                    helpText: this.helpText
                });
            } else {
                this.commitEditing();
            }
        }
    }, {
        key: 'cancelEditing',
        value: function cancelEditing() {
            this.setState({ editing: false, text: this.props.text });
        }
    }, {
        key: 'commitEditing',
        value: function commitEditing() {
            this.setState({ editing: false, text: this.state.text });
            this.props.change(this.state.text);
        }
    }, {
        key: 'isInputValid',
        value: function isInputValid(text) {
            return text.length >= this.state.minLength && text.length <= this.state.maxLength;
        }
    }, {
        key: 'keyDown',
        value: function keyDown(event) {
            if (event.keyCode === 13) {
                this.finishEditing();
            } else if (event.keyCode === 27) {
                this.cancelEditing();
            }
        }
    }, {
        key: 'textChanged',
        value: function textChanged(event) {
            this.setState({
                helpText: '',
                hasError: '',
                text: event.target.value.trim()
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var inputElem = _react2['default'].findDOMNode(this.refs.input);
            if (this.state.editing && !prevState.editing) {
                inputElem.focus();
                SelectInputText(inputElem);
            } else if (this.state.editing && prevProps.text != this.props.text) {
                this.finishEditing();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.editing) {
                return _react2['default'].createElement(
                    'span',
                    { className: this.props.className, onClick: this.startEditing.bind(this), style: { fontStyle: "italic" } },
                    this.state.text || this.props.placeholder
                );
            } else {
                var _Element = this.props.element || 'input';
                return _react2['default'].createElement(
                    'form',
                    { className: "form-inline " + this.props.className, onSubmit: this.finishEditing.bind(this) },
                    _react2['default'].createElement(
                        'div',
                        { className: "form-group " + this.state.hasError },
                        _react2['default'].createElement(_Element, { className: this.props.activeClassName, onKeyDown: this.keyDown.bind(this), onBlur: this.finishEditing.bind(this), ref: 'input', placeholder: this.props.placeholder, defaultValue: this.state.text, onChange: this.textChanged.bind(this), onReturn: this.finishEditing.bind(this) }),
                        _react2['default'].createElement(
                            'span',
                            { className: 'help-block' },
                            this.state.helpText
                        )
                    ),
                    ' ',
                    _react2['default'].createElement(
                        'div',
                        { className: 'form-group', style: { verticalAlign: "top" } },
                        _react2['default'].createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-primary' },
                            _react2['default'].createElement('i', { className: 'fa fa-check' })
                        ),
                        ' ',
                        _react2['default'].createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', onClick: this.cancelEditing.bind(this) },
                            _react2['default'].createElement('i', { className: 'fa fa-close' })
                        )
                    )
                );
            }
        }
    }]);

    return InlineEdit;
})(_react2['default'].Component);

InlineEdit.propTypes = {
    text: _react2['default'].PropTypes.string.isRequired,
    className: _react2['default'].PropTypes.string,
    change: _react2['default'].PropTypes.func.isRequired,
    placeholder: _react2['default'].PropTypes.string,
    activeClassName: _react2['default'].PropTypes.string,
    minLength: _react2['default'].PropTypes.number,
    maxLength: _react2['default'].PropTypes.number,
    validate: _react2['default'].PropTypes.func,
    element: _react2['default'].PropTypes.string,
    errorText: _react2['default'].PropTypes.string
};

exports['default'] = InlineEdit;
module.exports = exports['default'];

},{"react":"react"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesNavbarStore = require('../stores/NavbarStore');

var _storesNavbarStore2 = _interopRequireDefault(_storesNavbarStore);

var _actionsNavbarActions = require('../actions/NavbarActions');

var _actionsNavbarActions2 = _interopRequireDefault(_actionsNavbarActions);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var _storesHomeStore = require('../stores/HomeStore');

var _storesHomeStore2 = _interopRequireDefault(_storesHomeStore);

var _storesAuthStore = require('../stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _actionsAuthActions = require('../actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var _reactRouterActiveComponent = require('react-router-active-component');

var _reactRouterActiveComponent2 = _interopRequireDefault(_reactRouterActiveComponent);

function getStateFromStores() {
  return {
    navbar: _storesNavbarStore2['default'].getState(),
    loggedIn: _storesAuthStore2['default'].getState().loggedIn
  };
}

var Navbar = (function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    _get(Object.getPrototypeOf(Navbar.prototype), 'constructor', this).call(this, props);
    this.state = getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesNavbarStore2['default'].listen(this.onChange);
      _storesAuthStore2['default'].listen(this.onChange);

      var socket = io.connect({
        transports: ['websocket']
      });

      socket.on('onlineUsers', function (data) {
        _actionsNavbarActions2['default'].updateOnlineUsers(data);
      });

      $(document).ajaxStart(function () {
        _actionsNavbarActions2['default'].updateAjaxAnimation('fadeIn');
      });

      $(document).ajaxComplete(function () {
        setTimeout(function () {
          _actionsNavbarActions2['default'].updateAjaxAnimation('fadeOut');
        }, 750);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesNavbarStore2['default'].unlisten(this.onChange);
      _storesAuthStore2['default'].listen(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(getStateFromStores());
    }
  }, {
    key: 'logout',
    value: function logout(event) {
      _actionsAuthActions2['default'].logout({ router: this.context.router });
    }
  }, {
    key: 'render',
    value: function render() {

      var loggedIn = "";
      var NavLink = (0, _reactRouterActiveComponent2['default'])('li');
      var links = "";

      if (this.state.loggedIn) {
        loggedIn = _react2['default'].createElement(
          'p',
          { style: { marginRight: 15 }, className: 'navbar-text navbar-right' },
          _react2['default'].createElement(
            'a',
            { onClick: this.logout.bind(this), className: 'navbar-link' },
            'Logout'
          )
        );
        links = _react2['default'].createElement(
          'ul',
          { className: 'nav navbar-nav' },
          _react2['default'].createElement(
            NavLink,
            { to: '/' },
            'Home'
          ),
          _react2['default'].createElement(
            NavLink,
            { to: '/plants' },
            'Plants'
          ),
          _react2['default'].createElement(
            NavLink,
            { to: '/addPlant' },
            'Add a Sensor'
          ),
          _react2['default'].createElement(
            NavLink,
            { to: '/profile' },
            'Profile'
          ),
          _react2['default'].createElement(
            NavLink,
            { to: '/feedback' },
            'Feedback'
          )
        );
      } else {
        loggedIn = _react2['default'].createElement(
          'p',
          { style: { marginRight: 15 }, className: 'navbar-text navbar-right' },
          _react2['default'].createElement(
            'a',
            { href: '/auth', className: 'navbar-link' },
            'Sign In'
          )
        );
        links = _react2['default'].createElement(
          'ul',
          { className: 'nav navbar-nav' },
          _react2['default'].createElement(
            NavLink,
            { to: '/' },
            'Home'
          ),
          _react2['default'].createElement(
            NavLink,
            { to: '/feedback' },
            'Feedback'
          )
        );
      }

      return _react2['default'].createElement(
        'nav',
        { className: 'navbar navbar-default navbar-static-top' },
        _react2['default'].createElement(
          'div',
          { className: 'navbar-header' },
          _react2['default'].createElement(
            'button',
            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar' },
            _react2['default'].createElement(
              'span',
              { className: 'sr-only' },
              'Toggle navigation'
            ),
            _react2['default'].createElement('span', { className: 'icon-bar' }),
            _react2['default'].createElement('span', { className: 'icon-bar' }),
            _react2['default'].createElement('span', { className: 'icon-bar' })
          ),
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: '/', className: 'navbar-brand' },
            _react2['default'].createElement(
              'span',
              { ref: 'triangles', className: 'triangles animated ' + this.state.ajaxAnimationClass },
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri' }),
              _react2['default'].createElement('div', { className: 'tri invert' }),
              _react2['default'].createElement('div', { className: 'tri' }),
              _react2['default'].createElement('div', { className: 'tri invert' })
            ),
            _react2['default'].createElement('img', { alt: 'Plant Minder', src: '/img/plant_minder_logo.png', style: { height: 38, marginTop: -11 } }),
            _react2['default'].createElement(
              'span',
              { className: 'badge badge-up badge-danger' },
              this.state.onlineUsers
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { id: 'navbar', className: 'navbar-collapse collapse' },
          links,
          loggedIn
        )
      );
    }
  }]);

  return Navbar;
})(_react2['default'].Component);

Navbar.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = Navbar;
module.exports = exports['default'];

},{"../actions/AuthActions":2,"../actions/HomeActions":4,"../actions/NavbarActions":5,"../stores/AuthStore":31,"../stores/HomeStore":33,"../stores/NavbarStore":34,"react":"react","react-router":"react-router","react-router-active-component":"react-router-active-component"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesPlantStore = require('../stores/PlantStore');

var _storesPlantStore2 = _interopRequireDefault(_storesPlantStore);

var _actionsPlantActions = require('../actions/PlantActions');

var _actionsPlantActions2 = _interopRequireDefault(_actionsPlantActions);

var _actionsPlantsActions = require('../actions/PlantsActions');

var _actionsPlantsActions2 = _interopRequireDefault(_actionsPlantsActions);

var _underscore = require('underscore');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var Plant = (function (_React$Component) {
  _inherits(Plant, _React$Component);

  function Plant(props) {
    var _this = this;

    _classCallCheck(this, Plant);

    _get(Object.getPrototypeOf(Plant.prototype), 'constructor', this).call(this, props);
    this.plant = (0, _underscore.find)(props.plants, function (plant) {
      return plant.device.uuid == _this.props.params.id;
    });
    this.filler = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTFjMTY2NzVkMSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1MWMxNjY3NWQxIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4=";
    this.state = _storesPlantStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Plant, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesPlantStore2['default'].listen(this.onChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.plant = (0, _underscore.findWhere)(nextProps.plants, function (plant) {
        return plant.device.uuid == _this2.props.params.id;
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesPlantStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onDrop',
    value: function onDrop(files) {
      //Convert to bas64, resize, and then upload
      var self = this;
      var width = 200;
      var height = 200;
      files[0].convertToBase64(function (base64) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        $("<img/>").attr("src", base64).load(function () {
          context.scale(width / this.width, height / this.height);
          context.drawImage(this, 0, 0);
          _actionsPlantsActions2['default'].uploadImage(self.props.location, self.plant, canvas.toDataURL());
        });
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2['default'].createElement(
        'div',
        { className: 'row' },
        _react2['default'].createElement(
          'div',
          { className: 'col-sm-3' },
          _react2['default'].createElement(
            _reactDropzone2['default'],
            { className: 'imageDropZone', activeClassName: 'imageDropZoneActive', onDrop: this.onDrop.bind(this), accept: 'image/*', multiple: false },
            _react2['default'].createElement('img', { draggable: 'false', src: this.plant.image ? this.plant.image : this.filler, className: 'img-thumbnail img-responsive' })
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-sm-7' },
          _react2['default'].createElement(
            'p',
            null,
            'Name: ',
            this.plant.name
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Type: ',
            this.plant.type
          )
        )
      );
    }
  }]);

  return Plant;
})(_react2['default'].Component);

exports['default'] = Plant;
module.exports = exports['default'];

},{"../actions/PlantActions":6,"../actions/PlantsActions":7,"../stores/PlantStore":35,"react":"react","react-dropzone":39,"underscore":"underscore"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

//var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var PlantList = (function (_React$Component) {
  _inherits(PlantList, _React$Component);

  function PlantList(props) {
    _classCallCheck(this, PlantList);

    _get(Object.getPrototypeOf(PlantList.prototype), 'constructor', this).call(this, props);
  }

  _createClass(PlantList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //FooterStore.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      //FooterStore.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var filler = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTFjMTY2NzVkMSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1MWMxNjY3NWQxIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4=";

      var plants = this.props.plants.map(function (plant, index) {
        return _react2['default'].createElement(
          _reactRouter.Link,
          { to: '/plant/:id', key: plant._id, params: { id: plant.device.uuid }, className: 'list-group-item' },
          _react2['default'].createElement(
            'div',
            { className: 'row' },
            _react2['default'].createElement(
              'div',
              { className: 'col-xs-3' },
              _react2['default'].createElement('img', { src: plant.image ? plant.image : filler, className: 'img-thumbnail img-responsive' })
            ),
            _react2['default'].createElement(
              'div',
              { className: 'col-xs-9' },
              _react2['default'].createElement(
                'h4',
                { className: 'list-group-item-heading' },
                plant.name
              ),
              _react2['default'].createElement(
                'p',
                { className: 'list-group-item-text' },
                'Type: ',
                plant.type
              ),
              _react2['default'].createElement(
                'p',
                { className: 'list-group-item-text' },
                'Device: ',
                plant.device.uuid
              )
            )
          )
        );
      });

      return _react2['default'].createElement(
        'div',
        { classNam: 'list-group' },
        plants
      );
    }
  }]);

  return PlantList;
})(_react2['default'].Component);

exports['default'] = PlantList;
module.exports = exports['default'];

},{"react":"react","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesPlantsStore = require('../stores/PlantsStore');

var _storesPlantsStore2 = _interopRequireDefault(_storesPlantsStore);

var _actionsPlantsActions = require('../actions/PlantsActions');

var _actionsPlantsActions2 = _interopRequireDefault(_actionsPlantsActions);

var _reactRouterActiveComponent = require('react-router-active-component');

var _reactRouterActiveComponent2 = _interopRequireDefault(_reactRouterActiveComponent);

var Plants = (function (_React$Component) {
  _inherits(Plants, _React$Component);

  function Plants(props) {
    _classCallCheck(this, Plants);

    _get(Object.getPrototypeOf(Plants.prototype), 'constructor', this).call(this, props);
    this.state = _storesPlantsStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Plants, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesPlantsStore2['default'].listen(this.onChange);
      $(function () {
        _actionsPlantsActions2['default'].fetchPlants();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesPlantsStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var NavLink = (0, _reactRouterActiveComponent2['default'])('li');
      var locations = this.state.locations.map(function (location, index) {
        return _react2['default'].createElement(
          'li',
          { role: 'presentation', key: location._id, className: _this.state.currentLocation == location ? "active" : "" },
          _react2['default'].createElement(
            'a',
            { onClick: _actionsPlantsActions2['default'].setCurrentLocation.bind(_this, location) },
            location.name
          )
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-3' },
            _react2['default'].createElement(
              'h3',
              null,
              'Locations'
            ),
            _react2['default'].createElement(
              'ul',
              { className: 'nav nav-pills nav-stacked' },
              locations
            ),
            _react2['default'].createElement('br', null)
          ),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-9' },
            _react2['default'].createElement(
              'h3',
              null,
              'Your Plants'
            ),
            (function () {
              if (_this.state.locations.length > 0) return _react2['default'].createElement(_reactRouter.RouteHandler, { location: _this.state.currentLocation, plants: _this.state.currentLocation.plants });else return _react2['default'].createElement(
                'div',
                { className: 'thumbnail fadeInUp animated row' },
                _react2['default'].createElement(
                  'div',
                  { className: 'col-xs-12' },
                  _react2['default'].createElement(
                    'h4',
                    null,
                    'Loading Plants'
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'progress' },
                    _react2['default'].createElement(
                      'div',
                      { className: 'progress-bar progress-bar-striped active', role: 'progressbar', 'aria-valuenow': '100', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { width: "100%" } },
                      _react2['default'].createElement(
                        'span',
                        { className: 'sr-only' },
                        'In Progress'
                      )
                    )
                  )
                )
              );
            })()
          )
        )
      );
    }
  }]);

  return Plants;
})(_react2['default'].Component);

exports['default'] = Plants;
module.exports = exports['default'];

},{"../actions/PlantsActions":7,"../stores/PlantsStore":36,"react":"react","react-router":"react-router","react-router-active-component":"react-router-active-component"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _storesProfileStore = require('../stores/ProfileStore');

var _storesProfileStore2 = _interopRequireDefault(_storesProfileStore);

var _actionsProfileActions = require('../actions/ProfileActions');

var _actionsProfileActions2 = _interopRequireDefault(_actionsProfileActions);

var _reactRouterActiveComponent = require('react-router-active-component');

var _reactRouterActiveComponent2 = _interopRequireDefault(_reactRouterActiveComponent);

var Profile = (function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), 'constructor', this).call(this, props);
    this.state = _storesProfileStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Profile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesProfileStore2['default'].listen(this.onChange);
      $(function () {
        _actionsProfileActions2['default'].fetchUser();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesProfileStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var NavLink = (0, _reactRouterActiveComponent2['default'])('li');

      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-offset-3 col-sm-3' },
            _react2['default'].createElement(
              'h3',
              null,
              'Your Profile'
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-3' },
            _react2['default'].createElement(
              'ul',
              { className: 'nav nav-pills nav-stacked' },
              _react2['default'].createElement(
                NavLink,
                { to: '/profile' },
                'Overview'
              ),
              _react2['default'].createElement(
                NavLink,
                { to: '/profile/edit' },
                'Edit Profile'
              ),
              _react2['default'].createElement(
                NavLink,
                { to: '/profile/notifications' },
                'Notifications'
              )
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-9' },
            (function () {
              if (_this.state.user) return _react2['default'].createElement(_reactRouter.RouteHandler, { user: _this.state.user });else return _react2['default'].createElement(
                'div',
                { className: 'thumbnail fadeInUp animated row' },
                _react2['default'].createElement(
                  'div',
                  { className: 'col-xs-12' },
                  _react2['default'].createElement(
                    'h4',
                    null,
                    'Fetching Profile'
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'progress' },
                    _react2['default'].createElement(
                      'div',
                      { className: 'progress-bar progress-bar-striped active', role: 'progressbar', 'aria-valuenow': '100', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { width: "100%" } },
                      _react2['default'].createElement(
                        'span',
                        { className: 'sr-only' },
                        'In Progress'
                      )
                    )
                  )
                )
              );
            })()
          )
        )
      );
    }
  }]);

  return Profile;
})(_react2['default'].Component);

exports['default'] = Profile;
module.exports = exports['default'];

},{"../actions/ProfileActions":8,"../stores/ProfileStore":37,"react":"react","react-router":"react-router","react-router-active-component":"react-router-active-component"}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _actionsProfileActions = require('../actions/ProfileActions');

var _actionsProfileActions2 = _interopRequireDefault(_actionsProfileActions);

var Profile = (function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Profile, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', null);
    }
  }]);

  return Profile;
})(_react2['default'].Component);

exports['default'] = Profile;
module.exports = exports['default'];

},{"../actions/ProfileActions":8,"react":"react","react-router":"react-router"}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _actionsProfileActions = require('../actions/ProfileActions');

var _actionsProfileActions2 = _interopRequireDefault(_actionsProfileActions);

var Profile = (function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Profile, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', null);
    }
  }]);

  return Profile;
})(_react2['default'].Component);

exports['default'] = Profile;
module.exports = exports['default'];

},{"../actions/ProfileActions":8,"react":"react","react-router":"react-router"}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _actionsProfileActions = require('../actions/ProfileActions');

var _actionsProfileActions2 = _interopRequireDefault(_actionsProfileActions);

var _InlineEdit = require('./InlineEdit');

var _InlineEdit2 = _interopRequireDefault(_InlineEdit);

var Profile = (function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    _get(Object.getPrototypeOf(Profile.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Profile, [{
    key: 'validateEmail',
    value: function validateEmail(email) {
      return email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'row' },
        _react2['default'].createElement(
          'div',
          { className: 'col-sm-6' },
          _react2['default'].createElement(
            'div',
            { className: 'panel panel-default' },
            _react2['default'].createElement(
              'div',
              { className: 'panel-heading' },
              'Profile'
            ),
            _react2['default'].createElement(
              'div',
              { className: 'panel-body' },
              'Email: ',
              _react2['default'].createElement(_InlineEdit2['default'], { className: 'pull-right', text: this.props.user.local.email || "", placeholder: 'Set an Email', validate: this.validateEmail, change: _actionsProfileActions2['default'].updateEmail, errorText: 'Please enter a valid email' }),
              'Password:'
            )
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'col-sm-6' },
          _react2['default'].createElement(
            'div',
            { className: 'panel panel-default' },
            _react2['default'].createElement(
              'div',
              { className: 'panel-heading' },
              'Linked Accounts'
            ),
            _react2['default'].createElement('div', { className: 'panel-body' })
          )
        )
      );
    }
  }]);

  return Profile;
})(_react2['default'].Component);

exports['default'] = Profile;
module.exports = exports['default'];

},{"../actions/ProfileActions":8,"./InlineEdit":17,"react":"react","react-router":"react-router"}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storesSignupStore = require('../stores/SignupStore');

var _storesSignupStore2 = _interopRequireDefault(_storesSignupStore);

var _actionsSignupActions = require('../actions/SignupActions');

var _actionsSignupActions2 = _interopRequireDefault(_actionsSignupActions);

var _underscore = require('underscore');

var Signup = (function (_React$Component) {
  _inherits(Signup, _React$Component);

  function Signup(props) {
    _classCallCheck(this, Signup);

    _get(Object.getPrototypeOf(Signup.prototype), 'constructor', this).call(this, props);
    this.state = _storesSignupStore2['default'].getState();
    this.onChange = this.onChange.bind(this);
  }

  _createClass(Signup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesSignupStore2['default'].listen(this.onChange);
    }
  }, {
    key: 'logOut',
    value: function logOut() {
      AuthAction.logOut();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesSignupStore2['default'].unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var email = this.state.email.trim();
      var password = this.state.password;

      if (!email) {
        _actionsSignupActions2['default'].invalidEmail();
        this.refs.emailTextField.getDOMNode().focus();
      }

      if (!password) {
        _actionsSignupActions2['default'].invalidPassword();
        this.refs.passwordTextField.getDOMNode().focus();
      }

      if (email && password) {
        _actionsSignupActions2['default'].signup({ router: this.context.router, token: this.state.token, email: email, password: password });
      }
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(event) {
      if (!this.state.email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) _actionsSignupActions2['default'].invalidEmail("Please enter a valid email address");
    }
  }, {
    key: 'validatePassword',
    value: function validatePassword(event) {
      if (this.state.password != this.state.confirmation) _actionsSignupActions2['default'].invalidConfirmation("Password and confirmation must match");
    }
  }, {
    key: 'checkPassStrength',
    value: function checkPassStrength() {
      var score = this.state.passwordScore;
      if (score > 80) return ["Strong", "success"];
      if (score > 60) return ["Good", "info"];
      if (score >= 30) return ["Weak", "warning"];

      return ["Invalid", "danger"];
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row flipInX animated' },
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-offset-1 col-sm-10' },
            _react2['default'].createElement(
              'div',
              { className: 'panel panel-default' },
              _react2['default'].createElement(
                'div',
                { className: 'panel-heading' },
                'Log In'
              ),
              _react2['default'].createElement(
                'div',
                { className: 'panel-body' },
                _react2['default'].createElement(
                  'form',
                  { onSubmit: this.handleSubmit.bind(this) },
                  _react2['default'].createElement(
                    'div',
                    { className: 'form-group ' + this.state.emailValidationState ? this.state.emailValidationState : '' },
                    _react2['default'].createElement(
                      'label',
                      { className: 'control-label' },
                      'Email'
                    ),
                    _react2['default'].createElement('input', { type: 'email', className: 'form-control', ref: 'emailTextField', value: this.state.email,
                      onChange: _actionsSignupActions2['default'].updateEmail, onBlur: this.validateEmail.bind(this), autoFocus: true }),
                    _react2['default'].createElement(
                      'span',
                      { className: 'help-block' },
                      this.state.emailHelpBlock
                    )
                  ),
                  _react2['default'].createElement(
                    'div',
                    { className: 'row' },
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-sm-8' },
                      _react2['default'].createElement(
                        'div',
                        { className: 'form-group ' + this.state.passwordValidationState ? this.state.passwordValidationState : '' },
                        _react2['default'].createElement(
                          'label',
                          { className: 'control-label' },
                          'Password'
                        ),
                        _react2['default'].createElement('input', { type: 'password', className: 'form-control', ref: 'passwordTextField', value: this.state.password,
                          onChange: _actionsSignupActions2['default'].updatePassword, onBlur: this.validatePassword.bind(this) }),
                        _react2['default'].createElement(
                          'span',
                          { className: 'help-block' },
                          this.state.passwordHelpBlock
                        )
                      ),
                      _react2['default'].createElement(
                        'div',
                        { className: 'form-group ' + this.state.confirmationValidationState ? this.state.confirmationValidationState : '' },
                        _react2['default'].createElement(
                          'label',
                          { className: 'control-label' },
                          'Password Confirmation'
                        ),
                        _react2['default'].createElement('input', { type: 'password', className: 'form-control', ref: 'passwordTextField', value: this.state.confirmation,
                          onChange: _actionsSignupActions2['default'].updateConfirmation, onBlur: this.validatePassword.bind(this) }),
                        _react2['default'].createElement(
                          'span',
                          { className: 'help-block' },
                          this.state.confirmationHelpBlock
                        )
                      )
                    ),
                    _react2['default'].createElement(
                      'div',
                      { className: 'col-sm-4' },
                      _react2['default'].createElement(
                        'h5',
                        null,
                        'Password Strength'
                      ),
                      _react2['default'].createElement(
                        'div',
                        { className: 'progress' },
                        _react2['default'].createElement('div', { className: 'progress-bar progress-bar-' + this.checkPassStrength()[1], role: 'progressbar', 'aria-valuenow': this.state.passwordScore, 'aria-valuemin': '0', 'aria-valuemax': '100', style: { width: this.state.passwordScore + "%" } })
                      ),
                      _react2['default'].createElement(
                        'span',
                        null,
                        this.checkPassStrength()[0]
                      )
                    )
                  ),
                  _react2['default'].createElement(
                    'button',
                    { type: 'submit', className: 'btn btn-primary' },
                    'Submit'
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Signup;
})(_react2['default'].Component);

Signup.contextTypes = {
  router: _react2['default'].PropTypes.func.isRequired
};

exports['default'] = Signup;
module.exports = exports['default'];

},{"../actions/SignupActions":9,"../stores/SignupStore":38,"react":"react","underscore":"underscore"}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * Guard the Component router handler with the given function.  If the function fails
 * (i.e. returns a falsey value) then redirect to the given state and parameters.
 *
 * @param fn The guard function, returning true (if the transition is allowed) or false if not
 * @param Component The React component used as the route handler
 * @param state The name of the state to redirect to if the guard fails
 * @param params Optional parameters for the redirect state
 * @returns {*}
 */
var guardRoute = function guardRoute(fn, Component, _ref) {
  var state = _ref.state;
  var _ref$params = _ref.params;
  var params = _ref$params === undefined ? {} : _ref$params;

  return (function (_React$Component) {
    _inherits(Authenticated, _React$Component);

    function Authenticated() {
      _classCallCheck(this, Authenticated);

      _get(Object.getPrototypeOf(Authenticated.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Authenticated, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(Component, this.props);
      }
    }], [{
      key: 'willTransitionTo',
      value: function willTransitionTo(transition, currentParams, currentQuery) {
        if (!fn(currentParams, currentQuery)) {
          var query = {
            oldPath: transition.path,
            oldQuery: currentQuery,
            oldParams: currentParams
          };
          transition.redirect(state, params, query);
        }
      }
    }]);

    return Authenticated;
  })(_react2['default'].Component);
};

/**
 * Asynchronously guard the Component router handler with the given function.  If the
 * function fails (i.e. the Promise resolves with a falsey value) then redirect to
 * the given state and parameters.
 *
 * @param fn The guard function, returning a Promise
 * @param Component The React component used as the route handler
 * @param state The name of the state to redirect to if the guard fails
 * @param params Optional parameters for the redirect state
 * @returns {*}
 */
var guardRouteAsync = function guardRouteAsync(fn, Component, _ref2) {
  var state = _ref2.state;
  var _ref2$params = _ref2.params;
  var params = _ref2$params === undefined ? {} : _ref2$params;

  return (function (_React$Component2) {
    _inherits(Authenticated, _React$Component2);

    function Authenticated() {
      _classCallCheck(this, Authenticated);

      _get(Object.getPrototypeOf(Authenticated.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Authenticated, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(Component, this.props);
      }
    }], [{
      key: 'willTransitionTo',
      value: function willTransitionTo(transition, currentParams, currentQuery, callback) {
        return fn(currentParams, currentQuery).then(function (result) {
          if (!result) {
            var query = {
              oldPath: transition.path,
              oldQuery: currentQuery,
              oldParams: currentParams
            };
            transition.redirect(state, params, query);
          }
          callback();
        });
      }
    }]);

    return Authenticated;
  })(_react2['default'].Component);
};

exports.GuardRoute = guardRoute;
exports.GuardRouteAsync = guardRouteAsync;

},{"react":"react"}],28:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _alt = require('./alt');

var _alt2 = _interopRequireDefault(_alt);

if (window.ReactGlobals.token) {
  localStorage.setItem('token', window.ReactGlobals.token);
}

File.prototype.convertToBase64 = function (callback) {
  var FR = new FileReader();
  FR.onload = function (e) {
    callback(e.target.result);
  };
  FR.readAsDataURL(this);
};

_alt2['default'].bootstrap(JSON.stringify({
  AuthStore: {
    token: localStorage.getItem('token') || '',
    status: localStorage.getItem('token') ? 'loggedIn' : 'loggedOut',
    loggedIn: localStorage.getItem('token') ? true : false
  }
}));

_reactRouter2['default'].run(_routes2['default'], _reactRouter2['default'].HistoryLocation, function (Handler) {
  _react2['default'].render(_react2['default'].createElement(Handler, null), document.getElementById('app'));
});

},{"./alt":10,"./routes":29,"react":"react","react-router":"react-router"}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _guards = require('./guards');

var _underscore = require('underscore');

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsHome = require('./components/Home');

var _componentsHome2 = _interopRequireDefault(_componentsHome);

var _componentsAuth = require('./components/Auth');

var _componentsAuth2 = _interopRequireDefault(_componentsAuth);

var _storesAuthStore = require('./stores/AuthStore');

var _storesAuthStore2 = _interopRequireDefault(_storesAuthStore);

var _componentsSignup = require('./components/Signup');

var _componentsSignup2 = _interopRequireDefault(_componentsSignup);

var _componentsPlants = require('./components/Plants');

var _componentsPlants2 = _interopRequireDefault(_componentsPlants);

var _componentsPlantList = require('./components/PlantList');

var _componentsPlantList2 = _interopRequireDefault(_componentsPlantList);

var _componentsPlant = require('./components/Plant');

var _componentsPlant2 = _interopRequireDefault(_componentsPlant);

var _componentsFeedback = require('./components/Feedback');

var _componentsFeedback2 = _interopRequireDefault(_componentsFeedback);

var _componentsProfile = require('./components/Profile');

var _componentsProfile2 = _interopRequireDefault(_componentsProfile);

var _componentsProfileOverview = require('./components/ProfileOverview');

var _componentsProfileOverview2 = _interopRequireDefault(_componentsProfileOverview);

var _componentsProfileEdit = require('./components/ProfileEdit');

var _componentsProfileEdit2 = _interopRequireDefault(_componentsProfileEdit);

var _componentsProfileNotifications = require('./components/ProfileNotifications');

var _componentsProfileNotifications2 = _interopRequireDefault(_componentsProfileNotifications);

var _componentsAddPlant = require('./components/AddPlant');

var _componentsAddPlant2 = _interopRequireDefault(_componentsAddPlant);

//Verify token here??

var requireAuth = _guards.GuardRoute.bind(undefined, function () {
  return _storesAuthStore2['default'].getState().loggedIn;
});

/* var isUserLoggedIn = GuardRouteAsync.bind(this, () => {
    console.log("Protected route!")
    let state = AuthStore.getState();
    if (state.loggedIn) return Promise.resolve(true);
    return $.ajax({
      url: '/api/auth/verifyToken',
      data: {token: state.token},
      method: "POST"
    }).then((data) => AuthStore.onRefreshTokenSuccess(data));
  });
*/

var routes = _react2['default'].createElement(
  _reactRouter.Route,
  { handler: _componentsApp2['default'], path: '/' },
  _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsHome2['default'] }),
  _react2['default'].createElement(
    _reactRouter.Route,
    { path: 'auth' },
    _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsAuth2['default'], name: 'auth' }),
    _react2['default'].createElement(_reactRouter.Route, { path: 'signup', handler: _componentsSignup2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: 'google/callback', handler: _componentsHome2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: 'facebook/callback', handler: _componentsHome2['default'] })
  ),
  _react2['default'].createElement(_reactRouter.Route, { path: 'addPlant', handler: _componentsAddPlant2['default'] }),
  _react2['default'].createElement(
    _reactRouter.Route,
    { path: 'plants', handler: _componentsPlants2['default'] },
    _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsPlantList2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: '/plant/:id', handler: _componentsPlant2['default'] })
  ),
  _react2['default'].createElement(
    _reactRouter.Route,
    { path: 'profile', handler: _componentsProfile2['default'] },
    _react2['default'].createElement(_reactRouter.DefaultRoute, { handler: _componentsProfileOverview2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: 'overview', handler: _componentsProfileEdit2['default'] }),
    _react2['default'].createElement(_reactRouter.Route, { path: 'notifications', handler: _componentsProfileNotifications2['default'] })
  ),
  _react2['default'].createElement(_reactRouter.Route, { path: 'feedback', handler: _componentsFeedback2['default'] })
);

exports['default'] = routes;
module.exports = exports['default'];

},{"./components/AddPlant":11,"./components/App":12,"./components/Auth":13,"./components/Feedback":14,"./components/Home":16,"./components/Plant":19,"./components/PlantList":20,"./components/Plants":21,"./components/Profile":22,"./components/ProfileEdit":23,"./components/ProfileNotifications":24,"./components/ProfileOverview":25,"./components/Signup":26,"./guards":27,"./stores/AuthStore":31,"react":"react","react-router":"react-router","underscore":"underscore"}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsAddPlantActions = require('../actions/AddPlantActions');

var _actionsAddPlantActions2 = _interopRequireDefault(_actionsAddPlantActions);

var _underscore = require('underscore');

var AddPlantStore = (function () {
  function AddPlantStore() {
    _classCallCheck(this, AddPlantStore);

    this.bindActions(_actionsAddPlantActions2['default']);
    this.sensorID = '';
    this.idValidationState = '';
    this.helpBlock = '';
  }

  _createClass(AddPlantStore, [{
    key: 'onUpdateId',
    value: function onUpdateId(event) {
      this.sensorID = event.target.value;
      this.idValidationState = '';
      this.helpBlock = '';
    }
  }, {
    key: 'onInvalidId',
    value: function onInvalidId() {
      this.idValidationState = 'has-error';
      this.helpBlock = 'Please enter a valid sensor ID';
    }
  }, {
    key: 'onAssociateSuccess',
    value: function onAssociateSuccess(payload) {
      //Redirect to our new plant!
      setTimeout(function () {
        //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
        payload.router.transitionTo('/plant/' + payload.id);
      }, 1000);
    }
  }, {
    key: 'onAssociateFail',
    value: function onAssociateFail(payload) {
      this.idValidationState = 'has-error';
      this.helpBlock = payload.errorMessage;
    }
  }]);

  return AddPlantStore;
})();

exports['default'] = _alt2['default'].createStore(AddPlantStore);
module.exports = exports['default'];

},{"../actions/AddPlantActions":1,"../alt":10,"underscore":"underscore"}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsAuthActions = require('../actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var AuthStore = (function () {
  function AuthStore() {
    _classCallCheck(this, AuthStore);

    this.bindActions(_actionsAuthActions2['default']);
    this.email = '';
    this.password = '';
    this.helpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
    this.token = this.token || null;
    this.loggedIn = this.loggedIn || false;
    this.status = this.status || 'loggedOut'; //['loggedOut', 'refreshingToken', 'fetchingToken', 'authError', 'loggedIn']
  }

  _createClass(AuthStore, [{
    key: 'onFetchingToken',
    value: function onFetchingToken() {
      this.status = 'fetchingToken';
    }
  }, {
    key: 'onAuthSuccess',
    value: function onAuthSuccess(payload) {
      this.nameValidationState = 'has-success';
      this.helpBlock = payload.message;
      this.token = payload.token;
      this.loggedIn = true;
      localStorage.setItem('token', payload.token);
      this.status = 'loggedIn';
      var query = payload.router.getCurrentQuery();
      setTimeout(function () {
        //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
        payload.router.transitionTo(query.oldPath || '/', query.oldParams, query.oldQuery);
      }, 1000);
    }
  }, {
    key: 'onAuthFail',
    value: function onAuthFail(payload) {
      this.status = 'authError';
      this.emailValidationState = 'has-error';
      this.passwordValidationState = 'has-error';
      this.helpBlock = payload.errorMessage;
    }
  }, {
    key: 'onLogout',
    value: function onLogout(payload) {
      this.token = '';
      this.loggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.status = 'loggedOut';
      setTimeout(function () {
        //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
        payload.router.transitionTo('/');
      }, 1000);
    }
  }, {
    key: 'onUpdateEmail',
    value: function onUpdateEmail(event) {
      this.email = event.target.value;
      this.emailValidationState = '';
      this.helpBlock = '';
    }
  }, {
    key: 'onUpdatePassword',
    value: function onUpdatePassword(event) {
      this.password = event.target.value;
      this.passwordValidationState = '';
    }
  }, {
    key: 'onInvalidEmail',
    value: function onInvalidEmail() {
      this.emailValidationState = 'has-error';
      this.helpBlock = 'Please enter a character name.';
    }
  }, {
    key: 'onInvalidPassword',
    value: function onInvalidPassword() {
      this.passwordValidationState = 'has-error';
      this.helpBlock = '';
    }
  }]);

  return AuthStore;
})();

exports['default'] = _alt2['default'].createStore(AuthStore);
module.exports = exports['default'];

},{"../actions/AuthActions":2,"../alt":10}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsFooterActions = require('../actions/FooterActions');

var _actionsFooterActions2 = _interopRequireDefault(_actionsFooterActions);

var FooterStore = function FooterStore() {
  _classCallCheck(this, FooterStore);

  this.bindActions(_actionsFooterActions2['default']);
};

exports['default'] = _alt2['default'].createStore(FooterStore);
module.exports = exports['default'];

},{"../actions/FooterActions":3,"../alt":10}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsHomeActions = require('../actions/HomeActions');

var _actionsHomeActions2 = _interopRequireDefault(_actionsHomeActions);

var HomeStore = function HomeStore() {
  _classCallCheck(this, HomeStore);

  this.bindActions(_actionsHomeActions2['default']);
};

exports['default'] = _alt2['default'].createStore(HomeStore);
module.exports = exports['default'];

},{"../actions/HomeActions":4,"../alt":10}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsNavbarActions = require('../actions/NavbarActions');

var _actionsNavbarActions2 = _interopRequireDefault(_actionsNavbarActions);

var NavbarStore = (function () {
  function NavbarStore() {
    _classCallCheck(this, NavbarStore);

    this.bindActions(_actionsNavbarActions2['default']);
    this.totalCharacters = 0;
    this.onlineUsers = 0;
    this.searchQuery = '';
    this.ajaxAnimationClass = '';
  }

  _createClass(NavbarStore, [{
    key: 'onFindCharacterSuccess',
    value: function onFindCharacterSuccess(payload) {
      payload.router.transitionTo('/characters/' + payload.characterId);
    }
  }, {
    key: 'onFindCharacterFail',
    value: function onFindCharacterFail(payload) {
      payload.searchForm.classList.add('shake');
      setTimeout(function () {
        payload.searchForm.classList.remove('shake');
      }, 1000);
    }
  }, {
    key: 'onUpdateOnlineUsers',
    value: function onUpdateOnlineUsers(data) {
      this.onlineUsers = data.onlineUsers;
    }
  }, {
    key: 'onUpdateAjaxAnimation',
    value: function onUpdateAjaxAnimation(className) {
      this.ajaxAnimationClass = className; //fadein or fadeout
    }
  }, {
    key: 'onUpdateSearchQuery',
    value: function onUpdateSearchQuery(event) {
      this.searchQuery = event.target.value;
    }
  }, {
    key: 'onGetCharacterCountSuccess',
    value: function onGetCharacterCountSuccess(data) {
      this.totalCharacters = data.count;
    }
  }, {
    key: 'onGetCharacterCountFail',
    value: function onGetCharacterCountFail(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return NavbarStore;
})();

exports['default'] = _alt2['default'].createStore(NavbarStore);
module.exports = exports['default'];

},{"../actions/NavbarActions":5,"../alt":10}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsPlantActions = require('../actions/PlantActions');

var _actionsPlantActions2 = _interopRequireDefault(_actionsPlantActions);

var _underscore = require('underscore');

var PlantStore = function PlantStore() {
  _classCallCheck(this, PlantStore);

  this.bindActions(_actionsPlantActions2['default']);
};

exports['default'] = _alt2['default'].createStore(PlantStore);
module.exports = exports['default'];

},{"../actions/PlantActions":6,"../alt":10,"underscore":"underscore"}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsPlantsActions = require('../actions/PlantsActions');

var _actionsPlantsActions2 = _interopRequireDefault(_actionsPlantsActions);

var _underscore = require('underscore');

var PlantsStore = (function () {
  function PlantsStore() {
    _classCallCheck(this, PlantsStore);

    this.bindActions(_actionsPlantsActions2['default']);
    this.locations = [];
    this.currentLocation = null;
    this.loadError = '';
  }

  _createClass(PlantsStore, [{
    key: 'onPlantsGathered',
    value: function onPlantsGathered(payload) {
      this.locations = payload.locations;
      this.currentLocation = this.locations[0];
    }
  }, {
    key: 'onPlantsDropped',
    value: function onPlantsDropped(err) {
      this.loadError = err.errorMessage;
    }
  }, {
    key: 'onSetCurrentLocation',
    value: function onSetCurrentLocation(location) {
      this.currentLocation = location;
    }
  }, {
    key: 'onImageUpdated',
    value: function onImageUpdated(payload) {
      var location = (0, _underscore.findWhere)(this.locations, { _id: payload.location._id });
      var plant = (0, _underscore.findIndex)(location.plants, { _id: payload.plant._id });
      location.plants[plant].image = payload.image;
    }
  }, {
    key: 'onImageFailed',
    value: function onImageFailed(err) {
      this.loadError = err.errorMessage;
    }
  }, {
    key: 'onPlantUpdateSuccess',
    value: function onPlantUpdateSuccess(payload) {
      var location = (0, _underscore.findWhere)(this.locations, { _id: payload.location._id });
      var plant = (0, _underscore.findIndex)(location.plants, { _id: payload.plant._id });

      payload.image = location.plants[plant].image;
      location.plants[plant] = payload.plant;
    }
  }, {
    key: 'onPlantUpdateFail',
    value: function onPlantUpdateFail(err) {
      this.loadError = err.errorMessage;
    }
  }]);

  return PlantsStore;
})();

exports['default'] = _alt2['default'].createStore(PlantsStore);
module.exports = exports['default'];

},{"../actions/PlantsActions":7,"../alt":10,"underscore":"underscore"}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsProfileActions = require('../actions/ProfileActions');

var _actionsProfileActions2 = _interopRequireDefault(_actionsProfileActions);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var ProfileStore = (function () {
  function ProfileStore() {
    _classCallCheck(this, ProfileStore);

    this.bindActions(_actionsProfileActions2['default']);
    this.user = null;
  }

  _createClass(ProfileStore, [{
    key: 'onUpdateUser',
    value: function onUpdateUser(payload) {
      if (this.user) this.deepExtend(this.user, payload.user);else this.user = payload.user;
    }
  }, {
    key: 'updateUserFail',
    value: function updateUserFail(err) {
      console.log(err.errorMessage);
    }
  }, {
    key: 'deepExtend',
    value: function deepExtend(obj) {
      var self = this;
      var parentRE = /#{\s*?_\s*?}/,
          slice = Array.prototype.slice;

      _underscore2['default'].each(slice.call(arguments, 1), function (source) {
        for (var prop in source) {
          if (_underscore2['default'].isUndefined(obj[prop]) || _underscore2['default'].isFunction(obj[prop]) || _underscore2['default'].isNull(source[prop]) || _underscore2['default'].isDate(source[prop])) {
            obj[prop] = source[prop];
          } else if (_underscore2['default'].isString(source[prop]) && parentRE.test(source[prop])) {
            if (_underscore2['default'].isString(obj[prop])) {
              obj[prop] = source[prop].replace(parentRE, obj[prop]);
            }
          } else if (_underscore2['default'].isArray(obj[prop]) || _underscore2['default'].isArray(source[prop])) {
            if (!_underscore2['default'].isArray(obj[prop]) || !_underscore2['default'].isArray(source[prop])) {
              throw new Error('Trying to combine an array with a non-array (' + prop + ')');
            } else {
              obj[prop] = _underscore2['default'].reject(self.deepExtend(_underscore2['default'].clone(obj[prop]), source[prop]), function (item) {
                return _underscore2['default'].isNull(item);
              });
            }
          } else if (_underscore2['default'].isObject(obj[prop]) || _underscore2['default'].isObject(source[prop])) {
            if (!_underscore2['default'].isObject(obj[prop]) || !_underscore2['default'].isObject(source[prop])) {
              throw new Error('Trying to combine an object with a non-object (' + prop + ')');
            } else {
              obj[prop] = self.deepExtend(_underscore2['default'].clone(obj[prop]), source[prop]);
            }
          } else {
            obj[prop] = source[prop];
          }
        }
      });
      return obj;
    }
  }]);

  return ProfileStore;
})();

exports['default'] = _alt2['default'].createStore(ProfileStore);
module.exports = exports['default'];

},{"../actions/ProfileActions":8,"../alt":10,"underscore":"underscore"}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _actionsSignupActions = require('../actions/SignupActions');

var _actionsSignupActions2 = _interopRequireDefault(_actionsSignupActions);

var _actionsAuthActions = require('../actions/AuthActions');

var _actionsAuthActions2 = _interopRequireDefault(_actionsAuthActions);

var SignupStore = (function () {
  function SignupStore() {
    _classCallCheck(this, SignupStore);

    this.bindActions(_actionsSignupActions2['default']);
    this.email = '';
    this.password = '';
    this.confirmation = '';
    this.emailHelpBlock = '';
    this.passwordHelpBlock = '';
    this.confirmationHelpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
    this.confirmationValidationState = '';
    this.passwordScore = 0;
  }

  _createClass(SignupStore, [{
    key: 'onSignupSuccess',
    value: function onSignupSuccess(payload) {
      this.nameValidationState = 'has-success';
      this.helpBlock = payload.message;
      _actionsAuthActions2['default'].authSuccess(payload);
      setTimeout(function () {
        //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
        payload.router.transitionTo('/', {}, {});
      }, 1000);
    }
  }, {
    key: 'onSignupFail',
    value: function onSignupFail(payload) {
      this.status = 'authError';
      this.emailValidationState = 'has-error';
      this.emailHelpBlock = payload.errorMessage;
    }
  }, {
    key: 'onUpdateEmail',
    value: function onUpdateEmail(event) {
      this.email = event.target.value;
      this.emailValidationState = '';
      this.emailHelpBlock = '';
    }
  }, {
    key: 'onUpdatePassword',
    value: function onUpdatePassword(event) {
      this.password = event.target.value;
      this.passwordValidationState = '';
      this.passwordHelpBlock = '';
      this.passwordScore = this.scorePassword(this.password);
    }
  }, {
    key: 'onUpdateConfirmation',
    value: function onUpdateConfirmation(event) {
      this.confirmation = event.target.value;
      this.confirmationValidationState = '';
      this.confirmationHelpBlock = '';
    }
  }, {
    key: 'onInvalidEmail',
    value: function onInvalidEmail(message) {
      this.emailValidationState = 'has-error';
      this.emailHelpBlock = message;
    }
  }, {
    key: 'onInvalidPassword',
    value: function onInvalidPassword(message) {
      this.passwordValidationState = 'has-error';
      this.passwordHelpBlock = message;
    }
  }, {
    key: 'onInvalidConfirmation',
    value: function onInvalidConfirmation(message) {
      this.confirmationValidationState = 'has-error';
      this.confirmationHelpBlock = message;
    }
  }, {
    key: 'scorePassword',
    value: function scorePassword(pass) {
      var score = 0;
      if (!pass) return score;

      // award every unique letter until 5 repetitions
      var letters = new Object();
      for (var i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
      }

      // bonus points for mixing it up
      var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass)
      };

      var variationCount = 0;
      for (var check in variations) {
        variationCount += variations[check] == true ? 1 : 0;
      }
      score += (variationCount - 1) * 10;

      return parseInt(score);
    }
  }]);

  return SignupStore;
})();

exports['default'] = _alt2['default'].createStore(SignupStore);
module.exports = exports['default'];

},{"../actions/AuthActions":2,"../actions/SignupActions":9,"../alt":10}],39:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var accept = require('attr-accept');

var Dropzone = React.createClass({
  displayName: 'Dropzone',

  getDefaultProps: function getDefaultProps() {
    return {
      disableClick: false,
      multiple: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      isDragActive: false
    };
  },

  propTypes: {
    onDrop: React.PropTypes.func,
    onDropAccepted: React.PropTypes.func,
    onDropRejected: React.PropTypes.func,
    onDragEnter: React.PropTypes.func,
    onDragLeave: React.PropTypes.func,

    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    rejectClassName: React.PropTypes.string,

    disableClick: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    accept: React.PropTypes.string
  },

  componentDidMount: function componentDidMount() {
    this.enterCounter = 0;
  },

  allFilesAccepted: function allFilesAccepted(files) {
    var _this = this;

    return files.every(function (file) {
      return accept(file, _this.props.accept);
    });
  },

  onDragEnter: function onDragEnter(e) {
    e.preventDefault();

    // Count the dropzone and any children that are entered.
    ++this.enterCounter;

    // This is tricky. During the drag even the dataTransfer.files is null
    // But Chrome implements some drag store, which is accesible via dataTransfer.items
    var dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];

    // Now we need to convert the DataTransferList to Array
    var itemsArray = Array.prototype.slice.call(dataTransferItems);
    var allFilesAccepted = this.allFilesAccepted(itemsArray);

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });

    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  },

  onDragOver: function onDragOver(e) {
    e.preventDefault();
  },

  onDragLeave: function onDragLeave(e) {
    e.preventDefault();

    // Only deactivate once the dropzone and all children was left.
    if (--this.enterCounter > 0) {
      return;
    }

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  },

  onDrop: function onDrop(e) {
    e.preventDefault();

    // Reset the counter along with the drag on a drop.
    this.enterCounter = 0;

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    var max = this.props.multiple ? droppedFiles.length : 1;
    var files = [];

    for (var i = 0; i < max; i++) {
      var file = droppedFiles[i];
      file.preview = URL.createObjectURL(file);
      files.push(file);
    }

    if (this.props.onDrop) {
      this.props.onDrop(files, e);
    }

    if (this.allFilesAccepted(files)) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted(files, e);
      }
    } else {
      if (this.props.onDropRejected) {
        this.props.onDropRejected(files, e);
      }
    }
  },

  onClick: function onClick() {
    if (!this.props.disableClick) {
      this.open();
    }
  },

  open: function open() {
    var fileInput = React.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  },

  render: function render() {

    var className;
    if (this.props.className) {
      className = this.props.className;
      if (this.state.isDragActive && this.props.activeClassName) {
        className += ' ' + this.props.activeClassName;
      };
      if (this.state.isDragReject && this.props.rejectClassName) {
        className += ' ' + this.props.rejectClassName;
      };
    };

    var style, activeStyle;
    if (this.props.style || this.props.activeStyle) {
      if (this.props.style) {
        style = this.props.style;
      }
      if (this.props.activeStyle) {
        activeStyle = this.props.activeStyle;
      }
    } else if (!className) {
      style = {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      };
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
    }

    var appliedStyle;
    if (activeStyle && this.state.isDragActive) {
      appliedStyle = _extends({}, style, activeStyle);
    } else {
      appliedStyle = _extends({}, style);
    };

    return React.createElement(
      'div',
      {
        className: className,
        style: appliedStyle,
        onClick: this.onClick,
        onDragEnter: this.onDragEnter,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDrop: this.onDrop
      },
      this.props.children,
      React.createElement('input', {
        type: 'file',
        ref: 'fileInput',
        style: { display: 'none' },
        multiple: this.props.multiple,
        accept: this.props.accept,
        onChange: this.onDrop
      })
    );
  }

});

module.exports = Dropzone;

},{"attr-accept":40,"react":"react"}],40:[function(require,module,exports){
module.exports=function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return t[e].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){"use strict";n.__esModule=!0,r(8),r(9),n["default"]=function(t,n){if(t&&n){var r=function(){var r=n.split(","),e=t.name||"",o=t.type||"",i=o.replace(/\/.*$/,"");return{v:r.some(function(t){var n=t.trim();return"."===n.charAt(0)?e.toLowerCase().endsWith(n.toLowerCase()):/\/\*$/.test(n)?i===n.replace(/\/.*$/,""):o===n})}}();if("object"==typeof r)return r.v}return!0},t.exports=n["default"]},function(t,n){var r=t.exports={version:"1.2.2"};"number"==typeof __e&&(__e=r)},function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){var e=r(2),o=r(1),i=r(4),u=r(19),c="prototype",f=function(t,n){return function(){return t.apply(n,arguments)}},s=function(t,n,r){var a,p,l,d,y=t&s.G,h=t&s.P,v=y?e:t&s.S?e[n]||(e[n]={}):(e[n]||{})[c],x=y?o:o[n]||(o[n]={});y&&(r=n);for(a in r)p=!(t&s.F)&&v&&a in v,l=(p?v:r)[a],d=t&s.B&&p?f(l,e):h&&"function"==typeof l?f(Function.call,l):l,v&&!p&&u(v,a,l),x[a]!=l&&i(x,a,d),h&&((x[c]||(x[c]={}))[a]=l)};e.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,t.exports=s},function(t,n,r){var e=r(5),o=r(18);t.exports=r(22)?function(t,n,r){return e.setDesc(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n,r){var e=r(20)("wks"),o=r(2).Symbol;t.exports=function(t){return e[t]||(e[t]=o&&o[t]||(o||r(6))("Symbol."+t))}},function(t,n,r){r(26),t.exports=r(1).Array.some},function(t,n,r){r(25),t.exports=r(1).String.endsWith},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,r){t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r(7)("match")]=!1,!"/./"[t](n)}catch(o){}}return!0}},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(16),o=r(11),i=r(7)("match");t.exports=function(t){var n;return e(t)&&(void 0!==(n=t[i])?!!n:"RegExp"==o(t))}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(2),o=r(4),i=r(6)("src"),u="toString",c=Function[u],f=(""+c).split(u);r(1).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,r,u){"function"==typeof r&&(o(r,i,t[n]?""+t[n]:f.join(String(n))),"name"in r||(r.name=n)),t===e?t[n]=r:(u||delete t[n],o(t,n,r))})(Function.prototype,u,function(){return"function"==typeof this&&this[i]||c.call(this)})},function(t,n,r){var e=r(2),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n,r){var e=r(17),o=r(13);t.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(o(t))}},function(t,n,r){t.exports=!r(15)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){"use strict";var e=r(3),o=r(24),i=r(21),u="endsWith",c=""[u];e(e.P+e.F*r(14)(u),"String",{endsWith:function(t){var n=i(this,t,u),r=arguments,e=r.length>1?r[1]:void 0,f=o(n.length),s=void 0===e?f:Math.min(o(e),f),a=String(t);return c?c.call(n,a,s):n.slice(s-a.length,s)===a}})},function(t,n,r){var e=r(5),o=r(3),i=r(1).Array||Array,u={},c=function(t,n){e.each.call(t.split(","),function(t){void 0==n&&t in i?u[t]=i[t]:t in[]&&(u[t]=r(12)(Function.call,[][t],n))})};c("pop,reverse,shift,keys,values,entries",1),c("indexOf,every,some,forEach,map,filter,find,findIndex,includes",3),c("join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill"),o(o.S,"Array",u)}]);
},{}]},{},[28]);
