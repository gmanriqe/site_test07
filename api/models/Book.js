/**
* Book.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'Book',
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      size: 200
    },
    page: 'integer',
    publishedAd: {
      type: 'date'
    }
  }
};

