/*
 * ============================================
 * SISTEMA DE CARRINHO
 * PAPELARIA MARIANA
 * ============================================
 */

const CHAVE_CARRINHO = "carrinho";


/*
 * Retorna o carrinho salvo no navegador.
 */

function obterCarrinho() {

    try {

        return JSON.parse(
            localStorage.getItem(CHAVE_CARRINHO)
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
 * Salva o carrinho no navegador.
 */

function salvarCarrinho(carrinho) {

    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );

}


/*
 * Remove todo o carrinho.
 */

function limparCarrinho() {

    localStorage.removeItem(
        CHAVE_CARRINHO
    );

}


/*
 * Retorna a quantidade total de produtos.
 */

function quantidadeTotalCarrinho() {

    const carrinho =
        obterCarrinho();

    return carrinho.reduce(
        (total, item) =>
            total + item.quantidade,
        0
    );

}


/*
 * Calcula o valor total do carrinho.
 */

function calcularTotalCarrinho() {

    const carrinho =
        obterCarrinho();

    return carrinho.reduce(
        (total, item) =>
            total +
            (item.preco * item.quantidade),
        0
    );

}


/*
 * Adiciona um produto ao carrinho.
 */

function adicionarProdutoCarrinho(
    produto,
    tamanho,
    quantidade
) {

    const carrinho =
        obterCarrinho();

    const itemExistente =
        carrinho.find(item =>
            item.produtoId === produto.id &&
            item.tamanho === tamanho
        );

    if (itemExistente) {

        itemExistente.quantidade += quantidade;

    } else {

        carrinho.push({

            produtoId: produto.id,

            nome: produto.nome,

            preco: produto.preco,

            tamanho: tamanho,

            quantidade: quantidade

        });

    }

    salvarCarrinho(carrinho);

}


/*
 * Altera a quantidade de um item.
 */

function alterarQuantidadeCarrinho(
    index,
    mudanca
) {

    const carrinho =
        obterCarrinho();

    if (!carrinho[index]) {
        return;
    }

    carrinho[index].quantidade += mudanca;

    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }

    salvarCarrinho(carrinho);

}


/*
 * Remove um item específico.
 */

function removerItemCarrinho(index) {

    const carrinho =
        obterCarrinho();

    if (!carrinho[index]) {
        return;
    }

    carrinho.splice(index, 1);

    salvarCarrinho(carrinho);

}


/*
 * Atualiza o contador do carrinho.
 */

function atualizarContadorCarrinho() {

    const contador =
        document.getElementById(
            "badge-total"
        );

    if (!contador) {
        return;
    }

    contador.innerText =
        quantidadeTotalCarrinho();

}


/*
 * Renderiza o carrinho lateral.
 */

function renderizarDrawerCarrinho() {

    const container =
        document.getElementById(
            "drawerItems"
        );

    const totalElemento =
        document.getElementById(
            "drawerTotal"
        );

    if (!container) {
        return;
    }

    const carrinho =
        obterCarrinho();

    if (carrinho.length === 0) {

        container.innerHTML = `
            <p style="
                text-align:center;
                color:#888;
                margin-top:40px;
            ">
                Seu carrinho está vazio.
            </p>
        `;

        if (totalElemento) {
            totalElemento.innerText =
                formatarMoeda(0);
        }

        return;
    }

    container.innerHTML = "";

    carrinho.forEach(
        (item, index) => {

            const subtotal =
                item.preco *
                item.quantidade;

            const elemento =
                document.createElement("div");

            elemento.className =
                "item-drawer";

            elemento.innerHTML = `

                <div class="item-info">

                    <h4>
                        ${item.nome}
                    </h4>

                    <p>
                        Tamanho:
                        ${item.tamanho}
                    </p>

                    <p>
                        ${formatarMoeda(item.preco)}
                    </p>

                    <button
                        class="btn-remover-sm"
                        onclick="removerItemDrawer(${index})">

                        Remover

                    </button>

                </div>

                <div class="qtd-controle">

                    <button
                        class="qtd-btn"
                        onclick="alterarItemDrawer(${index}, -1)">
                        -
                    </button>

                    <strong>
                        ${item.quantidade}
                    </strong>

                    <button
                        class="qtd-btn"
                        onclick="alterarItemDrawer(${index}, 1)">
                        +
                    </button>

                </div>
            `;

            container.appendChild(elemento);

        }
    );

    if (totalElemento) {

        totalElemento.innerText =
            formatarMoeda(
                calcularTotalCarrinho()
            );

    }

}


/*
 * Funções utilizadas pelos botões
 * do drawer.
 */

function alterarItemDrawer(
    index,
    mudanca
) {

    alterarQuantidadeCarrinho(
        index,
        mudanca
    );

    atualizarContadorCarrinho();

    renderizarDrawerCarrinho();

}


function removerItemDrawer(index) {

    removerItemCarrinho(index);

    atualizarContadorCarrinho();

    renderizarDrawerCarrinho();

}


/*
 * Abre o drawer.
 */

function abrirDrawer() {

    const drawer =
        document.getElementById(
            "cartDrawer"
        );

    const overlay =
        document.getElementById(
            "drawerOverlay"
        );

    if (drawer) {
        drawer.classList.add("ativo");
    }

    if (overlay) {
        overlay.classList.add("ativo");
    }

    renderizarDrawerCarrinho();

}


/*
 * Fecha o drawer.
 */

function fecharDrawer() {

    const drawer =
        document.getElementById(
            "cartDrawer"
        );

    const overlay =
        document.getElementById(
            "drawerOverlay"
        );

    if (drawer) {
        drawer.classList.remove("ativo");
    }

    if (overlay) {
        overlay.classList.remove("ativo");
    }

}


/*
 * Inicialização.
 */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarContadorCarrinho();

        renderizarDrawerCarrinho();

    }
);


/*
 * Atualiza automaticamente se o
 * carrinho for alterado em outra aba.
 */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === CHAVE_CARRINHO
        ) {

            atualizarContadorCarrinho();

            renderizarDrawerCarrinho();

        }

    }
);


/*
 * ESC fecha o drawer.
 */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            fecharDrawer();

        }

    }
);

