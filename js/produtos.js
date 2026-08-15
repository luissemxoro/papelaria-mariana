/* ============================================
   PRODUTOS
============================================ */

const produtos = [
    {
        id: "tenis",
        nome: "Tênis Escolar - Uniforme Escolar",
        preco: 80.58,
        categoria: "Uniformes",
        estoque: 50,
        imagem: "👟",
        tamanhos: ["23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"]
    },
    {
        id: "meia",
        nome: "Meia Escolar - Uniforme Escolar",
        preco: 8.50,
        categoria: "Uniformes",
        estoque: 100,
        imagem: "🧦",
        tamanhos: ["P (23 ao 26)","M (27 ao 32)","G (33 ao 36)","GG (37 ao 40)"]
    },
    {
        id: "moletom",
        nome: "Moletom Escolar - Uniforme Escolar",
        preco: 52.98,
        categoria: "Uniformes",
        estoque: 40,
        imagem: "🧥",
        tamanhos: ["2","4","6","8","10","12","14","P","M","G","GG"]
    },
    {
        id: "camiseta",
        nome: "Camiseta Escolar - Uniforme Escolar",
        preco: 30.00,
        categoria: "Uniformes",
        estoque: 100,
        imagem: "👕",
        tamanhos: ["2","4","6","8","10","12","14","P","M","G","GG"]
    },
    {
        id: "calca",
        nome: "Calça Escolar - Uniforme Escolar",
        preco: 59.90,
        categoria: "Uniformes",
        estoque: 50,
        imagem: "👖",
        tamanhos: ["2","4","6","8","10","12","14","P","M","G","GG"]
    },
    {
        id: "jaqueta",
        nome: "Jaqueta Escolar - Uniforme Escolar",
        preco: 59.90,
        categoria: "Uniformes",
        estoque: 50,
        imagem: "🧥",
        tamanhos: ["2","4","6","8","10","12","14","P","M","G","GG"]
    },
    {
        id: "bermuda",
        nome: "Bermuda Escolar - Uniforme Escolar",
        preco: 36.14,
        categoria: "Uniformes",
        estoque: 60,
        imagem: "🩳",
        tamanhos: ["2","4","6","8","10","12","14","P","M","G","GG"]
    }
];

function renderizarProdutos() {
    const vitrine = document.getElementById("vitrine");
    if (!vitrine) return;

    vitrine.innerHTML = produtos.map(produto => `
        <div class="produto">
            <div>
                <div class="produto-img">${produto.imagem}</div>
                <h3>${produto.nome}</h3>
                <div class="preco">${formatarMoeda(produto.preco)}</div>

                <div class="campo-grupo">
                    <label for="tam-${produto.id}">Tamanho:</label>
                    <select id="tam-${produto.id}">
                        ${produto.tamanhos.map(tamanho =>
                            `<option value="${tamanho}">${tamanho}</option>`
                        ).join("")}
                    </select>
                </div>

                <div class="campo-grupo">
                    <label for="qtd-${produto.id}">Quantidade:</label>
                    <input
                        type="number"
                        id="qtd-${produto.id}"
                        value="1"
                        min="1"
                        max="${produto.estoque}"
                    >
                </div>
            </div>

            <button
                class="btn-add"
                onclick="adicionarProdutoDaVitrine('${produto.id}')">
                Adicionar ao Carrinho
            </button>
        </div>
    `).join("");
}

function adicionarProdutoDaVitrine(id) {
    const produto = produtos.find(item => item.id === id);
    if (!produto) return;

    const tamanho = document.getElementById(`tam-${id}`).value;
    const campoQuantidade = document.getElementById(`qtd-${id}`);
    const quantidade = Number.parseInt(campoQuantidade.value, 10);

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("Informe uma quantidade válida.");
        return;
    }

    if (quantidade > produto.estoque) {
        alert(`Quantidade indisponível. Estoque disponível: ${produto.estoque}.`);
        return;
    }

    adicionarProdutoCarrinho(produto, tamanho, quantidade);

    campoQuantidade.value = 1;
    abrirDrawer();
}

document.addEventListener("DOMContentLoaded", renderizarProdutos);
