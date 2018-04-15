$(function() {
  var inputName = $("#user-search-field")
  var searchName = $("#user-search-result");

  function appendUser(user)  {
      var html =`<div class="chat-group-form__field--right--search">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>
               </div>`
    searchName.append(html);
  }

  function groupUser(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                        <input name='group[user_ids][]' type='hidden' value='${id}'>
                        <p class='chat-group-user__name'>${name}</p>
                        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                      </div>`
     return html;
    }

  $(inputName).on("keyup ", function() {
    var input = $(inputName).val();

    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      contentType: false,
      dataType: 'json'
    })
    .done(function(users){
      $(searchName).empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
        });
      }else {
       $(searchName).append("一致するユーザーはいませんでした");
      };
    });
  });

  $(document).on('click', '.chat-group-user__btn--add',function(){
    var userId = $(this).data('userId')
    var name = $(this).data('userName')
    $('#chat-group-users').append(groupUser(userId, name));
    $(this).parent().remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove',function(){
    $('#chat-group-user-8').remove();
  });
});
