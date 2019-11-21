$(function(){

  function buildMessage(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
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
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message" data-message-id=${message.id}>
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
        </div>`
    return html;
  }
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
});
