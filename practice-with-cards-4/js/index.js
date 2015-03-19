//see http://www.greensock.com/draggable/ for more details.
var myTarget       = $(".play-trigger");
var overlapThreshold = "50%"; 
var draggableDefaults = {
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
    //Not triggering mouseout and still counting
    //as hovering if the mouse doesnt move after the drag ends.
    if (this.hitTest(myTarget, overlapThreshold)) {
      onDrop(this.target, myTarget);
    }
    console.log("released at x:" + this.x + " y:" + this.y);
    TweenMax.to(this.target, 0.5, {x: 0, y: 0, ease: Expo.easeOut});
  }
}


function onDrop(dragged, dropped) {
  TweenMax.fromTo(dropped, 0.1, {opacity:1}, {opacity:0, repeat:3, yoyo:true});
  console.log("dropped at x:" + this.x + " y:" + this.y);
}

Draggable.create($('.card'), draggableDefaults);

var card = {
  html: '<div class="card"><div class="front"></div><div class="back"></div></div>'
}

var hand = {
  hand: function() {
    return $('.hand');
  },
  cards: function() {
    return $('.card');
  },
  handSize: function() {
    return $('.hand .card').length;
  },
  fanningConstant: -3,
  fanningAngle: function(index) {
    var angle = Math.floor(hand.handSize()/2)*this.fanningConstant;
    return angle + this.fanningConstant*-index;
  },
  gutterConstant: 60,
  gutterWidth: function(index) {
    var gutter = Math.floor(hand.handSize()/2)*this.gutterConstant;
    return gutter + this.gutterConstant*-index;
  },
  flip: function($card) {
    TweenMax.to($card, 0, {rotationY: 180});
    $card.addClass('flipped');
  },
  layout: function() {
    hand.cards().each(function(index) {
      TweenMax.to($(this), 0, {rotation: hand.fanningAngle(index), left: hand.gutterWidth(index)});
    });
    TweenMax.to($('.front'), 0, {rotationY: 0});
    TweenMax.to($('.back'), 0, {rotationY: 180});
  },
  addCard: function() {
    this.hand().append(card.html);
    Draggable.create(this.cards().last(), draggableDefaults);
    this.layout();
  }
}

hand.cards().hover(function() {
  TweenMax.to(this, 0, {rotation: 0, scale: 1.5, y: -20});
  TweenMax.to(this, 3, {y: -30, ease: Expo.easeOut});
});

hand.cards().mouseout(function() {
  var index = hand.cards().index(this);
  TweenMax.to(this, 0.5, {rotation: hand.fanningAngle(index), y: 0});
  TweenMax.to(this, 0, {scale: 1});
});

hand.flip(hand.cards().eq(0));
hand.flip(hand.cards().eq(3));

// Initialize hand styles
hand.layout();

$('body').click(function() {
  //hand.addCard();
});