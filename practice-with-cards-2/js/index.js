//see http://www.greensock.com/draggable/ for more details.
var $hand      = $('.hand');
var $cards     = $(".card");
var myTarget       = $(".play-trigger");
var overlapThreshold = "50%"; 

function onDrop(dragged, dropped) {
  TweenMax.fromTo(dropped, 0.1, {opacity:1}, {opacity:0, repeat:3, yoyo:true});
  console.log("dropped at x:" + this.x + " y:" + this.y);
}

Draggable.create($cards, {
  zIndexBoost: false,
  cursor: "pointer",
  bounds: window,
  onPress: function() {
    console.log("drag started at x:" + this.x + " y:" + this.y);
  },
  onDragSStart: function() {
    // <scale the card back down and instantiate drag physics>
  },
  onDrag: function(e) {
    if (this.hitTest(myTarget, overlapThreshold)) {
      myTarget.addClass("highlight");
    } else {
      myTarget.removeClass("highlight");
    }
    if (!this.hitTest($('.hand-wrapper'), overlapThreshold)) {
      this.endDrag();
    }
  },
  onRelease: function(e) {
    if (this.hitTest(myTarget, overlapThreshold)) {
      onDrop(this.target, myTarget);
    }
    console.log("released at x:" + this.x + " y:" + this.y);
    TweenLite.to(this.target, 0.5, {x: 0, y: 0, ease: Expo.easeOut});
  }
});
//
var hand = {
  cards: $cards,
  handSize: function() {
    return $('.hand .card').length;
  },
  fanningConstant: -3,
  fanningAngle: function(index) {
    var angle = Math.floor(hand.handSize()/2)*this.fanningConstant;
    return angle + this.fanningConstant*-index;
  }
}

hand.cards.hover(function() {
  TweenLite.to(this, 0, {rotation: 0, scale: 1.5, y: -20});
  TweenLite.to(this, 3, {y: -30, ease: Expo.easeOut});
});

hand.cards.mouseout(function() {
  var index = hand.cards.index(this);
  TweenLite.to(this, 0.5, {rotation: hand.fanningAngle(index), y: 0});
  TweenLite.to(this, 0, {scale: 1});
});