const listaTimes = document.getElementById('lista-times'); // Pega a lista onde os times vão aparecer

function carregarTimes() {
    fetch('http://127.0.0.1:5000/times') // Pede os times da API
        .then(response => response.json()) // Converte a resposta em um formato que o JS entende
        .then(times => {
            listaTimes.innerHTML = ''; // Limpa a lista antes de carregar os novos times
            times.forEach(time => { // Para cada time que foi recebido
                const itemTime = document.createElement('li'); // Cria um item de lista
                itemTime.innerHTML = `
                    <span>${time.nome}</span> <!-- Mostra o nome do time -->
                    <button onclick="consultarTime(${time.id})">Consultar</button> <!-- Botão para consultar -->
                    <button onclick="editarTime(${time.id})">Editar</button> <!-- Botão para editar -->
                    <button onclick="deletarTime(${time.id})">Deletar</button> <!-- Botão para deletar -->
                `;
                listaTimes.appendChild(itemTime); // Adiciona o item à lista
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os times:', error); // Mostra erro se não conseguir carregar
            alert('Falha ao carregar os times.'); // Alerta o usuário
        });
}

// Função para consultar detalhes de um time
function consultarTime(id) {
    fetch(`http://127.0.0.1:5000/times/${id}`) // Pede os detalhes do time
        .then(response => response.json()) // Converte a resposta
        .then(time => {
            alert(`Nome: ${time.nome}\nEstado: ${time.estado}\nTítulos: ${time.titulos}`); // Mostra os detalhes do time
        })
        .catch(error => {
            console.error('Erro ao consultar o time:', error); // Mostra erro se não conseguir
            alert('Erro ao consultar o time.'); // Alerta o usuário
        });
}

// Função para editar um time
function editarTime(id) {
    const novoNome = prompt('Digite o novo nome do time:'); // Pergunta o novo nome
    const novoEstado = prompt('Digite o novo estado:'); // Pergunta o novo estado
    const novosTitulos = prompt('Digite o novo número de títulos:'); // Pergunta o novo número de títulos
    
    if (novoNome && novoEstado && novosTitulos) { // Se tudo foi preenchido
        fetch(`http://127.0.0.1:5000/times/${id}`, { // Envia a atualização para o servidor
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Diz que o tipo de dado é JSON
            },
            body: JSON.stringify({
                nome: novoNome,
                estado: novoEstado,
                titulos: parseInt(novosTitulos) // Converte para número
            })
        })
        .then(response => response.json()) // Converte a resposta
        .then(() => {
            alert('Time atualizado com sucesso!'); // Alerta de sucesso
            carregarTimes(); // Atualiza a lista
        })
        .catch(error => {
            console.error('Erro ao editar o time:', error); // Mostra erro se não conseguir
            alert('Erro ao editar o time.'); // Alerta o usuário
        });
    }
}

// Função para deletar um time
function deletarTime(id) {
    if (confirm('Tem certeza que deseja deletar este time?')) { // Pergunta se tem certeza
        fetch(`http://127.0.0.1:5000/times/${id}`, {
            method: 'DELETE' // Envia o pedido para deletar
        })
        .then(response => response.json()) // Converte a resposta
        .then(() => {
            alert('Time deletado com sucesso!'); // Alerta de sucesso
            carregarTimes(); // Atualiza a lista
        })
        .catch(error => {
            console.error('Erro ao deletar o time:', error); // Mostra erro se não conseguir
            alert('Erro ao deletar o time.'); // Alerta o usuário
        });
    }
}

// Função para inserir um novo time
function inserirTime() {
    const nome = document.getElementById('nome-time').value; // Pega o nome do time
    const estado = document.getElementById('estado-time').value; // Pega o estado do time
    const titulos = document.getElementById('titulos-time').value; // Pega os títulos do time

    if (nome && estado && titulos) { // Se tudo foi preenchido
        fetch('http://127.0.0.1:5000/times', {
            method: 'POST', // Envia um novo time
            headers: {
                'Content-Type': 'application/json' // Diz que o tipo de dado é JSON
            },
            body: JSON.stringify({
                nome: nome,
                estado: estado,
                titulos: parseInt(titulos) // Converte para número
            })
        })
        .then(response => response.json()) // Converte a resposta
        .then(() => {
            alert('Time adicionado com sucesso!'); // Alerta de sucesso
            document.getElementById('nome-time').value = ''; // Limpa o campo do nome
            document.getElementById('estado-time').value = ''; // Limpa o campo do estado
            document.getElementById('titulos-time').value = ''; // Limpa o campo dos títulos
            carregarTimes(); // Atualiza a lista
        })
        .catch(error => {
            console.error('Erro ao adicionar o time:', error); // Mostra erro se não conseguir
            alert('Erro ao adicionar o time.'); // Alerta o usuário
        });
    } else {
        alert('Por favor, preencha todos os campos.'); // Pede para preencher tudo
    }
}

// Carrega os times quando a página é aberta
carregarTimes();
