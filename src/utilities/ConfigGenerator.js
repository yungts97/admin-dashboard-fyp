import * as Constant from './Constant'
/**
 * Generates new HTTP Configuration Object
 * @param {string} method - The method used to call the endpoint GET, POST, PUT, DELETE.
 * @param {string} url - The URL of the endpoint. (e.g. "profile/")
 * @param {string} contentType - The Header content type to be used. (i.e. "Content-Type: application/x-www-form-urlencoded", "Content-Type: application/json")
 * @param {Object} data - The data to be passed into the HTTP Request body.
 * @param {string} token - The Authorization Token to be passed to the endpoint.
 * @param {string} params - Parameters to be passed to the endpoint.
 */
class Config {
  constructor (
    method,
    url,
    contentType,
    data = null,
    token = null,
    params = null
  ) {
    this.method = method
    this.url = url
    this.data = data ?? undefined
    this.timeout = 10 * 1000 // 10 seconds timeout if the server is responding
    this.params = params
    this.headers['Content-Type'] = contentType
    this.headers['Access-Control-Allow-Origin'] = '*'
    this.headers.Authorization = token ? ` Bearer ${token}` : null
  }

  baseURL = Constant.BASE_URL;
  headers = {
    Authorization: null
  };
}

export const LoginHttpRequestConfig = (email, password) => {
  // create an instance of form data
  const body = new FormData()
  body.append('username', email)
  body.append('password', password)

  return new Config(
    Constant.METHOD.POST,
    Constant.URL.LOGIN,
    Constant.CONTENT_TYPE.FORM,
    body
  )
}

export const SignUpHttpRequestConfig = (email, password) => {
  // create an instance of data
  const body = {
    email: email,
    password: password
  }

  return new Config(
    Constant.METHOD.POST,
    Constant.URL.SIGNUP,
    Constant.CONTENT_TYPE.JSON,
    body
  )
}

export const GetFoodsHttpRequestConfig = (skip) => {
  // create body for http request
  const params = {
    skip: skip
  }
  // assign method to http request config
  return new Config(
    Constant.METHOD.GET,
    Constant.URL.FOOD,
    Constant.CONTENT_TYPE.JSON,
    null,
    null,
    params
  )
}

export const GetUserDetailsMeHttpRequestConfig = (token) =>
  // assign method to http request config
  new Config(
    Constant.METHOD.GET,
    `${Constant.URL.USER}/me`,
    Constant.CONTENT_TYPE.JSON,
    null,
    token
  )
