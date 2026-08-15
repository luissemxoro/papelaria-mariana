document.addEventListener("DOMContentLoaded", function () {

    console.log("Pagamento.js carregado.");

    // ============================================
    // ELEMENTOS
    // ============================================

    const nomeElemento =
        document.getElementById("cliente-nome");

    const emailElemento =
        document.getElementById("cliente-email");

    const telefoneElemento =
        document.getElementById("cliente-telefone");

    const enderecoElemento =
        document.getElementById("cliente-endereco");

    const listaResumo =
        document.getElementById("lista-resumo");

    const valorFinal =
        document.getElementById("valor-final");

    const mensagem =
        document.getElementById("mensagem");

    const btnConfirmar =
        document.getElementById("btnConfirmar");


    // ============================================
    // FORMATAR DINHEIRO
    // ============================================

    function formatarMoeda(valor) {

        return new Intl.NumberFormat(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        ).format(valor);

    }


    // ============================================
    // LER CARRINHO
    // ============================================

    function obterCarrinho() {

        try {

            const dados =
                localStorage.getItem("carrinho");

            if (!dados) {
                return [];
            }

            const carrinho =
                JSON.parse(dados);

            if (!Array.isArray(carrinho)) {
                return [];
            }

            return carrinho;

        } catch (erro) {

            console.error(
                "Erro ao ler carrinho:",
                erro
            );

            return [];

        }

    }


    // ============================================
    // LER CLIENTE
    // ============================================

    function obterCliente() {

        try {

            const dados =
                localStorage.getItem("cliente");

            if (!dados) {
                return null;
            }

            return JSON.parse(dados);

        } catch (erro) {

            console.error(
                "Erro ao ler cliente:",
                erro
            );

            return null;

        }

    }


    // ============================================
    // CLIENTE
    // ============================================

    const cliente =
        obterCliente();


    // ============================================
    // CARRINHO
    // ============================================

    const carrinho =
        obterCarrinho();


    console.log(
        "Cliente encontrado:",
        cliente
    );

    console.log(
        "Carrinho encontrado:",
        carrinho
    );


    // ============================================
    // VERIFICA CLIENTE
    // ============================================

    if (!cliente) {

        alert(
            "Os dados do cliente não foram encontrados. Você será enviado para o cadastro."
        );

        window.location.href =
            "cadastro.html";

        return;

    }


    // ============================================
    // VERIFICA CARRINHO
    // ============================================

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        window.location.href =
            "index.html";

        return;

    }


    // ============================================
    // MOSTRAR CLIENTE
    // ============================================

    nomeElemento.textContent =
        cliente.nome || "Não informado";


    emailElemento.textContent =
        cliente.email || "Não informado";


    telefoneElemento.textContent =
        cliente.telefone || "Não informado";


    // ============================================
    // ENDEREÇO
    // ============================================

    let enderecoTexto = "";


    /*
     * Compatível com o cadastro antigo,
     * onde endereco era uma string.
     */

    if (
        typeof cliente.endereco === "string"
    ) {

        enderecoTexto =
            cliente.endereco;

    }


    /*
     * Compatível com o novo cadastro,
     * onde endereco é um objeto.
     */

    else if (
        cliente.endereco &&
        typeof cliente.endereco === "object"
    ) {

        const endereco =
            cliente.endereco;


        if (endereco.logradouro) {

            enderecoTexto +=
                endereco.logradouro;

        }


        if (endereco.numero) {

            enderecoTexto +=
                ", " + endereco.numero;

        }


        if (endereco.complemento) {

            enderecoTexto +=
                " - " +
                endereco.complemento;

        }


        if (endereco.bairro) {

            enderecoTexto +=
                " - " +
                endereco.bairro;

        }


        if (endereco.cidade) {

            enderecoTexto +=
                " - " +
                endereco.cidade;

        }


        if (endereco.estado) {

            enderecoTexto +=
                " - " +
                endereco.estado;

        }


        if (endereco.cep) {

            enderecoTexto +=
                " - CEP: " +
                endereco.cep;

        }

    }


    enderecoElemento.textContent =
        enderecoTexto || "Não informado";


    // ============================================
    // CALCULAR TOTAL
    // ============================================

    let total =
        0;


    // ============================================
    // MOSTRAR PRODUTOS
    // ============================================

    listaResumo.innerHTML = "";


    carrinho.forEach(function (item) {

        const preco =
            Number(item.preco) || 0;


        const quantidade =
            Number(item.quantidade) || 1;


        const subtotal =
            preco * quantidade;


        total +=
            subtotal;


        const elemento =
            document.createElement("div");


        elemento.className =
            "item-resumo";


        elemento.innerHTML = `

            <div class="item-resumo-info">

                <strong>
                    ${item.nome || "Produto"}
                </strong>

                <span>
                    Tamanho:
                    ${item.tamanho || "Não informado"}
                </span>

                <br>

                <span>
                    Quantidade:
                    ${quantidade}
                </span>

            </div>

            <div class="item-resumo-preco">

                ${formatarMoeda(subtotal)}

            </div>

        `;


        listaResumo.appendChild(
            elemento
        );

    });


    // ============================================
    // MOSTRAR TOTAL
    // ============================================

    valorFinal.textContent =
        formatarMoeda(total);


    console.log(
        "Total do pedido:",
        total
    );


    // ============================================
    // CONFIRMAR PEDIDO
    // ============================================

    btnConfirmar.addEventListener(
        "click",
        function () {

            const formaPagamento =
                document.querySelector(
                    'input[name="forma_pagamento"]:checked'
                );


            if (!formaPagamento) {

                mostrarMensagem(
                    "Escolha uma forma de pagamento.",
                    "erro"
                );

                return;

            }


            // ====================================
            // NÚMERO DO PEDIDO
            // ====================================

            const numeroPedido =
                "PM-" +
                Date.now()
                    .toString()
                    .slice(-8);


            // ====================================
            // PEDIDO
            // ====================================

            const pedido = {

                numero:
                    numeroPedido,

                cliente:
                    cliente,

                itens:
                    carrinho,

                total:
                    total,

                pagamento:
                    formaPagamento.value,

                data:
                    new Date().toISOString(),

                status:
                    "Aguardando pagamento"

            };


            // ====================================
            // SALVAR PEDIDO
            // ====================================

            localStorage.setItem(
                "ultimoPedido",
                JSON.stringify(pedido)
            );


            // ====================================
            // MENSAGEM
            // ====================================

            mostrarMensagem(
                "Pedido criado com sucesso!",
                "sucesso"
            );


            btnConfirmar.disabled =
                true;


            btnConfirmar.textContent =
                "Pedido Confirmado";


            console.log(
                "Pedido criado:",
                pedido
            );


            /*
             * Por enquanto não vamos apagar
             * o carrinho.
             *
             * Primeiro vamos confirmar que
             * toda a sequência está funcionando.
             */

        }
    );


    // ============================================
    // MENSAGEM
    // ============================================

    function mostrarMensagem(
        texto,
        tipo
    ) {

        mensagem.textContent =
            texto;

        mensagem.className =
            "mensagem " + tipo;

    }

});