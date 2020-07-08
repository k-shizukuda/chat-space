$(function(){
  function buildHTML(message){
    if (message.image){
      let html = `<div class="MessageBox" data-message-id=${message.id}>
                    <div class="MessageInfo">
                      <div class="MessageInfo__userName">
                        ${message.user_name}
                      </div>
                      <div class="MessageInfo__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                      <img class="Message__image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="MessageBox" data-message-id=${message.id}>
                    <div class="MessageInfo">
                      <div class="MessageInfo__userName">
                        ${message.user_name}
                      </div>
                      <div class="MessageInfo__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
  let reloadMessages = function(){
    let last_message_id = $('.MessageBox:last').data("message-id");
    if(last_message_id == undefined){
      last_message_id = 0;
    }
    $.ajax({
      type: 'get',
      url: 'api/messages',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if(messages.length !== 0){
        let insertHTML = '';
        $.each(messages,function(i,message){
          insertHTML += buildHTML(message)
        });
        $('.MessageField').append(insertHTML);
        $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight })
      }
    })
    .fail(function(){
      alert('error')
    });
  };
  setInterval(reloadMessages, 7000 );
});