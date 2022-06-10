/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Singleton to store global methods.
 */
define([], function () {
  class CoreUtils {
    /**
     * @description A singleton to hold the variable we want to increment across all the viewModels.
     * generates an unique id by calling the generateUniqueId method.
     * @returns The existing instance, if not created it creates it, otherwise it will always return the existing one.
     */
    constructor() {
      if (!CoreUtils.instance) {
        this.counter = 0;
        CoreUtils.instance = this;
      }
      return CoreUtils.instance;
    }

    /**
     * @function generateUniqueId
     * @description Generates an unique ID.
     * @returns An unique ID based on a internal counter.
     */
    generateUniqueId() {
      return `uid-${this.counter++}`;
    }

    checkValidationGroup(id) {
      const tracker = document.getElementById(id);
      if (tracker.valid === "valid") {
        return true;
      } else {
        // show messages on all the components that are invalidHiddden, i.e., the
        // required fields that the user has yet to fill out.
        tracker.showMessages();
        tracker.focusOn("@firstInvalidShown");
        return false;
      }
    }

    toastMessagePosition() {
      return {
        my: { vertical: "top", horizontal: "end" },
        at: { vertical: "top", horizontal: "end" },
        of: "window",
      };
    }

    getAutoTimeout() {
      return 8000;
    }
  }

  // creating instance
  const instance = new CoreUtils();
  return instance;
});
