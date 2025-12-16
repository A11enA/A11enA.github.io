(function (window, opspark, _) {
  const Proton = window.Proton,
    draw = opspark.draw,
    phyz = opspark.racket.physikz,
    numz = opspark.racket.num;

  /**
   * Takes a body and centers its x and y on the canvas.
   * @param {Object} asset: A body with an x and y property.
   * @param {Canvas} canvas: The HTML canvas element.
   */
  function centerOnStage(asset, canvas, level) {
    if (asset.type === "circular" || asset.radius) {
      asset.x = canvas.width / 2;
      asset.y = canvas.height / 2;
    } else {
      const bounds = asset.getBounds();
      asset.x = (canvas.width - bounds.width) / 2;
      asset.y = (canvas.height - bounds.width) / 2;
    }
  }

  function getProjectilePoint() {
    return this.localToGlobal(this.radius + 10, 0);
  }

  function getExhaustPoint() {
    return this.localToGlobal(-(this.radius + 10), 0);
  }

  /**
   * Creates an API at opspark.assets to
   * build and work with visual assets.
   *
   * @param {Object} canvas: The canvas on which the
   * game is drawn, used for incept positioning of assets.
   */
  _.set(opspark, "playa.assets", function (canvas, fx, level) {
    // ASSET BEHAVIORS //
    function updateShip(event) {
      phyz.updateVelocity(this, this.propulsion, this.propulsion);
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    function updateOrb(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    function updateInstaHeal(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    function updateMorePoints(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    function updateShield(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }
    function updateSuperSpeed(event) {
      phyz.updateVelocity(this, 0, 0);
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    function updateProjectile(impact) {
      phyz.reboundCircularAssetInArea(this, canvas);
    }

    /**
     * Each method draws and assembles the asset in a
     * default state, assigning its update method.
     */
    return {
      makeProjectile() {
        const projectile = _.extend(
          draw.circle(5, "#ff0000"),
          phyz.makeBody("projectile")
        );

        // TODO : get from settings JSON //
        projectile.volatility = 0.125;
        projectile.velocityMax = 10;
        projectile.update = updateProjectile;

        projectile.snapToPixel = true;
        projectile.cache(
          -projectile.radius,
          -projectile.radius,
          projectile.radius * 2,
          projectile.radius * 2
        );

        return projectile;
      },
      makeShip(color) {
        const radius = 25,
          ship = draw.rect(
            radius,
            radius,
            color,
            null,
            null,
            -(radius + radius / 10),
            -(radius / 2)
          );

        // continue to draw on the ship Shape to create our design //
        draw.circle(radius + 3, color, null, null, null, null, ship);
        draw.circle(radius, "#6f6f6fff", null, null, null, null, ship);
        draw.polyStar(radius, 3, 0, 0, color, null, null, null, null, ship);
        draw.circle(radius - 15, "#6f6f6fff", null, null, -5, null, ship);

        // reset the radius, other non-radii drawing operations have overwritten it //
        ship.radius = radius + 3;
        ship.color = color;

        // rasterize the vector graphic, basically creating a bitmap //
        ship.snapToPixel = true;
        ship.cache(
          -radius - 10,
          -radius - 10,
          radius * 2 + 15,
          radius * 2 + 15
        );

        // Merge the ship with your game libs makeBody()
        Object.assign(ship, phyz.makeBody("ship"));

        // give the ship a default propulsion //
        ship.propulsion = 0;

        // set a random rotation value //
        ship.rotation = numz.randomIntBetween(0, 359);

        // set the update behavior for the ship //
        ship.update = updateShip;

        /*
         * Returns the global position of where
         * we want the exhaust to show up. This
         * global point will be passed to the
         * partical manager, who'll create and
         * render the ship's exhaust.
         */
        ship.getExhaustPoint = getExhaustPoint;

        /*
         * Returns the global position from where
         * we want the projectile to launch. This
         * global point will be passed to the
         * projectile manager, who'll create and
         * render the ship's projectile.
         */
        ship.getProjectilePoint = getProjectilePoint;

        ship.explosion = fx.makeEmitter(
          5,
          8,
          null,
          new Proton.Velocity(
            new Proton.Span(4, 2),
            new Proton.Span(0, 360),
            "polar"
          ),
          [new Proton.RandomDrift(5, 0, 0.35)]
        );

        // randomized position within canvas //
        ship.x = numz.randomIntBetween(0, canvas.width);
        ship.y = numz.randomIntBetween(0, canvas.height);

        if (ship.x > canvas.width / 2) {
          ship.superSpeed = true;
        }

        return ship;
      },
      makeOrb() {
        const orb = draw.randomCircleInArea(canvas, false, true, "#999", 2);
        // console.log(`rad: ${orb.radius}`);
        // console.log(`den: ${orb.radius / 20 * 0.5}`);
        Object.assign(
          orb,
          phyz.makeBody("orb", {
            density: (orb.radius / 20) * 0.5,
            volatility: orb.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(orb, canvas);
        orb.update = updateOrb;

        // TODO: why is caching killing the cross on the orb?
        // rasterize the vector graphic, basically creating a bitmap //
        // orb.snapToPixel = true;
        // const rad = orb.radius + 2;
        // orb.cache(-rad, -rad, rad * 2, rad * 2);

        return orb;
      },
      makeSuperSpeed() {
        const radius = 15;
        const superSpeed = draw.circle(radius, "red");

        draw.circle(
          radius / 3,
          "yellow",
          null,
          null,
          null,
          null,
          superSpeed
        );

        // console.log(`rad: ${superSpeed.radius}`);
        // console.log(`den: ${superSpeed.radius / 20 * 0.5}`);
        Object.assign(
          superSpeed,
          phyz.makeBody("superSpeed", {
            density: (superSpeed.radius / 20) * 0.5,
            volatility: superSpeed.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(superSpeed, canvas);

        superSpeed.x = numz.randomIntBetween(0, canvas.width);
        superSpeed.y = numz.randomIntBetween(0, canvas.height);

        superSpeed.update = updateSuperSpeed;

        return superSpeed;
      },
      makeInstaHeal() {
        const radius = 15;
        const instaHeal = draw.circle(radius, "limegreen");

        draw.circle(radius / 3, "#0fff02ff", null, null, null, null, instaHeal);
        // console.log(`rad: ${instaHeal.radius}`);
        // console.log(`den: ${instaHeal.radius / 20 * 0.5}`);
        Object.assign(
          instaHeal,
          phyz.makeBody("instaHeal", {
            density: (instaHeal.radius / 20) * 0.5,
            volatility: instaHeal.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(instaHeal, canvas);

        instaHeal.x = numz.randomIntBetween(0, canvas.width);
        instaHeal.y = numz.randomIntBetween(0, canvas.height);

        instaHeal.update = updateInstaHeal;

        return instaHeal;
      },
      makeMorePoints() {
        const radius = 15;
        const morePoints = draw.circle(15, "grey");

        draw.circle(radius / 3, "red", null, null, null, null, morePoints);
        // console.log(`rad: ${morePoints.radius}`);
        // console.log(`den: ${morePoints.radius / 20 * 0.5}`);
        Object.assign(
          morePoints,
          phyz.makeBody("morePoints", {
            density: (morePoints.radius / 20) * 0.5,
            volatility: morePoints.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(morePoints, canvas);

        morePoints.x = numz.randomIntBetween(0, canvas.width);
        morePoints.y = numz.randomIntBetween(0, canvas.height);

        morePoints.update = updateMorePoints;

        return morePoints;
      },
      makeshield() {
        const radius = 15;
        const shield = draw.circle(15, "#0022ffff");

        draw.circle(radius / 3, "brown", null, null, null, null, shield);
        // console.log(`rad: ${shield.radius}`);
        // console.log(`den: ${shield.radius / 20 * 0.5}`);
        Object.assign(
          shield,
          phyz.makeBody("shield", {
            density: (shield.radius / 20) * 0.5,
            volatility: shield.radius * 0.0001,
          })
        );
        phyz.addRandomVelocity(shield, canvas);

        shield.x = numz.randomIntBetween(0, canvas.width);
        shield.y = numz.randomIntBetween(0, canvas.height);

        shield.update = updateShield;

        return shield;
      },
      centerOnStage,
    };
  });
})(window, window.opspark, window._);
