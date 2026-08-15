
/*
 * ============================================
 * CADASTRO DO CLIENTE
 * PAPELARIA MARIANA
 * ============================================
 */

const CHAVE_CLIENTE = "cliente";


/*
 * Verifica se existe algo no carrinho.
 */

function verificarCarrinhoAntesCadastro() {

    const carrinho =
        JSON.parse(
            localStorage.getItem("carrinho")
        ) || [];

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        window.location.href =
            "index.html";

        return false;
    }

    return true;
}


/*
 * Salva o cliente.
 */

function salvarCliente(cliente) {

    localStorage.setItem(
        CHAVE_CLIENTE,
        JSON.stringify(cliente)
    );

}


/*
 * Processa o formulário.
 */

function processarCadastro(event) {

    event.preventDefault();

    if (
        !verificarCarrinhoAntesCadastro()
    ) {
        return;
    }

    const nome =
        document
            .getElementById("nome")
            .value
            .trim();

    const email =
        document
            .getElementById("email")
            .value
            .trim();

    const senha =
        document
            .getElementById("senha")
            .value;

    const endereco =
        document
            .getElementById("endereco")
            .value
            .trim();


    /*
     * Validações
     */

    if (!nome) {

        alert(
            "Informe seu nome completo."
        );

        return;
    }

    if (!email) {

        alert(
            "Informe seu e-mail."
        );

        return;
    }

    if (senha.length < 6) {

        alert(
            "A senha precisa ter pelo menos 6 caracteres."
        );

        return;
    }

    if (!endereco) {

        alert(
            "Informe seu endereço."
        );

        return;
    }


    /*
     * Cria o objeto do cliente.
     */

    const cliente = {

        nome: nome,

        email: email,

        senha: senha,

        endereco: endereco

    };


    /*
     * Salva temporariamente.
     */

    salvarCliente(cliente);


    /*
     * Vai para o pagamento.
     */

    window.location.href =
        "pagamento.html";

}


/*
 * Inicialização.
 */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const formulario =
            document.getElementById(
                "formCadastro"
            );

        if (!formulario) {
            return;
        }

        formulario.addEventListener(
            "submit",
            processarCadastro
        );

    }
);

