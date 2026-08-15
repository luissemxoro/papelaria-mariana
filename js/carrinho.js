/* ============================================
   CARRINHO
============================================ */

function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(Number(valor) || 0);
}

function obterCarrinho() {
    try {
        const dados = JSON.parse(localStorage.getItem("carrinho"));
        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function calcularTotalCarrinho(carrinho = obterCarrinho()) {
    return carrinho.reduce(
        (total, item) => total + (Number(item.preco) * Number(item.quantidade)),
        0
    );
}

function adicionarProdutoCarrinho(produto, tamanho, quantidade) {
    const carrinho = obterCarrinho();

    const existente = carrinho.find(
        item => item.id === produto.id && item.tamanho === tamanho
    );

    if (existente) {
        existente.quantidade += quantidade;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            tamanho: tamanho,
            quantidade: quantidade
        });
    }

    salvarCarrinho(carrinho);
    atualizarContadorHeader();
    renderizarDrawer();
}

function abrirDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("drawerOverlay");

    if (!drawer || !overlay) return;

    drawer.classList.add("ativo");
    overlay.classList.add("ativo");
    renderizarDrawer();
}

function fecharDrawer() {
    document.getElementById("cartDrawer")?.classList.remove("ativo");
    document.getElementById("drawerOverlay")?.classList.remove("ativo");
}

function alterarQtdDrawer(index, mudanca) {
    const carrinho = obterCarrinho();
    if (!carrinho[index]) return;

    carrinho[index].quantidade += mudanca;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho(carrinho);
    renderizarDrawer();
    atualizarContadorHeader();
}

function renderizarDrawer() {
    const container = document.getElementById("drawerItems");
    const totalElemento = document.getElementById("drawerTotal");

    if (!container || !totalElemento) return;

    const carrinho = obterCarrinho();

    if (carrinho.length === 0) {
        container.innerHTML = `
            <p style="text-align:center;color:#888;margin-top:40px;">
                Seu carrinho está vazio.
            </p>
        `;
        totalElemento.textContent = formatarMoeda(0);
        return;
    }

    container.innerHTML = carrinho.map((item, index) => `
        <div class="item-drawer">
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p>Tamanho: ${item.tamanho}</p>
                <p>${formatarMoeda(item.preco)}</p>
                <button
                    class="btn-remover-sm"
                    onclick="alterarQtdDrawer(${index}, -${item.quantidade})">
                    Remover
                </button>
            </div>

            <div style="display:flex;align-items:center;gap:6px;">
                <button class="qtd-btn"
                        onclick="alterarQtdDrawer(${index}, -1)"
                        aria-label="Diminuir quantidade">-</button>
                <strong>${item.quantidade}</strong>
                <button class="qtd-btn"
                        onclick="alterarQtdDrawer(${index}, 1)"
                        aria-label="Aumentar quantidade">+</button>
            </div>
        </div>
    `).join("");

    totalElemento.textContent = formatarMoeda(calcularTotalCarrinho(carrinho));
}

function atualizarContadorHeader() {
    const badge = document.getElementById("badge-total");
    if (!badge) return;

    const totalItens = obterCarrinho().reduce(
        (total, item) => total + Number(item.quantidade || 0),
        0
    );

    badge.textContent = totalItens;
}

function renderizarCarrinhoPagina() {
    const lista = document.getElementById("lista-carrinho");
    const totalElemento = document.getElementById("preco-total");

    if (!lista || !totalElemento) return;

    const carrinho = obterCarrinho();

    if (carrinho.length === 0) {
        lista.innerHTML = `
            <div class="vazio">
                <h3>Seu carrinho está vazio.</h3>
                <p>Adicione produtos para continuar.</p>
                <a href="index.html">Voltar para a loja</a>
            </div>
        `;
        totalElemento.textContent = formatarMoeda(0);
        return;
    }

    let total = 0;

    lista.innerHTML = carrinho.map((item, index) => {
        const subtotal = Number(item.preco) * Number(item.quantidade);
        total += subtotal;

        return `
            <div class="item-carrinho">
                <div class="detalhes-produto">
                    <h3>${item.nome}</h3>
                    <p>Tamanho: <strong>${item.tamanho}</strong></p>
                    <p>Preço unitário: ${formatarMoeda(item.preco)}</p>

                    <div class="controle">
                        <button onclick="alterarQuantidade(${index}, -1)">-</button>
                        <strong>${item.quantidade}</strong>
                        <button onclick="alterarQuantidade(${index}, 1)">+</button>
                        <button class="remover" onclick="removerItem(${index})">
                            Remover
                        </button>
                    </div>
                </div>

                <div class="preco">${formatarMoeda(subtotal)}</div>
            </div>
        `;
    }).join("");

    totalElemento.textContent = formatarMoeda(total);
}

function alterarQuantidade(index, mudanca) {
    const carrinho = obterCarrinho();
    if (!carrinho[index]) return;

    carrinho[index].quantidade += mudanca;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho(carrinho);
    renderizarCarrinhoPagina();
    atualizarContadorHeader();
}

function removerItem(index) {
    const carrinho = obterCarrinho();
    if (!carrinho[index]) return;

    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);

    renderizarCarrinhoPagina();
    atualizarContadorHeader();
}

function irParaCadastro() {
    if (obterCarrinho().length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    window.location.href = "cadastro.html";
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") fecharDrawer();
});

document.addEventListener("DOMContentLoaded", () => {
    atualizarContadorHeader();
    renderizarDrawer();
    renderizarCarrinhoPagina();
});
