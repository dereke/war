var expect = require('chai').expect;
var given = require('..');


describe('war', function(){
  it('executes steps sequentially', function(){
    var steps = [];
    return given('step one', function(){
      return new Promise(function(success){
        setTimeout(function(){
          steps.push('step one');
          success();
        }, 10);
      });
    }).when('step two', function(){
      steps.push('step two');
    }).then('step three', function(){
      steps.push('step three');
    }).then(function(){
      expect(steps).to.eql([
        'step one',
        'step two',
        'step three'  
      ]);
    });
  });
});
