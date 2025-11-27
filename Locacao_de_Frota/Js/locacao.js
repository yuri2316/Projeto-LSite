// === INICIALIZAÇÃO ===
function carregarTabela() {
  let frota = JSON.parse(localStorage.getItem("frota")) || [];

  const tbody = document.getElementById("tabela-frota");
  tbody.innerHTML = "";

  // Monta a tabela
  frota.forEach((carro) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${carro.placa}</td>
      <td>${carro.marca}</td>
      <td>${carro.modelo}</td>
      <td>${carro.combustivel}</td>
      <td>${carro.ano}</td>
      <td>${carro.status}</td>
      <td>
        <button class="btn-editar" onclick="abrirFormulario('${carro.placa}')">
          <i class="bi bi-pencil-square"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// === LOGOUT ===
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Você saiu do site!");
  window.location.href = "../logins.html";
});

// === MODAL ===
function abrirFormulario(placa) {
  const modal = document.getElementById("modal");
  const form = document.getElementById("form-editar");
  let frota = JSON.parse(localStorage.getItem("frota")) || [];
  const carro = frota.find(c => c.placa === placa);

  form.setAttribute("data-placa", placa);

  if (carro) {
    document.getElementById("motorista").value = carro.motorista || "";
    document.getElementById("habilitacao").value = carro.habilitacao || "";
    document.getElementById("dataSaida").value = carro.dataSaida || "";
    document.getElementById("horaSaida").value = carro.horaSaida || "";
    document.getElementById("dataRetorno").value = carro.dataRetorno || "";
    document.getElementById("horaRetorno").value = carro.horaRetorno || "";
    document.getElementById("valor").value = carro.valor || "";
  }

  modal.style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("form-editar").reset();
}

// === SALVAR EDIÇÃO (Atualiza status para "Em Uso") ===
document.getElementById("form-editar").addEventListener("submit", function (event) {
  event.preventDefault();

  const placa = this.getAttribute("data-placa");
  let frota = JSON.parse(localStorage.getItem("frota")) || [];

  const motorista = document.getElementById("motorista").value;
  const habilitacao = document.getElementById("habilitacao").value;
  const dataSaida = document.getElementById("dataSaida").value;
  const horaSaida = document.getElementById("horaSaida").value;
  const dataRetorno = document.getElementById("dataRetorno").value;
  const horaRetorno = document.getElementById("horaRetorno").value;
  const valor = document.getElementById("valor").value;

  frota = frota.map((carro) => {
    if (carro.placa === placa) {
      return {
        ...carro,
        motorista,
        habilitacao,
        dataSaida,
        horaSaida,
        dataRetorno,
        horaRetorno,
        valor,
        status: "Em Uso"
      };
    }
    return carro;
  });

  localStorage.setItem("frota", JSON.stringify(frota));

  alert(`Locação para o veículo ${placa} salva com sucesso! Status: Em Uso.`);
  fecharModal();
  carregarTabela();
});

// === DEVOLUÇÃO (Desvinculação do Motorista e Status para "Disponível") ===
function devolverVeiculo(event) {
  event.preventDefault();

  const placa = document.getElementById("form-editar").getAttribute("data-placa");
  if (!confirm(`Tem certeza que deseja DEVOLVER o veículo ${placa} e desvincular o motorista?`)) {
    return;
  }

  let frota = JSON.parse(localStorage.getItem("frota")) || [];

  frota = frota.map((carro) => {
    if (carro.placa === placa) {
      return {
        ...carro,
        motorista: "",
        habilitacao: "",
        dataSaida: "",
        horaSaida: "",
        dataRetorno: "",
        horaRetorno: "",
        valor: "",
        status: "Disponível"
      };
    }
    return carro;
  });

  localStorage.setItem("frota", JSON.stringify(frota));

  alert(`Veículo ${placa} devolvido com sucesso! Status: Disponível.`);
  fecharModal();
  carregarTabela();
}

// === RESETAR TUDO ===
document.getElementById("btnResetar").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja resetar todas as informações? Isso apagará todos os veículos.")) {
    localStorage.removeItem("frota");
    carregarTabela();
    alert("Tabela de frota resetada com sucesso!");
  }
});


function abrirFormulario(placa) {
  const modal = document.getElementById("modal");
  const form = document.getElementById("form-editar");
  let frota = JSON.parse(localStorage.getItem("frota")) || [];
  const carro = frota.find(c => c.placa === placa);

  // 🔒 BLOQUEIA EDIÇÃO SE NÃO ESTIVER DISPONÍVEL
  const permitidos = ["Disponivel", "Vendas", "Desmobilizado", "Em Uso"];

  if (!permitidos.includes(carro.status)) {
      alert(`O veículo ${placa} não pode ser alterado porque está com status: ${carro.status}`);
      return;
  }

  form.setAttribute("data-placa", placa);

  if (carro) {
    document.getElementById("motorista").value = carro.motorista || "";
    document.getElementById("habilitacao").value = carro.habilitacao || "";
    document.getElementById("dataSaida").value = carro.dataSaida || "";
    document.getElementById("horaSaida").value = carro.horaSaida || "";
    document.getElementById("dataRetorno").value = carro.dataRetorno || "";
    document.getElementById("horaRetorno").value = carro.horaRetorno || "";
    document.getElementById("valor").value = carro.valor || "";
  }

  modal.style.display = "block";
}

carregarTabela();