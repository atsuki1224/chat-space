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
  })
});