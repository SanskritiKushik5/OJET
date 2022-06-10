/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define([
  "ojs/ojtranslation",
  "knockout",
  "utils/Core",
  "ojs/ojasyncvalidator-length",
  "ojs/ojarraydataprovider",
  "ojs/ojinputtext",
  "ojs/ojinputnumber",
  "ojs/ojformlayout",
  "ojs/ojdatetimepicker",
  "ojs/ojselectsingle",
  "ojs/ojbutton",
  "ojs/ojvalidationgroup",
  "ojs/ojmessages",
], function (
  Translations,
  ko,
  CoreUtils,
  AsyncLengthValidator,
  ArrayDataProvider
) {
  const _t = Translations.getTranslatedString;
  function CustomerViewModel() {
    this._initAllIds();
    this._initAllLabels();
    this._initVariables();
    this._initAllObservables();
    this._initValidators();
    this.onInputFirstNameValueChange =
      this._onInputFirstNameValueChange.bind(this);
    this.onInputFirstNameRawValueChange =
      this._onInputFirstNameRawValueChange.bind(this);
    this.onInputWeightRawValueChange =
      this._onInputWeightRawValueChange.bind(this);
    this.onInputBirthdayValueChanged =
      this._onInputBirthdayValueChanged.bind(this);
    this.onInputCountryValueChanged =
      this._onInputCountryValueChanged.bind(this);

    this.onCreateButtonClick = this._onCreateButtonClick.bind(this);
    this.onResetButtonClick = this._onResetButtonClick.bind(this);
  }

  /**
   * @function _initAllIds
   * @description Initializes all ids.
   *
   */
  CustomerViewModel.prototype._initAllIds = function () {
    this.inputFirstNameId = CoreUtils.generateUniqueId();
    this.inputLastNameId = CoreUtils.generateUniqueId();
    this.inputFullNameId = CoreUtils.generateUniqueId();
    this.inputWeightId = CoreUtils.generateUniqueId();
    this.inputBirthdayId = CoreUtils.generateUniqueId();
    this.inputAgeId = CoreUtils.generateUniqueId();
    this.inputCountryId = CoreUtils.generateUniqueId();
    this.inputStateId = CoreUtils.generateUniqueId();
    // validation group
    this.formValidationGroupId = CoreUtils.generateUniqueId();
  };

  /**
   * @function _initAllLabels
   * @description Initializes all labels (Translations).
   *
   */
  CustomerViewModel.prototype._initAllLabels = function () {
    this.inputFirstNameLabel = _t("inputs.firstName");
    this.inputsLastNameLabel = _t("inputs.lastName");
    this.inputsFullNameLabel = _t("inputs.fullName");
    this.inputsWeightLabel = _t("inputs.weight");
    this.inputBirthdayLabel = _t("inputs.birthday");
    this.inputsAgeLabel = _t("inputs.age");
    this.inputCountryLabel = _t("inputs.country");
    this.inputStateLabel = _t("inputs.state");
    // buttons
    this.createButtonLabel = _t("buttons.create");
    this.resetButtonLabel = _t("buttons.reset");
  };

  /**
   * @function _initAllObservables
   * @description Initializes all the observable values.
   *
   */
  CustomerViewModel.prototype._initAllObservables = function () {
    this.inputFirstNameValue = ko.observable(null);
    this.inputLastNameValue = ko.observable(null);
    this.inputFullNameValue = ko.observable(null);
    this.inputWeightValue = ko.observable(null);
    this.inputBirthdayValue = ko.observable(null);
    this.inputAgeValue = ko.observable(null);
    this.inputCountryValue = ko.observable(null);
    this.inputStateValue = ko.observable(null);

    // messages custom
    this.inputWeightMessagesCustom = ko.observableArray([]);
    this.inputBirthdayMessagesCustom = ko.observableArray([
      this.birthdayMessage,
    ]);

    this.messagesDataprovider = ko.observable(new ArrayDataProvider([]));

    // disabled
    this.isInputLastNameDisabled = ko.observable(true);
    this.inputLastNameValue.subscribe(
      function (_) {
        this.inputFullNameValue(
          `${this.inputFirstNameValue()} ${this.inputLastNameValue()}`
        );
      }.bind(this)
    );

    this.isInputStateDisabled = ko.observable(true);

    // dataprovider
    this.inputCountryDataProvider = ko.observable(
      new ArrayDataProvider(
        [
          {
            value: 1,
            label: "Portugal",
          },
          {
            value: 2,
            label: "UK",
          },
        ],
        {
          keyAttributes: "value",
        }
      )
    );

    this.inputStateDataProvider = ko.observable(
      new ArrayDataProvider([], {
        keyAttributes: "value",
      })
    );
  };

  /**
   * @function _initValidators
   * @description Initializes all the validators.
   *
   */
  CustomerViewModel.prototype._initValidators = function () {
    this.inputFirstNameValidators = ko.observableArray([
      new AsyncLengthValidator({
        min: 2,
        max: 10,
        hint: {
          inRange: _t("validators.firstNameLengthHint", "{min}", "{max}"),
        },
        messageSummary: {
          tooLong: _t("validators.tooManyChars"),
          tooShort: _t("validators.tooManyChars"),
        },
        messageDetail: {
          tooLong: _t("validators.tooLong", "{max}"),
          tooShort: _t("validators.tooShort", "{min}"),
        },
      }),
    ]);
  };

  /**
   * @function _initVariables
   * @description Initializes all the variables.
   */
  CustomerViewModel.prototype._initVariables = function () {
    const minAgeValue = this._getBirthday(18);

    this.inputBirthdayMaxValue = minAgeValue;
    this.birthdayMessage = {
      detail: _t("messagesCustom.birthday"),
      summary: "",
      severity: "error",
    };

    this.messagesPosition = CoreUtils.toastMessagePosition();
  };

  /**
   * @function _onInputFirstNameValueChange
   * @description
   *
   */
  CustomerViewModel.prototype._onInputFirstNameValueChange = function (event) {
    const value = event.detail.value;
    if (value) {
      this.isInputLastNameDisabled(false);
      return;
    }
    this.isInputLastNameDisabled(true);
  };

  /**
   * @function _onInputFirstNameRawValueChange
   * @description
   *
   */
  CustomerViewModel.prototype._onInputFirstNameRawValueChange = function (
    event
  ) {
    if (event.detail.value) {
      event.currentTarget.validate();
    }
  };

  /**
   * @function _onInputWeightRawValueChange
   * @description
   *
   */
  CustomerViewModel.prototype._onInputWeightRawValueChange = function (event) {
    const value = event.detail.value;
    if (Number(value) < 40) {
      this.inputWeightMessagesCustom([
        {
          detail: _t("messagesCustom.weight"),
          summary: "",
          severity: "warning",
        },
      ]);
    }
  };

  /**
   * @function _onInputBirthdayValueChanged
   * @description
   *
   */
  CustomerViewModel.prototype._onInputBirthdayValueChanged = function (event) {
    const value = event.detail.value;
    if (value) {
      this.inputAgeValue(this._getAge(value));
      this.inputBirthdayMessagesCustom([]);
    } else {
      this.inputAgeValue(null);
      this.inputBirthdayMessagesCustom([this.birthdayMessage]);
    }
  };

  /**
   * @function _onInputCountryValueChanged
   * @description
   *
   */
  CustomerViewModel.prototype._onInputCountryValueChanged = function (event) {
    const value = event.detail.value;
    this.inputStateValue(null);
    if (value) {
      let statesArray;
      if (value === 1) {
        // portugal
        statesArray = [
          {
            value: 1,
            label: "Lisbon",
          },
          {
            value: 2,
            label: "Porto",
          },
        ];
      } else {
        statesArray = [
          {
            value: 1,
            label: "Manchester",
          },
          {
            value: 2,
            label: "Liverpool",
          },
        ];
      }

      this.isInputStateDisabled(false);
      this.inputStateDataProvider(
        new ArrayDataProvider(statesArray, {
          keyAttributes: "value",
        })
      );
    } else {
      this.isInputStateDisabled(true);
      this.inputStateDataProvider(
        new ArrayDataProvider([], {
          keyAttributes: "value",
        })
      );
    }
  };

  /**
   * @function _onCreateButtonClick
   * @description Executed when the user click the create button.
   */
  CustomerViewModel.prototype._onCreateButtonClick = function () {
    const valid = CoreUtils.checkValidationGroup(this.formValidationGroupId);
    if (valid) {
      this.messagesDataprovider(
        new ArrayDataProvider([
          {
            severity: "confirmation",
            detail: "Saved Successfully",
            timestamp: new Date().toISOString(),
            autoTimeout: CoreUtils.getAutoTimeout(),
          },
        ])
      );
    }
  };

  /**
   * @function _onResetButtonClick
   * @description Executed when the user click the reset button.
   */
  CustomerViewModel.prototype._onResetButtonClick = function () {
    this.inputFirstNameValue(null);
    this.inputLastNameValue(null);
    this.inputFullNameValue(null);
    this.inputWeightValue(null);
    this.inputBirthdayValue(null);
    this.inputAgeValue(null);
    this.inputCountryValue(null);
    this.inputStateValue(null);
  };

  /**
   * @function _getAge
   * @description Calculates the age based on ISOStrings
   * @param {ISOString} dateString ISOString from input date type
   * @returns {Number}
   */
  CustomerViewModel.prototype._getAge = function (dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 0 || age > 120) {
      // to fix bug as user type the first number of the year the input date sends as already done the change
      return null;
    }
    return age;
  };

  /**
   * @function _getBirthday
   * @description Calculates the birthday based on the age
   * @param {Number} age ISOString from input date type
   * @returns {Number}
   */
  CustomerViewModel.prototype._getBirthday = function (age) {
    const today = new Date();
    const year = today.getFullYear() - age;
    const birthday = new Date(
      year,
      today.getMonth(),
      today.getDate()
    ).toISOString();
    return birthday.split("T")[0];
  };

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return CustomerViewModel;
});
