document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formCadastro");

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");

    const cep = document.getElementById("cep");
    const logradouro = document.getElementById("logradouro");
    const numero = document.getElementById("numero");
    const complemento = document.getElementById("complemento");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");

    const mensagemCadastro = document.getElementById("mensagemCadastro");
    const btnVoltar = document.getElementById("btnVoltar");


    // =====================================================
    // VERIFICA SE EXISTE CARRINHO
    // =====================================================

    function obterCarrinho() {
        try {
            const carrinho = JSON.parse(localStorage.getItem("carrinho"));

            if (Array.isArray(carrinho)) {
                return carrinho;
            }

            return [];
        } catch (erro) {
            console.error("Erro ao carregar o carrinho:", erro);
            return [];
        }
    }


    // =====================================================
    // FORMATA TELEFONE
    // =====================================================

    telefone.addEventListener("input", function () {

        let valor = telefone.value.replace(/\D/g, "");

        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        if (valor.length <= 10) {

            valor = valor.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

            valor = valor.replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );

        } else {

            valor = valor.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

            valor = valor.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );
        }

        telefone.value = valor;
    });


    // =====================================================
    // FORMATA CEP
    // =====================================================

    cep.addEventListener("input", function () {

        let valor = cep.value.replace(/\D/g, "");

        if (valor.length > 8) {
            valor = valor.substring(0, 8);
        }

        if (valor.length > 5) {
            valor = valor.replace(
                /^(\d{5})(\d)/,
                "$1-$2"
            );
        }

        cep.value = valor;
    });


    // =====================================================
    // LIMPA MENSAGEM
    // =====================================================

    function limparMensagem() {

        mensagemCadastro.textContent = "";
        mensagemCadastro.className = "mensagem";
    }


    // =====================================================
    // MOSTRA MENSAGEM
    // =====================================================

    function mostrarMensagem(texto, tipo) {

        mensagemCadastro.textContent = texto;
        mensagemCadastro.className = "mensagem " + tipo;
    }


    // =====================================================
    // MOSTRA ERRO
    // =====================================================

    function mostrarErro(campo, mensagem) {

        const erro = document.getElementById("erro" +
            campo.charAt(0).toUpperCase() +
            campo.slice(1)
        );

        if (erro) {
            erro.textContent = mensagem;
        }

        const elemento = document.getElementById(campo);

        if (elemento) {
            elemento.classList.add("campo-erro");
        }
    }


    // =====================================================
    // LIMPA ERRO
    // =====================================================

    function limparErros() {

        const erros = document.querySelectorAll(".erro");

        erros.forEach(function (erro) {
            erro.textContent = "";
        });

        const campos = document.querySelectorAll(
            "input, select"
        );

        campos.forEach(function (campo) {
            campo.classList.remove("campo-erro");
        });
    }


    // =====================================================
    // VALIDA E-MAIL
    // =====================================================

    function emailValido(valor) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(valor);
    }


    // =====================================================
    // VALIDA TELEFONE
    // =====================================================

    function telefoneValido(valor) {

        const numeros =
            valor.replace(/\D/g, "");

        return numeros.length === 10 ||
               numeros.length === 11;
    }


    // =====================================================
    // VALIDA CEP
    // =====================================================

    function cepValido(valor) {

        const numeros =
            valor.replace(/\D/g, "");

        return numeros.length === 8;
    }


    // =====================================================
    // BUSCA CEP
    // =====================================================

    async function buscarCep() {

        const valorCep =
            cep.value.replace(/\D/g, "");

        if (valorCep.length !== 8) {
            return;
        }

        try {

            mostrarMensagem(
                "Consultando endereço...",
                "info"
            );

            const resposta = await fetch(
                `https://viacep.com.br/ws/${valorCep}/json/`
            );

            if (!resposta.ok) {
                throw new Error(
                    "Erro ao consultar o CEP."
                );
            }

            const dados = await resposta.json();

            if (dados.erro) {

                mostrarMensagem(
                    "CEP não encontrado.",
                    "erro"
                );

                return;
            }

            logradouro.value =
                dados.logradouro || "";

            bairro.value =
                dados.bairro || "";

            cidade.value =
                dados.localidade || "";

            estado.value =
                dados.uf || "";

            mostrarMensagem(
                "Endereço encontrado!",
                "sucesso"
            );

            setTimeout(function () {
                limparMensagem();
            }, 2000);

        } catch (erro) {

            console.error(
                "Erro ao consultar CEP:",
                erro
            );

            mostrarMensagem(
                "Não foi possível consultar o CEP. Preencha o endereço manualmente.",
                "erro"
            );
        }
    }


    cep.addEventListener("blur", buscarCep);


    // =====================================================
    // VALIDA FORMULÁRIO
    // =====================================================

    function validarFormulario() {

        limparErros();

        let valido = true;

        const nomeValor =
            nome.value.trim();

        const emailValor =
            email.value.trim();

        const telefoneValor =
            telefone.value.trim();

        const cepValor =
            cep.value.trim();

        const logradouroValor =
            logradouro.value.trim();

        const numeroValor =
            numero.value.trim();

        const bairroValor =
            bairro.value.trim();

        const cidadeValor =
            cidade.value.trim();

        const estadoValor =
            estado.value;


        if (nomeValor.length < 3) {

            mostrarErro(
                "nome",
                "Digite seu nome completo."
            );

            valido = false;
        }


        if (!emailValido(emailValor)) {

            mostrarErro(
                "email",
                "Digite um e-mail válido."
            );

            valido = false;
        }


        if (!telefoneValido(telefoneValor)) {

            mostrarErro(
                "telefone",
                "Digite um telefone válido."
            );

            valido = false;
        }


        if (!cepValido(cepValor)) {

            mostrarErro(
                "cep",
                "Digite um CEP válido."
            );

            valido = false;
        }


        if (logradouroValor.length < 3) {

            mostrarErro(
                "logradouro",
                "Digite o endereço."
            );

            valido = false;
        }


        if (numeroValor.length === 0) {

            mostrarErro(
                "numero",
                "Digite o número."
            );

            valido = false;
        }


        if (bairroValor.length < 2) {

            mostrarErro(
                "bairro",
                "Digite o bairro."
            );

            valido = false;
        }


        if (cidadeValor.length < 2) {

            mostrarErro(
                "cidade",
                "Digite a cidade."
            );

            valido = false;
        }


        if (!estadoValor) {

            mostrarErro(
                "estado",
                "Selecione o estado."
            );

            valido = false;
        }


        return valido;
    }


    // =====================================================
    // ENVIO DO FORMULÁRIO
    // =====================================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        limparMensagem();

        const carrinho =
            obterCarrinho();


        // Não permite continuar sem produtos
        if (carrinho.length === 0) {

            mostrarMensagem(
                "Seu carrinho está vazio. Adicione produtos antes de continuar.",
                "erro"
            );

            return;
        }


        // Valida os dados
        if (!validarFormulario()) {

            mostrarMensagem(
                "Confira os dados preenchidos.",
                "erro"
            );

            return;
        }


        // =================================================
        // MONTA OS DADOS DO CLIENTE
        // =================================================

        const cliente = {

            nome:
                nome.value.trim(),

            email:
                email.value.trim(),

            telefone:
                telefone.value.trim(),

            endereco: {

                cep:
                    cep.value.trim(),

                logradouro:
                    logradouro.value.trim(),

                numero:
                    numero.value.trim(),

                complemento:
                    complemento.value.trim(),

                bairro:
                    bairro.value.trim(),

                cidade:
                    cidade.value.trim(),

                estado:
                    estado.value
            }
        };


        // =================================================
        // SALVA CLIENTE NO LOCALSTORAGE
        // =================================================

        try {

            localStorage.setItem(
                "cliente",
                JSON.stringify(cliente)
            );

        } catch (erro) {

            console.error(
                "Erro ao salvar cliente:",
                erro
            );

            mostrarMensagem(
                "Não foi possível salvar seus dados.",
                "erro"
            );

            return;
        }


        // =================================================
        // AVISA QUE ESTÁ INDO PARA PAGAMENTO
        // =================================================

        mostrarMensagem(
            "Cadastro realizado! Redirecionando para o pagamento...",
            "sucesso"
        );


        // =================================================
        // REDIRECIONA
        // =================================================

        setTimeout(function () {

            window.location.href =
                "pagamento.html";

        }, 1000);

    });


    // =====================================================
    // BOTÃO VOLTAR PARA O CARRINHO
    // =====================================================

    btnVoltar.addEventListener("click", function () {

        window.location.href =
            "carrinho.html";

    });


    // =====================================================
    // CARREGA DADOS SALVOS ANTERIORMENTE
    // =====================================================

    function carregarCliente() {

        try {

            const clienteSalvo =
                JSON.parse(
                    localStorage.getItem("cliente")
                );

            if (!clienteSalvo) {
                return;
            }


            if (clienteSalvo.nome) {
                nome.value =
                    clienteSalvo.nome;
            }


            if (clienteSalvo.email) {
                email.value =
                    clienteSalvo.email;
            }


            if (clienteSalvo.telefone) {
                telefone.value =
                    clienteSalvo.telefone;
            }


            if (clienteSalvo.endereco) {

                const endereco =
                    clienteSalvo.endereco;


                cep.value =
                    endereco.cep || "";

                logradouro.value =
                    endereco.logradouro || "";

                numero.value =
                    endereco.numero || "";

                complemento.value =
                    endereco.complemento || "";

                bairro.value =
                    endereco.bairro || "";

                cidade.value =
                    endereco.cidade || "";

                estado.value =
                    endereco.estado || "";
            }

        } catch (erro) {

            console.error(
                "Erro ao carregar dados do cliente:",
                erro
            );
        }
    }


    // =====================================================
    // INICIALIZA
    // =====================================================

    carregarCliente();

});