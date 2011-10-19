$(function() {

  var $stage = $('.stage');
  var $offstage = $('.off-stage');
  var $slides = $offstage.find('.slide');
  var slide_count = $offstage.find('.slide').length;
  var current_slide = 0;

  $offstage.find('.slide').each(function(index, el) {
    $(this).data('index', index);
  });

  var decrement = function() {
    var prev = current_slide - 1;
    if (prev >= 0) {
      setSlide(prev, 'rev');
    }
  };

  var increment = function() {
    var next = current_slide + 1;
    if (next < slide_count) {
      setSlide(next, 'fwd');
    }
  };

  var setSlide = function (index, dir) {
    current_slide = index;
    if (dir !== 'none') {
      swapClasses(dir);
      return;
    }
    $stage.empty();
    setStage(-2, 'far-past');
    setStage(-1, 'past');
    setStage( 0, 'current');
    setStage( 1, 'future');
    setStage( 2, 'far-future');
  };

  var swapClasses = function (dir) {
    if (dir === 'fwd') {
      $stage.find('.far-past').remove();
      $stage.find('.past').removeClass('past').addClass('far-past');
      $stage.find('.current').removeClass('current').addClass('past');
      $stage.find('.future').removeClass('future').addClass('current');
      $stage.find('.far-future').removeClass('far-future').addClass('future');
      setStage(2, 'far-future');
    }
    else {
      $stage.find('.far-future').remove();
      $stage.find('.future').removeClass('.future').addClass('far-future');
      $stage.find('.current').removeClass('current').addClass('future');
      $stage.find('.past').removeClass('past').addClass('current');
      $stage.find('.far-past').removeClass('far-past').addClass('past');
      setStage(-2, 'far-past');
    }
  };

  var setStage = function (index, position) {
    index = current_slide + index;
    if (index >= 0 && index < slide_count) {
      $c = $($slides.get(index)).clone()
      $c.addClass(position)
      if (index === -2) {
        $stage.prepend($c);
      }
      else {
        $stage.append($c);
      }
    }
  }

  setSlide(0, 'none');

  $(document).keyup(function(event) {
    if (event.keyCode === 37) { // LEFT
      decrement();
    }
    if (event.keyCode === 39) { // RIGHT
      increment();
    }
  });
});
