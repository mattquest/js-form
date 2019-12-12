import Axios from "axios"

// allow for use of already imported axios instance with custom options
if (!window.axios) {
  window.axios = Axios
}

class Form {
  /**
   *
   * @param {string} url form submit url
   * @param {{[string]:[string]}} fields field names and default values
   * @param {function} getErrors function to get errors messages from response
   */
  constructor(url, fields, getErrors = null) {
    this.url = url
    this.originalFields = { ...fields }
    this.fields = fields
    this.getErrors = getErrors
    this.errors = {}
    this.pending = false
  }

  async post() {
    return this.submit("post")
  }

  async get() {
    return this.submit("get")
  }

  async submit(method) {
    this._submitStart()
    const result = axios[method](this.url, this.fields)
    result.catch(r => {
      this._submitError(r)
    })
    result.then(() => {
      this._submitFinish()
    })
    return result
  }

  _submitStart() {
    this.pending = true
  }

  _submitFinish() {
    this.pending = false
  }

  _submitError(r) {
    if (this.getErrors) {
      this.errors = { ...this.getErrors(r) }
    }
    this.pending = false
  }

  resetStatus() {
    this.errors = {}
  }

  reset() {
    this.resetStatus()
    this.fields = { ...this.originalFields }
  }
}

export default Form
