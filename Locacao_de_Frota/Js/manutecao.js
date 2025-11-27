function buscarEPreencherDadosDoVeiculo() {
    const placaInput = document.getElementById("placa");
    const modeloInput = document.getElementById("modelo");
    const statusInput = document.getElementById("status");

    const frota = JSON.parse(localStorage.getItem("frota")) || [];
    const placaBuscada = placaInput.value.toUpperCase().trim();

    modeloInput.value = "";
    statusInput.value = "";
    modeloInput.dataset.valido = "false";

    if (!placaBuscada) return;

    const veiculo = frota.find(v => v.placa.toUpperCase() === placaBuscada);

    if (!veiculo) {
        alert(`❌ A placa "${placaBuscada}" não está cadastrada.`);
        return;
    }

    modeloInput.value = veiculo.modelo;
    statusInput.value = veiculo.status;
    modeloInput.dataset.valido = "true";
}

document.addEventListener("DOMContentLoaded", () => {
    const placaInput = document.getElementById("placa");

    placaInput.addEventListener("blur", buscarEPreencherDadosDoVeiculo);

    placaInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            buscarEPreencherDadosDoVeiculo();
        }
    });

    const form = document.getElementById("formManutencao");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const modeloInput = document.getElementById("modelo");
            if (modeloInput.dataset.valido !== "true") {
                alert("❌ Só é possível registrar manutenção de veículos cadastrados.");
                return;
            }

            const placa = document.getElementById("placa").value;
            const modelo = document.getElementById("modelo").value;
            const status = document.getElementById("status").value;
            const tipo = document.getElementById("Tipo_de_serviços").value;
            const descricao = document.getElementById("Descrição").value;

            const manutencao = {
                placa: placa,
                modelo: modelo,
                status: status,
                tipo: tipo,
                descricao: descricao,
                data: new Date().toLocaleString()
            };

            salvarManutencao(manutencao);

            alert("Manutenção registrada com sucesso!");
            form.reset();
        });
    }
});

document.getElementById("btn-historico").addEventListener("click", () => {
    document.getElementById("caixaHistorico").style.right = "0";
    carregarHistorico();
});

document.getElementById("fecharHistorico").addEventListener("click", () => {
    document.getElementById("caixaHistorico").style.right = "-450px";
});

function salvarManutencao(dados) {
    const historico = JSON.parse(localStorage.getItem("historicoManutencao")) || [];
    historico.push(dados);
    localStorage.setItem("historicoManutencao", JSON.stringify(historico));
}

function carregarHistorico() {
    const lista = document.getElementById("listaHistorico");
    lista.innerHTML = "";

    const historico = JSON.parse(localStorage.getItem("historicoManutencao")) || [];

    if (historico.length === 0) {
        lista.innerHTML = "<p>Nenhuma manutenção registrada.</p>";
        return;
    }

    historico.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item-historico");

        div.innerHTML = `
            <b>Placa:</b> ${item.placa}<br>
            <b>Modelo:</b> ${item.modelo}<br>
            <b>Status:</b> ${item.status}<br>
            <b>Tipo:</b> ${item.tipo}<br>
            <b>Descrição:</b> ${item.descricao}<br>
            <b>Data:</b> ${item.data}
        `;

        lista.appendChild(div);
    });
}
