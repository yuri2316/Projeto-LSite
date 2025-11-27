// Pegando o formulário
const form = document.querySelector("form");

// Carrega dados automaticamente ao digitar a placa
document.getElementById("placa").addEventListener("blur", function () {
    const placa = this.value.trim().toUpperCase();
    if (!placa) return;

    let frota = JSON.parse(localStorage.getItem("frota")) || [];
    const carroExistente = frota.find(c => c.placa === placa);

    if (carroExistente) {
        // Preenche os campos com os dados já cadastrados
        document.getElementById("marca").value = carroExistente.marca;
        document.getElementById("modelo").value = carroExistente.modelo;
        document.getElementById("combustivel").value = carroExistente.combustivel;
        document.getElementById("ano").value = carroExistente.ano;
        document.getElementById("status").value = carroExistente.status;

        alert(`Dados carregados da placa: ${placa}`);
    }
});

// Validar e salvar
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const placa = document.getElementById("placa").value.trim().toUpperCase();
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const combustivel = document.getElementById("combustivel").value.trim();
    const ano = document.getElementById("ano").value.trim();
    const status = document.getElementById("status").value.trim();

    // 🔴 VERIFICAÇÃO DOS CAMPOS OBRIGATÓRIOS
    if (!placa || !marca || !modelo || !combustivel || !ano || !status) {
        alert("Por favor, preencha todos os campos antes de cadastrar.");
        return;
    }

    let frota = JSON.parse(localStorage.getItem("frota")) || [];

    // Verifica se a placa já existe
    const index = frota.findIndex(c => c.placa === placa);

    const dados = { placa, marca, modelo, combustivel, ano, status };

    if (index >= 0) {
        // 🔁 Atualiza o veículo existente
        frota[index] = dados;
        alert("Veículo atualizado com sucesso!");
    } else {
        // ➕ Adiciona novo veículo
        frota.push(dados);
        alert("Veículo cadastrado com sucesso!");
    }

    localStorage.setItem("frota", JSON.stringify(frota));
    window.location.href = "index_locacao.html";
});
