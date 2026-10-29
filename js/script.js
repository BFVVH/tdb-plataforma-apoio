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


// Validação do formulário da página Contato.
const formularioContato = document.querySelector("#formulario-contato");

if (formularioContato) {
    const nome = formularioContato.querySelector("#nome");
    const email = formularioContato.querySelector("#email");
    const assunto = formularioContato.querySelector("#assunto");
    const mensagem = formularioContato.querySelector("#mensagem");
    const retornoContato = formularioContato.querySelector("#retorno-contato");

    // A mesma função mostra ou limpa o erro de cada campo.
    function mostrarErro(campo, texto) {
        const aviso = document.querySelector("#erro-" + campo.id);
        aviso.textContent = texto;
        campo.classList.toggle("campo-invalido", texto !== "");
        campo.setAttribute("aria-invalid", String(texto !== ""));
    }

    // escuta pelo evento submit do botao de enviar formulario
    formularioContato.addEventListener("submit", function (evento) {
        evento.preventDefault(); // previne a acao padrao do submit, que recarregaria a pagina
        retornoContato.textContent = "";


        // cada erro checa se o campo do valor é vazio, se sim muda o texto pra mensagem de erro, se nao deixa o texto vazio mesmo
        mostrarErro(nome, nome.value.trim() === "" ? "Informe seu nome." : "");
        mostrarErro(email,                                                  
            email.value.trim() === "" || email.validity.typeMismatch  // no caso do email, tbm checa a validade do formato email
                ? "Informe um e-mail válido, como nome@exemplo.com."
                : ""
        );
        mostrarErro(assunto, assunto.value === "" ? "Selecione um assunto." : "");
        mostrarErro(mensagem, mensagem.value.trim() === "" ? "Escreva sua mensagem." : "");


        // ao achar o primeiro erro do formulario, usa focus pra mandar a pagina direto pra onde o usuario errou, e retorna a funcao
        // antes de poder chegar na alteracao de texto de retorno de contato
        const primeiroErro = formularioContato.querySelector(".campo-invalido");
        if (primeiroErro) {
            primeiroErro.focus();
            return;
        }

        retornoContato.textContent = "Formulário enviado, aguarde o retorno.";
    });

    // no evento reset limpa os erros
    formularioContato.addEventListener("reset", function () {
        mostrarErro(nome, "");
        mostrarErro(email, "");
        mostrarErro(assunto, "");
        mostrarErro(mensagem, "");
        retornoContato.textContent = "";
    });
}
