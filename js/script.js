// Controla a abertura e o fechamento do menu em todas as páginas.
const botaoMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");

// se ambos o botao o botao e o menu existirem
if (botaoMenu && menuPrincipal) {

    // a função serve pra alternar o estado do menu, recebendo true ou false,
    // adicionando uma classe chamada "aberto" ao nav do menu, pra então
    // no css ter regras que se aplicam só quando tiver .aberto
    function definirMenuAberto(aberto) {
        menuPrincipal.classList.toggle("aberto", aberto);
        botaoMenu.setAttribute("aria-expanded", String(aberto));
    }

    // adiciona a class menu-interativo ao elemento pai do botao, q é a div
    botaoMenu.parentElement.classList.add("menu-interativo");

    // o botão escuta por um evento de click do mouse e executa a função pra alternar
    // o estado pro inverso de aberto, que pode ser true ou false naquele momento
    // dependendo do que ta no aria-expanded
    botaoMenu.addEventListener("click", function () {
        const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
        definirMenuAberto(!aberto);
    });
}
