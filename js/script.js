// esse arquivo javascript teve auxilio de IA, mas foi revisado, estruturado, e modificado pelo grupo.


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


// Mostra ou limpa os erros dos dois formulários.
function mostrarErro(campo, texto) {
    const aviso = document.querySelector("#erro-" + campo.id);
    aviso.textContent = texto;
    campo.classList.toggle("campo-invalido", texto !== "");
    campo.setAttribute("aria-invalid", String(texto !== ""));
}

// Validação do formulário da página Contato.
const formularioContato = document.querySelector("#formulario-contato");

if (formularioContato) {
    const nome = formularioContato.querySelector("#nome");
    const email = formularioContato.querySelector("#email");
    const assunto = formularioContato.querySelector("#assunto");
    const mensagem = formularioContato.querySelector("#mensagem");
    const retornoContato = formularioContato.querySelector("#retorno-contato");


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


// Validação do formulário da página Quero apoiar.
const formularioOferta = document.querySelector("#form-oferta");

if (formularioOferta) {
    const nomeApoiador = formularioOferta.querySelector("#nome-apoiador");
    const emailOferta = formularioOferta.querySelector("#email-oferta");
    const regiaoOferta = formularioOferta.querySelector("#regiao-oferta");
    const descricaoOferta = formularioOferta.querySelector("#descricao-oferta");
    const necessidadesOferta = formularioOferta.querySelector("#necessidades-oferta");
    const tiposOferta = formularioOferta.querySelector("#tipos-oferta");
    const contatoAutorizado = formularioOferta.querySelector("#contato-autorizado");
    const retornoOferta = formularioOferta.querySelector("#retorno-oferta");

    // querySelectorAll encontra todos os links com data-necessidade dentro dos cartões .necessidade.
    const linksApoio = document.querySelectorAll(".necessidade a[data-necessidade]");

    // forEach percorre os links e adiciona um evento de clique a cada um.
    // A variável link representa o cartão atual, permitindo reaproveitar a mesma lógica.
    linksApoio.forEach(function (link) {
        link.addEventListener("click", function (evento) {
            // impede o salto padrão do href
            evento.preventDefault();

            // dataset.necessidade lê data-necessidade, e dataset.tipo lê data-tipo do link clicado.
            // O "#" transforma o ID guardado em um seletor: "#" + "apoio-kits" vira "#apoio-kits".
            // A busca acontece dentro do formulário e encontra os checkboxes correspondentes.
            const necessidade = formularioOferta.querySelector("#" + link.dataset.necessidade);
            const tipo = formularioOferta.querySelector("#" + link.dataset.tipo);

            // checked = true marca as opções, sem desmarcar as escolhas anteriores do usuário.
            necessidade.checked = true;
            tipo.checked = true;


            mostrarErro(necessidadesOferta, "");
            mostrarErro(tiposOferta, "");

            // Rola a página até a seção do formulário.
            document.querySelector("#formulario-oferta").scrollIntoView();
            // Coloca o cursor no nome; preventScroll evita uma segunda rolagem ao receber foco.
            nomeApoiador.focus({ preventScroll: true });
        });
    });

    formularioOferta.addEventListener("submit", function (evento) {
        evento.preventDefault();
        retornoOferta.textContent = "";

        mostrarErro(nomeApoiador, nomeApoiador.value.trim() === "" ? "Informe seu nome ou o nome da empresa." : "");
        mostrarErro(emailOferta,
            emailOferta.value.trim() === "" || emailOferta.validity.typeMismatch
                ? "Informe um e-mail válido, como nome@exemplo.com."
                : ""
        );
        mostrarErro(regiaoOferta, regiaoOferta.value.trim() === "" ? "Informe sua cidade e estado." : "");
        mostrarErro(descricaoOferta, descricaoOferta.value.trim() === "" ? "Descreva como você pode ajudar." : "");
        mostrarErro(necessidadesOferta,
            necessidadesOferta.querySelector("input:checked") ? "" : "Selecione pelo menos uma necessidade."
        );
        mostrarErro(tiposOferta,
            tiposOferta.querySelector("input:checked") ? "" : "Selecione pelo menos um tipo de apoio."
        );
        mostrarErro(contatoAutorizado,
            contatoAutorizado.checked ? "" : "Autorize o contato para continuar."
        );

        const primeiroErro = formularioOferta.querySelector(".campo-invalido");
        if (primeiroErro) {
            // Em grupos de opções, o foco vai para o primeiro checkbox.
            const campo = primeiroErro.querySelector("input") || primeiroErro;
            campo.focus();
            return;
        }

        retornoOferta.textContent = "A oferta foi enviada";
    });

    formularioOferta.addEventListener("reset", function () {
        mostrarErro(nomeApoiador, "");
        mostrarErro(emailOferta, "");
        mostrarErro(regiaoOferta, "");
        mostrarErro(descricaoOferta, "");
        mostrarErro(necessidadesOferta, "");
        mostrarErro(tiposOferta, "");
        mostrarErro(contatoAutorizado, "");
        retornoOferta.textContent = "";
    });
}
