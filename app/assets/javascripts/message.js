$(function(){
function buildHTML(message){
  var image = (message.image.url === null) ? ' ' : `<img src= ${message.image.url} >`

      var html = `<div class= messages data-id="${message.id}">
                    <div class= messeges__body__list__1 >
                    <div class=messages__name >
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
                  </div>
                </div>`

 return html;

}
  $('#new_message').on('submit', function(e){
    if ($("input[name='message[body]']").val() == '' && $("input[name='message[image]']").val() == "") {
    alert('入力してください');
    return false;
    } else {
    e.preventDefault();
    var formData = new FormData(this);
     var url = $(this).attr('action')
   }
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
      $('.hidden').val('');
      $('.messeges__body').animate({scrollTop: $('.messeges__body')[0].scrollHeight}, 'fast');
       $('.submit').removeAttr("disabled");
    })
    .fail(function(){
      alert('メッセージを入力してください');
      $('.submit').removeAttr("disabled");
    })

  });
   var interval = setInterval(update, 5000);

  function update(){
      var messageId = $('.messages:last').data('id');
       console.log('自動更新中')
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {

      $.ajax({
        url: location.href,
        type: 'GET',
        data: {
          message: { id: messageId }
        },
        dataType: 'json'
      })

    .done(function(data){
      var insertHTML = '';
      $.each(data, function(i, data){
        insertHTML += buildHTML(data);
        $('.messeges__body__list').append(insertHTML);
        $('.messeges__body').animate({scrollTop: $('.messeges__body')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
    } else {
      clearInterval(interval);
      console.log('自動更新停止')
     }}
});
