/*
 * ============================================
 * PRODUTOS - PAPELARIA MARIANA
 * ============================================
 *
 * Este arquivo é responsável por:
 * - Armazenar os produtos da loja
 * - Renderizar a vitrine
 * - Formatar os preços
 * - Adicionar produtos ao carrinho
 */


/* ============================================
   LISTA DE PRODUTOS
============================================ */

const produtos = [

    {
        id: "tenis",
        nome: "Tênis Escolar - Uniforme Escolar",
        preco: 80.58,
        categoria: "Uniformes",
        estoque: 50,
        imagem: "👟",

        tamanhos: [
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40"
        ]
    },

    {
        id: "meia",
        nome: "Meia Escolar - Uniforme Escolar",
        preco: 8.50,
        categoria: "Uniformes",
        estoque: 100,
        imagem: "🧦",

        tamanhos: [
            "P (23 ao 26)",
            "M (27 ao 32)",
            "G (33 ao 36)",
            "GG (37 ao 40)"
        ]
    },

    {
        id: "moletom",
        nome: "Moletom Escolar - Uniforme Escolar",
        preco: 52.98,
        categoria: "Uniformes",
        estoque: 40,
        imagem: "🧥",

        tamanhos: [
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "P",
            "M",
            "G",
            "GG"
        ]
    },

    {
        id: "camiseta",
        nome: "Camiseta Escolar - Uniforme Escolar",
        preco: 30.00,
        categoria: "Uniformes",
        estoque: 100,
        imagem: "👕",

        tamanhos: [
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "P",
            "M",
            "G",
            "GG"
        ]
    },

    {
        id: "calca",
        nome: "Calça Escolar - Uniforme Escolar",
        preco: 59.90,
        categoria: "Uniformes",
        estoque: 50,
        imagem: "👖",

        tamanhos: [
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "P",
            "M",
            "G",
            "GG"
        ]
    },

    {
        id: "jaqueta",
        nome: "Jaqueta Escolar - Uniforme Escolar",
        preco: 59.90,
        categoria: "Uniformes",
        estoque: 50,
        imagem: "🧥",

        tamanhos: [
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "P",
            "M",
            "G",
            "GG"
        ]
    },

    {
        id: "bermuda",
        nome: "Bermuda Escolar - Uniforme Escolar",
        preco: 36.14,
        categoria: "Uniformes",
        estoque: 60,
        imagem: "🩳",

        tamanhos: [
            "2",
            "4",
            "6",
            "8",
            "10",
            "12",
            "14",
            "P",
            "M",
            "G",
            "GG"
        ]
    }

];


/* ============================================
   FORMATAÇÃO DE MOEDA
============================================ */

function formatarMoeda(valor) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(valor);

}


/* ============================================
   BUSCAR PRODUTO
============================================ */

function buscarProdutoPorId(id) {

    return produtos.find(
        produto => produto.id === id
    );

}


/* ============================================
   RENDERIZAR VITRINE
============================================ */

function renderizarProdutos() {

    const vitrine =
        document.getElementById("vitrine");

    /*
     * Se a página não possuir uma vitrine,
     * simplesmente não faz nada.
     */

    if (!vitrine) {
        return;
    }

    /*
     * Limpa a vitrine antes de renderizar.
     */

    vitrine.innerHTML = "";


    /*
     * Verifica se existem produtos.
     */

    if (produtos.length === 0) {

        vitrine.innerHTML = `
            <div class="vazio">
                <p>
                    Nenhum produto disponível.
                </p>
            </div>
        `;

        return;
    }


    /*
     * Cria cada produto.
     */

    produtos.forEach(
        produto => {

            const card =
                document.createElement("div");

            card.className = "produto";


            /*
             * Cria o HTML dos tamanhos.
             */

            let opcoesTamanho = "";

            produto.tamanhos.forEach(
                tamanho => {

                    opcoesTamanho += `
                        <option value="${tamanho}">
                            ${tamanho}
                        </option>
                    `;

                }
            );


            /*
             * Cria o card.
             */

            card.innerHTML = `

                <div class="produto-img">

                    ${
                        produto.imagem
                            ? (
                                produto.imagem.startsWith("http") ||
                                produto.imagem.includes("/")
                                    ? `
                                        <img
                                            src="${produto.imagem}"
                                            alt="${produto.nome}"
                                        >
                                    `
                                    : produto.imagem
                            )
                            : "📦"
                    }

                </div>


                <h3>
                    ${produto.nome}
                </h3>


                <div class="preco">
                    ${formatarMoeda(produto.preco)}
                </div>


                ${
                    produto.tamanhos &&
                    produto.tamanhos.length > 0
                        ? `
                            <div class="campo-grupo">

                                <label
                                    for="tamanho-${produto.id}">
                                    Tamanho:
                                </label>

                                <select
                                    id="tamanho-${produto.id}"
                                    class="tamanho-produto">

                                    ${opcoesTamanho}

                                </select>

                            </div>
                        `
                        : ""
                }


                <div class="campo-grupo">

                    <label
                        for="quantidade-${produto.id}">
                        Quantidade:
                    </label>

                    <input
                        type="number"
                        id="quantidade-${produto.id}"
                        class="quantidade-produto"
                        min="1"
                        max="${produto.estoque}"
                        value="1"
                    >

                </div>


                <button
                    class="btn-add"
                    onclick="adicionarProdutoDaVitrine('${produto.id}')">

                    🛒 Adicionar ao carrinho

                </button>

            `;


            /*
             * Adiciona o card à vitrine.
             */

            vitrine.appendChild(card);

        }
    );

}


/* ============================================
   ADICIONAR PRODUTO DA VITRINE
============================================ */

function adicionarProdutoDaVitrine(
    produtoId
) {

    /*
     * Procura o produto.
     */

    const produto =
        buscarProdutoPorId(produtoId);


    if (!produto) {

        alert(
            "Produto não encontrado."
        );

        return;
    }


    /*
     * Pega o tamanho selecionado.
     */

    const campoTamanho =
        document.getElementById(
            `tamanho-${produtoId}`
        );


    const tamanho =
        campoTamanho
            ? campoTamanho.value
            : null;


    /*
     * Pega a quantidade.
     */

    const campoQuantidade =
        document.getElementById(
            `quantidade-${produtoId}`
        );


    let quantidade =
        campoQuantidade
            ? parseInt(
                campoQuantidade.value,
                10
            )
            : 1;


    /*
     * Corrige quantidade inválida.
     */

    if (
        isNaN(quantidade) ||
        quantidade < 1
    ) {

        quantidade = 1;

    }


    /*
     * Verifica estoque.
     */

    if (
        quantidade >
        produto.estoque
    ) {

        alert(
            `Quantidade indisponível. ` +
            `Estoque disponível: ${produto.estoque}.`
        );

        return;
    }


    /*
     * Verifica se o produto possui tamanho.
     */

    if (
        produto.tamanhos &&
        produto.tamanhos.length > 0 &&
        !tamanho
    ) {

        alert(
            "Selecione um tamanho."
        );

        return;
    }


    /*
     * O carrinho.js precisa estar
     * carregado antes deste arquivo
     * executar esta função.
     */

    if (
        typeof adicionarProdutoCarrinho !==
        "function"
    ) {

        console.error(
            "A função adicionarProdutoCarrinho() " +
            "não foi encontrada."
        );

        alert(
            "Erro ao carregar o carrinho."
        );

        return;
    }


    /*
     * Adiciona o produto.
     */

    adicionarProdutoCarrinho(
        produto,
        tamanho,
        quantidade
    );


    /*
     * Atualiza o contador.
     */

    if (
        typeof atualizarContadorCarrinho ===
        "function"
    ) {

        atualizarContadorCarrinho();

    }


    /*
     * Atualiza o drawer caso ele
     * esteja disponível.
     */

    if (
        typeof renderizarDrawerCarrinho ===
        "function"
    ) {

        renderizarDrawerCarrinho();

    }


    /*
     * Abre o carrinho para o cliente
     * visualizar o produto adicionado.
     */

    if (
        typeof abrirDrawer ===
        "function"
    ) {

        abrirDrawer();

    }

}


/* ============================================
   INICIALIZAÇÃO DA VITRINE
============================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderizarProdutos();

    }
);