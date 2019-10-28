$(document).ready(function () {
  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });

  $('.filter-nav').hide();
  $('#btn-search').click(function() {
    $('.filter-nav').slideToggle(310);
});

  $('#all-btn').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    });
  });

  $('#all-outdoors').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Outdoors") {
      $( this ).hide();
     }
    });
  });
  $('#all-food').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Food") {
      $( this ).hide();
     }
    });
  });
    $('#all-household').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Household") {
      $( this ).hide();
     }
    });
  });

      $('#all-workplace').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Workplace") {
      $( this ).hide();
     }
    });
  });
      $('#all-personal').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Personal") {
      $( this ).hide();
     }
    });
  });
      $('#all-animals').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Animals") {
      $( this ).hide();
     }
    });
  });
      $('#all-fitness').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Fitness") {
      $( this ).hide();
     }
    });
  });
      $('#all-technology').click(function() {
        $('.item').each(function(i, obj) {
    let toCheck = $(obj).attr('datatopic');
    $( this ).show();
    if (toCheck != "Technology") {
      $( this ).hide();
     }
    });
  });
  let loadArticles = () => {
    const filter = $('.filter-gallery').data('filter')
    console.log(filter)
    $.get(filter, function(res){
    renderArticles(res);
    //  res = articles.articles;
    // console.log(res)
     // console.log(articles)
    resizeAllGridItems();
    })
  };

  // grid render
  let renderArticles = (articles) => {
    // resizeAllGridItems();
    // // articles = JSON.parse(articles)
    articles = articles.articles;
    $('.grid').empty();
    for (let article in articles){
      let output = createArticleTile(articles[article]);
      $('.grid').prepend(output);
      resizeAllGridItems();
      // console.log(articles[article])
      // console.log('test renderArticles:', article)
    }
      resizeAllGridItems();
  }


  // let renderArticles = (articles) => {
  //   $('.grid').empty();
  //   articles.forEach(function(obj){
  //     for (i in obj){
  //       let output = createArticleTile(article);
  //       $('.grid').prepend(output);
  //     }
  //   })
  // }

  let createArticleTile = function(article) {
    // console.log(article.topic);
    let date = new Date(article.post_date).toDateString();
    resizeAllGridItems();
    let $article = (`
    <div class="item blog" datatopic=${article.topic}>
      <div class="content" class="mask flex-center">
      <a class="item-a" method="GET" href="/viewArticle/${article.id}">
        <div class="title">
         <h3>${article.title}</h3>
      </div>
        <img src="${article.thumbnail}" class="photothumb">
      <div class="desc">
        <p>${article.description}</p>
      </div>
      <div class="article_link">
        <a class="item-url w3-button" target="_blank" href="${article.url}">Full Article</a>
      </div>
    </div>
    </a>
    `);
  return $article;
  };
  loadArticles();
  resizeAllGridItems();
    
})