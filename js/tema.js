// Carrega a escolha antes do CSS para reduzir a troca de cores ao abrir outra página.
let temaSalvo = "claro";
try {
    temaSalvo = localStorage.getItem("rede-do-bem-tema") || "claro";
} catch {
    // Se o navegador bloquear o armazenamento, a troca ainda funciona nesta página.
}

document.documentElement.dataset.tema = temaSalvo === "escuro" ? "escuro" : "claro";

// Espera o HTML ficar pronto para encontrar o switch do cabeçalho.
document.addEventListener("DOMContentLoaded", function () {
    const botaoTema = document.querySelector(".tema-toggle");
    if (!botaoTema) return;

    botaoTema.hidden = false;
    botaoTema.setAttribute("aria-checked", String(document.documentElement.dataset.tema === "escuro"));

    botaoTema.addEventListener("click", function () {
        const escuro = document.documentElement.dataset.tema !== "escuro";
        const tema = escuro ? "escuro" : "claro";
        document.documentElement.dataset.tema = tema;
        botaoTema.setAttribute("aria-checked", String(escuro));

        try {
            localStorage.setItem("rede-do-bem-tema", tema);
        } catch {
            // A preferência só não será lembrada na próxima página.
        }
    });
});
