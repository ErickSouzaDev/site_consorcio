document.getElementById('consorcioForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const valorCota = parseFloat(document.getElementById('valorCota').value);
    const numParticipantes = parseInt(document.getElementById('numParticipantes').value);
    const dataVencimento = document.getElementById('dataVencimento').value;
    const ordemContemplados = Array.from({ length: numParticipantes }, (_, i) => i + 1).join(',');

    fetch('http://localhost:3000/consorcio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ valorCota, numParticipantes, dataVencimento, ordemContemplados })
    })
    .then(response => response.json())
    .then(data => {
        const valorPorParticipante = (valorCota / numParticipantes).toFixed(2);
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Resultados</h2>
            <p>Valor da Cota: R$ ${valorCota.toFixed(2)}</p>
            <p>Número de Participantes: ${numParticipantes}</p>
            <p>Valor a ser pago por cada participante: R$ ${valorPorParticipante}</p>
            <p>Data de Vencimento: ${dataVencimento}</p>
            <h3>Ordem dos Contemplados:</