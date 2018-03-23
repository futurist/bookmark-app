const DEFAULT_HOST = process.env.API_HOST
  || 'http://rem-rest-api.herokuapp.com/api'

class API {
  constructor ({host, headers}={}) {
    this.HOST = host || DEFAULT_HOST
    this.headers = Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, headers)
  }
  
  fetch ({method='get', path, data, headers}) {
    return fetch(
      this.HOST + path,
      {
        mode: 'no-cors',
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

