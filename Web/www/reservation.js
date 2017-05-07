//griser avant remplissage complet du formulaire
  // Fonction de désactivation de l'affichage des "tooltips
function deactivateTooltips() {
    var tooltips = document.querySelectorAll('.tooltip'),
        tooltipsLength = tooltips.length;
        for (var i = 0 ; i < tooltipsLength ; i++) {
          tooltips[i].style.display = 'none';
        }
      }
  // La fonction ci-dessous permet de récupérer la "tooltip"
  // qui correspond à notre input
  function getTooltip(elements) {
    while (elements = elements.nextSibling) {
      if (elements.className === 'tooltip') {
        return elements;
      }
    }
    return false;
  }

  // Fonctions de vérification du formulaire, elles renvoient "true" si
  // tout est ok
  var check = {}; // On met toutes nos fonctions dans un objet littéral
  check['lastName'] = function(id) {
    var name = document.getElementById(id),
    tooltipStyle = getTooltip(name).style;
    if (name.value.length > 0) {
      name.className = 'correct';
      tooltipStyle.display = 'none';
      return true;
    } else {
      name.className = 'incorrect';
      tooltipStyle.display = 'inline-block';
      return false;
    }
  };

  check['firstName'] = check['lastName'];

  check['login'] = function() {
    var login = document.getElementById('login'),
    tooltipStyle = getTooltip(login).style;
    if (login.value.length >= 6) {
      login.className = 'correct';
      tooltipStyle.display = 'none';
      return true;
    } else {
      login.className = 'incorrect';
      tooltipStyle.display = 'inline-block';
      return false;
    }
  };

  check['pwd1'] = function() {
    var pwd1 = document.getElementById('pwd1'),
    tooltipStyle = getTooltip(pwd1).style;
    var RegExp = /^[A-Z]+.*[a-z]+.*[0-9]+.*/;
    if (pwd1.value.length >= 8 && RegExp.test(pwd1.value)) {
      pwd1.className = 'correct';
      tooltipStyle.display = 'none';
      return true;
    } else {
      pwd1.className = 'incorrect';
      tooltipStyle.display = 'inline-block';
      return false;
    }
  };
  check['pwd2'] = function() {
    var pwd1 = document.getElementById('pwd1'),
    pwd2 = document.getElementById('pwd2'),
    tooltipStyle = getTooltip(pwd2).style;

    if (pwd1.value == pwd2.value && pwd2.value != '') {
      pwd2.className = 'correct';
      tooltipStyle.display = 'none';
      return true;
    } else {
      pwd2.className = 'incorrect';
      tooltipStyle.display = 'inline-block';
      return false;
    }
  };
  check['useremail'] = function() {
    var country = document.getElementById('useremail'),
    tooltipStyle = getTooltip(useremail).style;
    var RegExp2 = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    if (useremail.value.length > 0 && RegExp2.test(useremail.value)) {
      tooltipStyle.display = 'none';
      return true;
    } else {
      tooltipStyle.display = 'inline-block';
      return false;
    }
  };
  function griser(){
    var result = true;
    for (var i in check) {
      result = check[i](i) && result;
    }
    if(result){
      document.getElementById('submit').disabled = false;
    }
  }


document.getElementById('submit').disabled = true;
  // Mise en place des événements
  (function() { // Utilisation d'une IIFE pour éviter les variables globales.
  var myForm = document.getElementById('myForm'),
  inputs = document.querySelectorAll('input[type=text], input[type=password]'),
  inputsLength = inputs.length;
  for (var i = 0 ; i < inputsLength ; i++) {
    inputs[i].addEventListener('keyup', function(e) {
      check[e.target.id](e.target.id); // "e.target" représente l'input
      // actuellement modifié
      griser();
    });
  }

  myForm.addEventListener('submit', function(e) {
    var result = true;
    for (var i in check) {
      result = check[i](i) && result;
    }
    if (result) {
      //alert('Le formulaire est bien rempli.');
      var script = document.getElementById("myForm").action;
      window[script]();
    }
    e.preventDefault();
  });
  myForm.addEventListener('reset', function() {
    for (var i = 0 ; i < inputsLength; i++) {
      inputs[i].className = '';
    }
    deactivateTooltips();
  });

})();
// Maintenant que tout est initialisé, on peut désactiver les "tooltips"
deactivateTooltips();
