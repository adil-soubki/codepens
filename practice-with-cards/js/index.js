//see http://www.greensock.com/draggable/ for more details.

var droppables     = $(".card");
var myTarget       = $(".play-trigger");
var overlapThreshold = "50%"; 

function onDrop(dragged, dropped) {
  TweenMax.fromTo(dropped, 0.1, {opacity:1}, {opacity:0, repeat:3, yoyo:true});
  console.log("dropped at x:" + this.x + " y:" + this.y);
}

Draggable.create(droppables, {
  zIndexBoost: false,
  cursor: "pointer",
  bounds: window,
  onPress: function() {
    console.log("drag started at x:" + this.x + " y:" + this.y);
  },
  onDrag: function(e) {
    if (this.hitTest(myTarget, overlapThreshold)) {
      myTarget.addClass("highlight");
    } else {
      myTarget.removeClass("highlight");
    }
  },
  onRelease: function(e) {
    if (this.hitTest(myTarget, overlapThreshold)) {
      onDrop(this.target, myTarget);
    }
    console.log("released at x:" + this.x + " y:" + this.y);
    TweenLite.to(this.target, 0.5, {x: 0, y: 0, ease: Bounce.easeOut});
  }
});