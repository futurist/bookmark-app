const DEFAULT_HOST = process.env.API_HOST || 'http://rem-rest-api.herokuapp.com'

class API {
  constructor (config={}) {
    this.HOST = config.host || DEFAULT_HOST
  }
  fetch ({path, options}) {
    return fetch(this.HOST + path, options)
      .then(res => res.json())
  }

  get (path) {
    return this.fetch({path})
  }
}
export default new API()
