$(function(){
  function buildHTML(message){
    var message_content = message.content? message.content : ''
    var message_image = message.image? message.image : ''
        var html = 
        `<div class="message" data-message-id=${message.id}>
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <p class= "message__text-content">
              ${message_content}
            </p>
          </div>
          <img src="${message_image}" >
        </div>`
      return html;
  }

  $('#form__message').on('submit', function(e){
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

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast' );
    })

    .always(function(){
      $('.form__submit').prop('disabled',false);
      $('#form__message')[0].reset();
    })

    .fail(function(){
      alert('メッセージが送信されませんでした');
    })
  });
    
    var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id},
        processData: false,
        contentType: false
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
        if (message.id > last_message_id){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast' );
        }});
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }
  }
    setInterval(reloadMessages, 5000);
});