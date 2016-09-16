$(document).ready(function(){

  // share links
  var url = window.location.href;

  var twitterShare = 'https://twitter.com/home?status=MS Subbulakshmi was more than a gifted classical singer. She was a rockstar in her own right. ' + url + ' via @htTweets';
  $('.twitter-share').attr('href', twitterShare);
  var facebookShare = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  $('.facebook-share').attr('href', facebookShare);

  var navBreak = 768;


  // change logo
  function mobileLogo(imgDesktop,imgMobile,win){
    if (win<navBreak){
      imgDesktop.hide();
      imgMobile.show();
    } else {
      imgDesktop.show();
      imgMobile.hide();
    }
  };
  mobileLogo($('.navbar-brand-desktop'),$('.navbar-brand-mobile'),$(window).width());
  $(window).resize(function(){
    mobileLogo($('.navbar-brand-desktop'),$('.navbar-brand-mobile'),$(window).width());
  });

});
