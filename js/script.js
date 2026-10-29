// Controla a abertura e o fechamento do menu em todas as páginas.
const botaoMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");

if (botaoMenu && menuPrincipal) {
    const telaMenor = window.matchMedia("(max-width: 991px)");

    function definirMenuAberto(aberto) {
        menuPrincipal.classList.toggle("aberto", aberto);
        botaoMenu.setAttribute("aria-expanded", String(aberto));
    }

    // Sem JavaScript, os links permanecem visíveis e o botão fica escondido.
    botaoMenu.parentElement.classList.add("menu-interativo");

    botaoMenu.addEventListener("click", function () {
        const aberto = botaoMenu.getAttribute("aria-expanded") === "true";
        definirMenuAberto(!aberto);
    });

    menuPrincipal.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && telaMenor.matches) {
            definirMenuAberto(false);
            botaoMenu.focus();
        }
    });

    telaMenor.addEventListener("change", function () {
        // Evita manter um estado aberto antigo ao alternar entre desktop e celular.
        if (telaMenor.matches && menuPrincipal.contains(document.activeElement)) {
            botaoMenu.focus();
        }
        definirMenuAberto(false);
    });
}
