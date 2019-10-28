$(document).ready(function () {

  $('.article__comments-button').click( () => {
    $('.article__comments-container').slideToggle('slow');
    $('.article__comment').focus();
  });

  let maxChar = 140;
  $(".article__comment").keyup(function() {
    $('.article__comment--counter').html((maxChar - $(this).val().length));
    $(this).val().length > 140 ? $('.article__comment--counter').css('color', 'red') : $('.article__comment--counter').css('color', '#545159');
  });

  // $(".article__comments-form").on('submit', function(event) {
  //   event.preventDefault();
  //   let commentBody = $(this).serialize();
  //   console.log(commentBody);
  //   if (!$('.article__comment').val()) {
  //     $('.article__error-message').html('&#9888; Empty Post! please enter some chars to post. &#9888;').show().delay(3000).fadeOut();
  //   }
  //   if ($('.article__comment').val().length > 140) {
  //     $('.article__error-message').html('&#9888; Too long! please respect our arbitrary limit of 140 chars. &#9888;').show().delay(3000).fadeOut();
  //   } else {
  //     $.ajax({
  //       method: "POST",
  //       url:"/viewArticle",
  //       data: commentBody
  //     })
  //     .then(loadComments);
  //   }
  // });

  /*const loadComments = () => {
    $.get("/viewArticle", function(res) {
      renderComments(res);
    })
  }

  const renderComments = function(articleReviews) {
    $(".review-container").empty();
    for (const articleReview of articleReviews) {
      let output = createArticleReview(articleReview);
      $('.review-container').prepend(output);
    }
  }


  const createArticleReview = function(articleReview) {
    let date = new Date(articleReview.created_at).toDateString();
    let $articleReviews = (`
    <article class="review">
      <header class="review-header">
        <h4 class= "review-username">${tweet.user.name}</h4>
      </header>
      <span class="review-body">${tweet.content.text}</span>
      <footer class="review-footer">
        <h4 class="review-timestamp">${date}</h4>
        <div class="review-icons">
          <a href="#"><i class="fa fa-flag"></i></a>
          <a href="#"><i class="fa fa-heart"></i></a>
          <a href="#"><i class="fa fa-refresh"></i></a>
        </div>
      </footer>
    </article>
    `);
    return articleReviews;
  };*/

})
