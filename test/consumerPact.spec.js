const chai = require('chai')
const path = require('path')
const chaiAsPromised = require('chai-as-promised')
const pact = require('pact')
const expect = chai.expect
const API_PORT = 8000
const {
  simpleRequest
} = require('../client')
chai.use(chaiAsPromised)

const provider = pact({
  consumer: 'Consumer',
  provider: 'Provider',
  port: API_PORT,
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'warn',
  spec: 2
})

describe('Pact testing', () => {
  before(() => {
    return provider.setup()
  })

   describe('consumerPact spec test', () => {
    describe('and a request is called', () => {
      before(() => {
        return provider.addInteraction({
          uponReceiving: 'a request for data',
          withRequest: {
            method: 'POST',
            path: '/test',
            headers: {
              'Content-Type': 'application/json'
            },
            body: {
              test: "test"
            }
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': 'application/json;'
            },
            body: {
              test: "test"
            }
          }
        })
      })

      it('check payload from the provider', async (done) => {
        //Tests for API enpoints can be added here
        expect(simpleRequest()).to.eventually.have.property('status', 200)
        done()
      })

  it('should validate the interactions and create a contract', () => {
    return provider.verify()
  })
})
})

  // This will create contract pact file
  after(() => {
    return provider.finalize()
  })
})
