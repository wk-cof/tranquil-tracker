/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
  res.json([
  {
  name : 'Calm Clinic',
  info : 'Resources for managing anxiety',
  url  : 'http://www.calmclinic.com/anxiety/coping'
  }, {
  name : 'Autism Speaks',
  info : 'Autism anxiety-related',
  url  : 'https://www.autismspeaks.org/blog/2014/05/29/managing-anxiety-children-autism'
  }
  ]);
};