import axios from 'axios'

export const BASE_URL = 'https://healthapp.online'

export const REQUESTTYPES = {
  POST: 'post',
  GET: 'get'
}

export class HttpRequest {
  constructor (url, requestType, body = undefined) {
    this.url = url
    this.requestType = requestType
    this.body = body
  }

  async makeRequest () {
    if (!!this.requestType || !!this.url) {
      throw Error('Request or URL cannot be empty')
    }

    if (this.requestType === REQUESTTYPES.POST && !!this.body) {
      throw Error('Post Request must have request body')
    }

    const responseObj = {
      data: undefined,
      error: false,
      message: undefined
    }

    try {
      let response
      switch (this.requestType) {
        case REQUESTTYPES.POST:
          response = await axios.post(this.url, this.body)
          break
        case REQUESTTYPES.GET:
          response = await axios.get(this.url)
          break
        default:
          throw Error('Request Type not supported')
      }
      return { ...responseObj, data: response.data, message: 'ok' }
    } catch (error) {
      return { ...responseObj, error: true, message: error.toString() }
    }
  }
}
