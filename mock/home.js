const data = require('./data.json');
const Mock = require('mockjs');

module.exports = [
  {
    url: '/home/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data,
      }
    }
  }
]
