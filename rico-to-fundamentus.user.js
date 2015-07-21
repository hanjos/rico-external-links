// ==UserScript==
// @name         Fundamentus
// @namespace    https://www.rico.com.vc
// @version      0.1
// @description  Adiciona links para a Fundamentus ao se clicar um botão Add links to Fundamentus.
// @author       Humberto S. N. dos Anjos
// @match        https://www.rico.com.vc/dashboard/analises/*
// @grant        none
// ==/UserScript==

/* 
function linkToFundamentus() { 
    $("tr[ng-repeat=\"stock in recommendation.portfolio | tablesortOrderBy:sortFun\"]>td:nth-child(2)")
      .each(function (v, i) { 
            $(this).html("<a href='http://fundamentus.com.br/detalhes.php?papel=" + $(this).text() + "'>" + $(this).html() + "</a>") 
      }); 
}
*/

// Era para button chamar a função comentada acima, mas ela não é visível na página. 
// Então vai esse stringão enquanto não vejo coisa melhor.
var linkToFundamentus = '$("tr[ng-repeat=\\\"stock in recommendation.portfolio | tablesortOrderBy:sortFun\\\"]>td:nth-child(2)")' +
    ".each(function (v, i) { " + 
        "$(this).html(\"<a href=\\\"http://fundamentus.com.br/detalhes.php?papel=\" + $(this).text() + \"\\\">\" + $(this).html() + \"</a>\");" + 
    "});";

var button = "<button onclick='" + linkToFundamentus + "' class='btn-round btn-blue btn-block no-padding-left no-padding-right'>Add links to Fundamentus</button><p />";

// Só tente adicionar o botão após o documento terminar de carregar
$(document).ready(function () {
    $("nav.dashboard-menu").prepend(button);
});