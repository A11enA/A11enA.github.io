(function (window, opspark, _) {
  const Proton = window.Proton;

  // create a namespace for the shield manager //
  _.set(
    opspark,
    "playa.shield",
    /**
     * Creates and returns the shield manager.
     */
    function (assets, fx, messenger) {
      const active = [],
        objects = [],
        pool = {
          active,
          objects,

          get: function () {
            if (objects.length > 0) {
              return objects.pop();
            }
            return makeObject();
          },

          recycle: function (object) {
            messenger.dispatch({
              type: "POOL",
              bodies: [object],
              source: "shield",
            });
            // remove object from the active Array //
            const i = active.indexOf(object);
            if (i > -1) {
              active.splice(i, 1);
            }

            // reset and pool the object off the stage //
            object.x = -object.width;
            object.alpha = 1;
            object.scaleX = object.scaleY = 1;
            objects.push(object);
          },
        },
        shieldManager = {
          getNumberActive() {
            return active.length;
          },
          spawn(number = 1) {
            const spawned = [];
            for (let i = 0; i < number; i++) {
              spawned.push(pool.get());
            }
            active.push(...spawned);
            messenger.dispatch({
              type: "SPAWN",
              bodies: spawned,
              source: "shield",
            });
            return this;
          },
        };

      function makeObject() {
        const shield = assets.makeshield();
        shield.handleCollision = handleCollision;
        return shield;
      }

      function handleCollision(impact, body) {
        // don't handle collisions between shields //
        console.log(1234);
        if (body.type === this.type) return;

        // if body.type is a "projectile" : destroy the shield, and apply powerup to the shooter
        // body.emitter is ship that shot/fired projectile
        if (body.type == "projectile" || body.type == "ship") {
          body.emitter.shield = true;
          setTimeout(function () {
            body.emitter.shield = false;
          }, 10000);
          this.integrity = 0;
        }

        /*
         * Because the explosion is async, the shield may exist
         * but have already exploded, so check first to see
         * if it has integrity before running check to exlode.
         */
        if (this.integrity >= 0) {
          console.log(impact);
          this.integrity -= impact;
          if (this.integrity <= 0) {
            fx.makeEmitter(2, 3, "rgba(214, 36, 84, 0.2)", null, [
              new Proton.RandomDrift(5, 0, 0.35),
            ]).emit({ x: this.x, y: this.y }, 0.5);
            pool.recycle(this);
            messenger.dispatch({
              type: "EXPLOSION",
              source: "shield",
              target: this,
              incoming: body,
            });
          }
        }
      }

      // return shield manager api //
      return shieldManager;
    }
  );
})(window, window.opspark, window._);
