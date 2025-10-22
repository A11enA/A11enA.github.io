(function (window, _) {
  window.librarby = window.librarby || {
    numz: {
      calculateDistance(A, B) {
        var leg1 = Math.abs(B.x - A.x);
        var leg2 = Math.abs(B.y - A.y);
        var uns = leg1 ** 2 + leg2 ** 2;
        var distance = uns ** (1 / 2);
        return distance;
      },

      getAngleDegrees(pointA, pointB) {
        const distanceX = pointB.x - pointA.x;
        const distanceY = pointB.y - pointA.y;
        const radians = Math.atan2(distanceY, distanceX);
        const degrees = (radians * 180) / Math.PI;
        return degrees;
      },

      degreesToRadians(degrees) {
        return (degrees * Math.Pi) / 180;
      },

      radiansToDegrees(radians) {
        return (radians * 180) / Math.PI;
      },
    },
    phyz: {},
  };
})(window, window._);
