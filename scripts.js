let treinos = JSON.parse(localStorage.getItem("treinos")) || [
    {
        nome: "Supino",
        series: 3,
        repeticoes: 12,
        carga: 20,
        concluido: false
    },
    {
        nome: "Agachamento",
        series: 3,
        repeticoes: 10,
        carga: 30,
        concluido: false
    },
    {
        nome: "Esteira",
        series: 1,
        repeticoes: 20,
        carga: 0,
        concluido: false
    }
];
function mostrarTreino() {

    let lista = document.getElementById("listaTreino");

    lista.innerHTML = "";

    treinos.forEach(function(treino, indice) {

        let classe = treino.concluido ? "concluido" : "";

        lista.innerHTML += `
        <div class="col-md-4 mb-3">
            <div class="card p-3 exercicio ${classe}">

                <h5>💪 ${treino.nome}</h5>

                <p>
                    <strong>Séries:</strong> ${treino.series}<br>
                    <strong>Repetições:</strong> ${treino.repeticoes}<br>
                    <strong>Carga:</strong> ${treino.carga} kg
                </p>

                <button
                    class="btn ${treino.concluido ? 'btn-secondary' : 'btn-success'}"
                    onclick="concluirTreino(${indice})">

                    ${treino.concluido ? "✓ Concluído" : "Concluir exercício"}

                </button>

            </div>
        </div>
        `;
    });

    atualizarResumo();
}
function concluirTreino(indice) {

    treinos[indice].concluido = !treinos[indice].concluido;

    salvarTreinos();

    mostrarTreino();

    mostrarProfessor();
}
function adicionarTreino() {

    let nome = document.getElementById("exercicio").value;
    let series = document.getElementById("series").value;
    let repeticoes = document.getElementById("repeticoes").value;
    let carga = document.getElementById("carga").value;

    if (nome == "" || series == "" || repeticoes == "") {

        alert("Preencha os campos!");

        return;
    }

    treinos.push({
        nome: nome,
        series: series,
        repeticoes: repeticoes,
        carga: carga || 0,
        concluido: false
    });

    salvarTreinos();

    document.getElementById("exercicio").value = "";
    document.getElementById("series").value = "";
    document.getElementById("repeticoes").value = "";
    document.getElementById("carga").value = "";

    mostrarTreino();
    mostrarProfessor();

    alert("Exercício adicionado!");

    let modal = bootstrap.Modal.getInstance(
        document.getElementById("modalTreino")
    );

    modal.hide();
}
function salvarTreinos() {

    localStorage.setItem(
        "treinos",
        JSON.stringify(treinos)
    );
}
function mostrarProfessor() {

    let lista = document.getElementById("listaProfessor");

    lista.innerHTML = "";

    treinos.forEach(function(treino, indice) {

        lista.innerHTML += `
        <div class="alert alert-light">

            <strong>${treino.nome}</strong>

            <br>

            ${treino.series} séries |
            ${treino.repeticoes} repetições |
            ${treino.carga} kg

            <button
                class="btn btn-danger btn-sm float-end"
                onclick="excluirTreino(${indice})">

                Excluir

            </button>

        </div>
        `;
    });
}
function excluirTreino(indice) {

    if (confirm("Deseja excluir este exercício?")) {

        treinos.splice(indice, 1);

        salvarTreinos();

        mostrarTreino();
        mostrarProfessor();
    }
}
function salvarEvolucao() {

    let peso = Number(document.getElementById("peso").value);
    let meta = Number(document.getElementById("meta").value);

    if (peso <= 0 || meta <= 0) {

        alert("Digite valores válidos.");

        return;
    }

    localStorage.setItem("peso", peso);
    localStorage.setItem("meta", meta);

    atualizarEvolucao();

    alert("Evolução salva!");
}
function atualizarEvolucao() {

    let peso = Number(localStorage.getItem("peso"));
    let meta = Number(localStorage.getItem("meta"));

    if (!peso || !meta) {
        return;
    }

    let progresso;

    if (peso > meta) {
        progresso = ((peso - meta) / peso) * 100;
    } else {
        progresso = 100;
    }

    progresso = Math.round(progresso);

    if (progresso > 100) {
        progresso = 100;
    }

    document.getElementById("barraProgresso").style.width =
        progresso + "%";

    document.getElementById("barraProgresso").innerText =
        progresso + "%";

    document.getElementById("textoEvolucao").innerHTML =
        "Peso atual: <strong>" + peso +
        " kg</strong> | Meta: <strong>" +
        meta + " kg</strong>";

    document.getElementById("textoMeta").innerText =
        meta + " kg";
}
function atualizarResumo() {

    let total = treinos.length;

    let concluidos = treinos.filter(function(treino) {
        return treino.concluido;
    }).length;

    document.getElementById("totalTreinos").innerText =
        total + " exercícios";

    document.getElementById("totalConcluidos").innerText =
        concluidos + " exercícios";
}
window.onload = function() {

    let peso = localStorage.getItem("peso");
    let meta = localStorage.getItem("meta");

    if (peso && meta) {

        document.getElementById("peso").value = peso;
        document.getElementById("meta").value = meta;
    }

    mostrarTreino();
    mostrarProfessor();
    atualizarEvolucao();
};