'use strict';

describe('Directive: analyze', function () {

  // load the directive's module and view
  beforeEach(module('frontendApp'));
  beforeEach(module('app/analyze/analyze.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<analyze></analyze>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the analyze directive');
  }));
});