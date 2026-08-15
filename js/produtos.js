javascript
/*
 * ============================================
 * PRODUTOS DA PAPELARIA MARIANA
 * ============================================
 */

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


/*
 * Formata valores para Real brasileiro.
 */

function formatarMoeda(valor) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(valor);

}


/*
 * Procura um produto pelo ID.
 */

function buscarProdutoPorId(id) {

    return produtos.find(
        produto => produto.id === id
    );

}

