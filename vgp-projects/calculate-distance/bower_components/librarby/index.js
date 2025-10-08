(function(window, _) {
  window.myLibraryName = window.myLibraryName || {
    numz: {

      calculateDistance(A, B){
      var leg1 = Math.abs(B.x - A.x);
      var leg2 = Math.abs(B.y - A.y);
      var uns = (leg1**2) + (leg2**2);
      var distance = uns ** (1/2);
      return distance
    }

    },
    phyz: {},
  };
}(window, window._));