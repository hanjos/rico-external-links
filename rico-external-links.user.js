// ==UserScript==
// @name         External links for Rico.com.vc
// @namespace    https://www.rico.com.vc
// @version      0.5
// @description  Cria botões que adicionam links para análises de papéis e empresas específicas. Por enquanto são suportadas Fundamentus e Bastter.
// @author       Humberto S. N. dos Anjos
// @match        https://www.rico.com.vc/*
// @grant        none
// ==/UserScript==

// Usando o location hack (http://wiki.greasespot.net/Location_hack) para injetar
// funções no escopo global
location.replace("javascript:(" + function() {
  window.makeExternalLinks = function() {
    /* recomendações de compra */
    $("div[ng-repeat=\"stock in recommendation.portfolio\"]>div:nth-child(1)")
    .each(function (i, v) {
        var text = $(this).contents().get(0).nodeValue;

        $(this).children()
            .filter(":not(.hsnaExtLinks)")
            .append("&nbsp;" +
                    "<a href='http://fundamentus.com.br/detalhes.php?papel=" + text.trim() + "'><img src='http://fundamentus.com.br/img/ico_p_grafico.gif' width='8' height='8'></a>&nbsp;" +
                    "<a href='http://www.bastter.com/mercado/acao/" + text.trim() + ".aspx'><img src='https://www.bastter.com/favicon.ico' width='12' height='12'></a>")
            .addClass("hsnaExtLinks");
    });

    /* lista de ativos onde tenho posição */
    $("tr[ng-repeat=\"currentPosition in positionController.customerPosition.positions | tablesortOrderBy:sortFun\"]>td:nth-child(1)")
    .each(function (i, v) {
      $(this).html($(this).text().trimRight() + "&nbsp;" +
                   "<a href='http://fundamentus.com.br/detalhes.php?papel=" + $(this).text().trim() + "'><img src='http://fundamentus.com.br/img/ico_p_grafico.gif' width='8' height='8'></a>&nbsp;" +
                   "<a href='http://www.bastter.com/mercado/acao/" + $(this).text().trim() + ".aspx'><img src='https://www.bastter.com/favicon.ico' width='12' height='12'></a>");
    });

    /* carteiras recomendadas */
    $("tr[ng-repeat=\"stock in recommendation.portfolio | tablesortOrderBy:sortFun\"]>td:nth-child(2)")
    .each(function (i, v) {
      $(this).html($(this).text().trimRight() + "&nbsp;" +
                   "<a href='http://fundamentus.com.br/detalhes.php?papel=" + $(this).text().trim() + "'><img src='http://fundamentus.com.br/img/ico_p_grafico.gif' width='8' height='8'></a>&nbsp;" +
                   "<a href='http://www.bastter.com/mercado/acao/" + $(this).text().trim() + ".aspx'><img src='https://www.bastter.com/favicon.ico' width='12' height='12'></a>");
    });
  };
} + ")();");

// Estes botões chamarão as funções definidas acima
var makeExternalLinksButton = "<button onclick='makeExternalLinks()' class='btn-round btn-blue btn-block no-padding-left no-padding-right'>+ Links externos</button>";

// Só tente adicionar os botões após o documento terminar de carregar
$(document).ready(function () {
  $("nav.dashboard-menu").prepend(makeExternalLinksButton + "<p/>");
});
