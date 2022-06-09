/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define([
  "knockout",
  "ojs/ojinputtext",
  "ojs/ojinputnumber",
  "ojs/ojformlayout",
], function (ko) {
  function CustomerViewModel() {
    this.inputFirstNameValue = ko.observable(null);
    this.inputLastNameValue = ko.observable(null);
    this.inputFullNameValue = ko.observable(null);
    this.inputAgeValue = ko.observable(null);
    this.inputWeightValue = ko.observable(null);
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return CustomerViewModel;
});
