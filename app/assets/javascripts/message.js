$(function(){

  function buildMessage(message){
    var image = message.image ? `<img src="${message.image}">` : "";
      var html =
       `<div class="message" data-message-id="${message.id}">
          <div class="upper-message">
            <div class="chat_user-name">
              ${message.user_name}
            </div>
            <div class="day-time">
              ${message.date}
            </div>
          </div>
          <div class="chat-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
              ${image}
        </div>`
      return html;
     }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $(".chat-content").append(html);
      $('.chat-content').animate({scrollTop: $('.chat-content')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
      $('.chat-post').prop('disabled', false);
    })
    .fail(function(message){
      alert('エラー');
    });
    return false;
  });

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({ 
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildMessage(message);
          $('.chat-content').append(insertHTML);
        })
        $('.chat-content').animate({scrollTop: $('.chat-content')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });
