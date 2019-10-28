$(function(){
  function buildHTML(message){
    if ( message.image ) {
        var html = 
        `<div class="message" data-message-id=${message.id}>
          <div class="message__upper-info__talker">
            ${message.user_name}
          </div>
          <div class="message__upper-info__date">
            ${message.date}
          </div>
          <div class="message__text">
            <p class= "message__text-content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html = 
      `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info__talker">
          ${message.user_name}
        </div>
        <div class="message__upper-info__date">
          ${message.date}
        </div>
        <div class="message__text">
          <p class= "message__text-content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    }
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
      $('#form__message')[0].reset();
    })

    .fail(function(){
      aleart('メッセージが送信されませんでした');
    })
  })
});