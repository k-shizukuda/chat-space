$(function(){
  let searched_user = $("#UserSearchResult")
  let addMember_user = $(".ChatMembers")
  function addUser(user){
    let html = `<div class="ChatMember">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id=${user.user_id} data-user-name=${user.name}>追加</div>
                </div>`;
  searched_user.append(html);
  }

  function  noUser(){
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    searched_user.append(html)
  }
  function addMember(name, id){
    let html = `<div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>`;

    addMember_user.append(html);
  }

  $("#UserSearch__field").on("keyup", function(){
    let input = $(this).val();
  
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: "json",
      data: { keyword: input }
    })
    .done(function(users){
        searched_user.empty();
        if(users.length !== 0 ){
          users.forEach(function(user){
            addUser(user);
            
        });
      }else{
        noUser();
      }
      
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
  $(searched_user).on('click',".ChatMember__add",function(){
   const userId = $(this).data().userId
   const userName = $(this).data().userName
    addMember(userName, userId)
    $(this).parent().remove();
  })
  $(addMember_user).on('click',".ChatMember__remove", function(){
    $(this).parent().remove();
  })
});