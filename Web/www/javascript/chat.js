$(function() {
  afficheConversation();

  $('#envoyer').click(function() {
    var nom = $('#username').val();
    var message = $('#msg').val();
    $.get('../htbin/chatsend.py', {
      'username': nom,
      'msg': message
    }, afficheConversation);
  });

  function afficheConversation() {
    $.getJSON('../htbin/chatget.py', function(donnees){
      var i=1;
      var affiche = $('#conversation').html('<b>'+donnees[0].user +'</b> > '+donnees[0].msg+'<br>');
      while(i<donnees.length){
        affiche=affiche.append('<b>'+donnees[i].user +'</b> > ' +donnees[i].msg+'<br>');
        i++;
      }
    });
    $('#message').val('');
  }

  setInterval(afficheConversation, 8000);
});
