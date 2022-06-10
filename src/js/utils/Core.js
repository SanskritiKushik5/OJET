define([], function () {
  class CoreUtils {
    /**
     *
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
     * @description Generates an unique ID
     * @returns An unique ID based on a internal counter
     */
    generateUniqueId() {
      return `uid-${this.counter++}`;
    }
  }

  // creating instance
  const instance = new CoreUtils();
  return instance;
});
