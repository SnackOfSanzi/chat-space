$(function(){
function buildHTML(message){
  var image = (message.image.url == null) ? ' ' : `<img src= ${message.image.url} >`

      var html = `<div class= messeges__body__list__1>
                    <div class=messages__name>
                      ${message.name}
                    </div>
                    <div class=messages__time>
                      ${message.created_at}
                    </div>
                    <div class=messages__text >
                         <p class=message__content>
                            ${message.body }</p>
                         <p class=message__image >
                            ${image}
                         </p>
                      </div>
                  </div>`

 return html;

}
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
     var url = $(this).attr('action')
   $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messeges__body__list').append(html)
      $('.message').val('')
      $('input[type=file]').val('');
      $('.messeges__body').animate({scrollTop: $('.messeges__body')[0].scrollHeight}, 'fast');
       $('.submit').removeAttr("disabled");
    })
    .fail(function(){
      alert('メッセージを入力してください');
      $('.submit').removeAttr("disabled");
    })

  });
});
