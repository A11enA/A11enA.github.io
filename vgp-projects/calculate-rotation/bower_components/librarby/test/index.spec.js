const
  expect = window.chai.expect;

/*
 * gamey() must take a map of factories containing a factory 
 * Function for a view and mediator per main app feature.
 */
const gamz = window.gamz;

describe('gamz', function() {

  describe('gamz', function() {
    it('gamz should return an Object with API numz and phyz', function() {
      expect(gamz).to.be.an('object');
      expect(gamz).to.have.keys(
        'numz',
        'phyz');
    });

    describe('gamz.phyz.makeBody()', function() {
      it('should return an Object with API body properties and template methods', function() {
        const body = gamz.phyz.makeBody('SomeBodyType');
        expect(body).to.be.an('object');
        expect(body.type).to.equal('SomeBodyType');

        // expect default values //
        expect(body.velocityX).to.equal(0);
        expect(body.velocityY).to.equal(0);
        expect(body.rotationalVelocity).to.equal(0);
        expect(body.integrity).to.equal(1);
        expect(body.density).to.equal(1);
        expect(body.volatility).to.equal(0);

        // expect template methods //
        expect(body.update).to.be.a('function');
        expect(body.handleCollision).to.be.a('function');
      });
    });
    
    describe('gamz.phyz.getDistance()', function() {
      it('should return the distance between two points', function() {
        const 
          pointA = { x: 2, y: 8 },
          pointB = { x: 7, y: 2 };
          
        expect(gamz.phyz.getDistance(pointA, pointB)).to.equal(7.810249675906654);
        expect(gamz.phyz.getDistance({ x: -1, y: 8 }, { x: 4, y: 2 })).to.equal(7.810249675906654);
      });
    });
    
    // it('should have correct API', function () {
    //   expect(app).to.have.keys(
    //     'canvas',
    //     'stage',

    //     'view',
    //     'hud',

    //     'setState',
    //     'getStateName',

    //     'lobby',
    //     'play',
    //     'pause',
    //     'end',

    //     'addUpdateable',
    //     'removeUpdateable',
    //     'getNumberUpdateables',
    //     'update',

    //     'setDebug',
    //     'getDebug');
    // });
  });

});
