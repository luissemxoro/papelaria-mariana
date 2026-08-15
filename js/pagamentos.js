/*
 * ============================================
 * PAGAMENTO / CHECKOUT
 * PAPELARIA MARIANA
 * ============================================
 */

const CHAVE_CLIENTE = "cliente";
const CHAVE_PEDIDO = "ultimoPedido";


/*
 * Recupera o cliente.
 */

function obterClientePagamento() {

    try {

        return JSON.parse(
            localStorage.getItem(
                CHAVE_CLIENTE
            )
        ) || null;

    } catch (erro) {

        console.error(
            "Erro ao carregar cliente:",
            erro
        );

        return null;
    }

}


/*
 * Recupera o carrinho.
 */

function obterCarrinhoPagamento() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "carrinho"
            )
        ) || [];

    } catch (erro) {

        console.error(
            "Erro ao carregar carrinho:",
            erro
        );

        return [];
    }

}


/*
 * Calcula o total.
 */

function calcularTotalPagamento(
    carrinho
) {

    return carrinho.reduce(
        (total, item) =>
            total +
            (
                item.preco *
                item.quantidade
            ),
        0
    );

}


/*
 * Gera número temporário
 * para o pedido.
 */

function gerarNumeroPedido() {

    const agora =
        Date.now()
            .toString()
            .slice(-8);

    return "PM-" + agora;

}


/*
 * Carrega os dados do cliente
 * na tela.
 */

function carregarClientePagamento(
    cliente
) {

    const nome =
        document.getElementById(
            "cliente-nome"
        );

    const email =
        document.getElementById(
            "cliente-email"
        );

    const endereco =
        document.getElementById(
            "cliente-endereco"
        );

    if (nome) {
        nome.innerText =
            cliente.nome;
    }

    if (email) {
        email.innerText =
            cliente.email;
    }

    if (endereco) {
        endereco.innerText =
            cliente.endereco;
    }

}


/*
 * Renderiza os produtos
 * no resumo do pedido.
 */

function renderizarResumoPagamento(
    carrinho
) {

    const lista =
        document.getElementById(
            "lista-resumo"
        );

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    carrinho.forEach(
        item => {

            const subtotal =
                item.preco *
                item.quantidade;

            const elemento =
                document.createElement(
                    "div"
                );

            elemento.className =
                "item-resumo";

            elemento.innerHTML = `

                <span>

                    ${item.nome}

                    <br>

                    Tamanho:
                    ${item.tamanho}

                    <br>

                    Quantidade:
                    ${item.quantidade}

                </span>

                <strong>

                    ${formatarMoeda(
                        subtotal
                    )}

                </strong>

            `;

            lista.appendChild(
                elemento
            );

        }
    );

}


/*
 * Atualiza o valor total
 * na tela.
 */

function atualizarTotalPagamento(
    carrinho
) {

    const elemento =
        document.getElementById(
            "valor-final"
        );

    if (!elemento) {
        return;
    }

    const total =
        calcularTotalPagamento(
            carrinho
        );

    elemento.innerText =
        formatarMoeda(total);

}


/*
 * Cria o objeto do pedido.
 */

function criarPedido(
    cliente,
    carrinho,
    formaPagamento
) {

    const total =
        calcularTotalPagamento(
            carrinho
        );

    return {

        numero:
            gerarNumeroPedido(),

        cliente: {

            nome:
                cliente.nome,

            email:
                cliente.email,

            endereco:
                cliente.endereco

        },

        itens:
            carrinho,

        total:
            total,

        pagamento:
            formaPagamento,

        data:
            new Date().toISOString(),

        status:
            "Aguardando pagamento"

    };

}


/*
 * Finaliza a compra.
 */

function concluirCompra() {

    const carrinho =
        obterCarrinhoPagamento();

    const cliente =
        obterClientePagamento();

    /*
     * Validação do carrinho.
     */

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        window.location.href =
            "index.html";

        return;
    }


    /*
     * Validação do cliente.
     */

    if (!cliente) {

        alert(
            "Os dados do cliente não foram encontrados."
        );

        window.location.href =
            "cadastro.html";

        return;
    }


    /*
     * Forma de pagamento.
     */

    const campoPagamento =
        document.querySelector(
            'input[name="forma_pagamento"]:checked'
        );

    if (!campoPagamento) {

        alert(
            "Selecione uma forma de pagamento."
        );

        return;
    }

    const formaPagamento =
        campoPagamento.value;


    /*
     * Cria pedido.
     */

    const pedido =
        criarPedido(
            cliente,
            carrinho,
            formaPagamento
        );


    /*
     * Salva o último pedido
     * temporariamente.
     */

    localStorage.setItem(
        CHAVE_PEDIDO,
        JSON.stringify(pedido)
    );


    /*
     * IMPORTANTE:
     *
     * Aqui futuramente vamos chamar
     * o backend e o gateway de pagamento.
     */

    if (
        formaPagamento === "pix"
    ) {

        alert(
            "Pedido " +
            pedido.numero +
            " criado!\n\n" +
            "PIX selecionado.\n\n" +
            "A geração do PIX real será adicionada na integração com o gateway."
        );

    } else {

        alert(
            "Pedido " +
            pedido.numero +
            " criado!\n\n" +
            "Cartão selecionado.\n\n" +
            "A cobrança real será adicionada na integração com o gateway."
        );

    }


    /*
     * Limpa apenas o carrinho.
     */

    localStorage.removeItem(
        "carrinho"
    );


    /*
     * Volta para a loja.
     */

    window.location.href =
        "index.html";

}


/*
 * Inicialização do checkout.
 */

function iniciarPagamento() {

    const carrinho =
        obterCarrinhoPagamento();

    const cliente =
        obterClientePagamento();


    /*
     * Verifica carrinho.
     */

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        window.location.href =
            "index.html";

        return;
    }


    /*
     * Verifica cliente.
     */

    if (!cliente) {

        alert(
            "Precisamos dos seus dados para continuar."
        );

        window.location.href =
            "cadastro.html";

        return;
    }


    carregarClientePagamento(
        cliente
    );

    renderizarResumoPagamento(
        carrinho
    );

    atualizarTotalPagamento(
        carrinho
    );

}


/*
 * Executa quando o HTML estiver carregado.
 */

document.addEventListener(
    "DOMContentLoaded",
    iniciarPagamento
);

