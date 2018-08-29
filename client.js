const request = require('superagent')
const API_HOST = process.env.API_HOST || 'http://localhost'
const API_PORT = process.env.API_PORT || 8000
const API_ENDPOINT = `${API_HOST}:${API_PORT}`

const simpleRequest = function () {
    const data = {
        test: "test"
    };

    return request
        .post(`${API_ENDPOINT}/test`)
        .send(data) // sends a JSON post body
        .set('Content-Type', 'application/json')
        .then(response => {
            return {
                status: response.status,
                header: response.header,
                body: response.body
            }
        }, error => {
            return error
        })
}

module.exports = {
    simpleRequest
}
