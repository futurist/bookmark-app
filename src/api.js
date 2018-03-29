const DEFAULT_HOST = process.env.API_HOST
  || 'https://rem-hqotdtkdbq.now.sh/api'
  || 'https://jamesjson.herokuapp.com/api'

class API {
  constructor ({host, headers}={}) {
    this.HOST = host || DEFAULT_HOST
    this.headers = Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, headers)
    // Set content-type is not allowed, if mode=no-cors
    // https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
  }
  
  fetch ({method='GET', path, data, headers}) {
    return fetch(
      this.HOST + path,
      {
        mode: 'cors',  // no-cors will prevent setting content-type
        method: method.toUpperCase(),
        body: JSON.stringify(data),
        credentials: 'include',
        redirect: 'follow',
        headers: this.headers
      }
    ).then(r => r.ok ? r.json() : Promise.reject(r))
  }

  get (path) {
    return this.fetch({path})
  }

  delete (path) {
    return this.fetch({method:'delete', path})
  }

  post (path, data) {
    return this.fetch({method:'post', path, data})
  }

  update (path, data) {
    return this.fetch({method:'put', path, data})
  }

}
export default new API()

