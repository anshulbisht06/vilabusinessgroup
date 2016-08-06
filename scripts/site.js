$(document).ready(function(){
  $('div.sub.header').popup({hoverable: true});
  $('.ui.dropdown').dropdown({on: 'hover'});
  $('.ui.sticky').sticky({
    context: 'body'
  });
  var html = $('html,body');
  function scrollTo(sectionSelector){
    html.animate({
        scrollTop: (sectionSelector === ''? 10: $('#'+sectionSelector).offset().top-100)
      },'slow');
  }
  var menubar = $('#menubar'), menuItems = menubar.children(), menubar1 = $('#menubar1');
  // menuItems1 = menubar1.children();
  function changeSection(clickedMenuItemID){
    var sectionSelector = '';
    var menuItemsCopy = menuItems;
    // if(/^\d\d$/.test(clickedMenuItemID)){
    //   menuItemsCopy = menuItems1;
    // }
    menuItemsCopy.each(function(index, el) {
      if(index!==clickedMenuItemID-1){
        $(el).removeClass('active');
      }else{
        $(el).addClass('active');
      }
    });
    switch (clickedMenuItemID) {
      case "1":
        sectionSelector = '';
        break;
      case "2":
        sectionSelector = 's2';
        break;
      case "3":
        sectionSelector = 's3';
        break;
      case "4":
        sectionSelector = 's4';
        break;
      default:
        return;
    }
    scrollTo(sectionSelector);
  }

  menubar.click(function(event) {
    changeSection(event.target.id);
  });
  menubar1.click(function(event) {
    changeSection(event.target.id);
  });

  var viewPortHeight = window.innerHeight;
  $('.bg-image').each(function(index, el) {
    $(el).css('height', viewPortHeight+".px");
  });
  // var welcomeViewPortHeight = viewPortHeight - $('#menubar').height();
  $('section.content').each(function(index, el) {
    $(el).css('height', viewPortHeight+".px");
  });
  var bgImagesElems = $('#bg-images').children();
  var i = 0;
  setInterval(function(){
    [1, 2, 3, 4].forEach(function(el, index) {
      if(index!==i){
        $(bgImagesElems[index]).removeClass('show').addClass('hide');
      }else{
        $(bgImagesElems[index]).removeClass('hide').addClass('show');
      }      
    });
    
    i = (i === 3) ? 0 : i + 1;
  }, 2000);
});

function contactModal(){
    var notif = $('.ui.icon.info.message'), name = $('#name'), email = $('#email'), phone = $('#phone'), message = $('#message');  
    $('.ui.basic.test.modal')
    .modal({
      closable  : false,
      blurring: false,
      onDeny    : function(){
        name.val('');
        email.val(''); 
        message.val('');
        phone.val('');
        notif.hide();
      },
      onApprove : function() {
        var loading = $('#loading');
        loading.addClass('notched circle loading icon');
        notif.show();
        $.ajax({
          url : "/message",
          data : { name: name.val().trim(), email: email.val().trim(), message: message.val().trim(), phone: phone.val().trim() },
          type : "POST",
          success : function(data) {
            loading.removeClass('notched circle loading icon').addClass('check circle icon');
            $('#notif-content').html('Your message has been sent. Thanks!');
            return false;          
          },
          error : function(xhr,errmsg,err) {
            loading.removeClass('notched circle loading icon').addClass('remove circle icon');
            $('#notif-content').html('There is some error. Please check your details.');
            return false; 
          }
        });
        return false;
      },
      onHidden  : function(){
        notif.hide();
      }
    })
    .modal('setting', 'transition', 'vertical flip')
    .modal('show');
  }