// ==UserScript==
// @name         External links for Rico.com.vc
// @namespace    https://www.rico.com.vc
// @version      0.2
// @description  Cria botões que adicionam links para análises de papéis e empresas específicas. Por enquanto são suportadas Fundamentus e Bastter.
// @author       Humberto S. N. dos Anjos
// @match        https://www.rico.com.vc/*
// @grant        none
// ==/UserScript==

// Usando o location hack (http://wiki.greasespot.net/Location_hack) para injetar
// funções no escopo global a serem acessadas pelos botões criados abaixo
location.replace("javascript:(" + function() {
  window.linkToFundamentus = function() {
    $("tr[ng-repeat=\"stock in recommendation.portfolio | tablesortOrderBy:sortFun\"]>td:nth-child(2)")
    .each(function (v, i) {
      $(this).html("<a href='http://fundamentus.com.br/detalhes.php?papel=" + $(this).text() + "'>" + $(this).text() + "</a>")
    });
  };

  window.linkToBastter = function() {
    $("tr[ng-repeat=\"stock in recommendation.portfolio | tablesortOrderBy:sortFun\"]>td:nth-child(2)")
    .each(function (v, i) {
      $(this).html("<a href='http://www.bastter.com/mercado/acao/" + $(this).text() + ".aspx'>" + $(this).text() + "</a>")
    });
  };
} + ")();");

var fundamentusButton = "<button onclick='linkToFundamentus()' class='btn-round btn-blue btn-block no-padding-left no-padding-right'>+ Fundamentus</button>";
var bastterButton = "<button onclick='linkToBastter()' class='btn-round btn-green btn-block no-padding-left no-padding-right'>+ Bastter</button>";

// Só tente adicionar os botões após o documento terminar de carregar
$(document).ready(function () {
  $("nav.dashboard-menu").prepend(fundamentusButton + "<p />");
  $("nav.dashboard-menu").prepend(bastterButton);
});
