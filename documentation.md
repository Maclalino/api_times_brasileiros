# Documentação da API de Times Brasileiros

## Base URL


## Formato da Resposta
Todas as respostas da API estão no formato JSON.

## Endpoints

### 1. Listar Todos os Times
- **URL:** `/times`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de todos os times cadastrados.
- **Resposta de Sucesso:**
  - **Código:** `200 OK`
  - **Corpo:**
    ```json
    [
      {
        "id": 1,
        "nome": "Flamengo",
        "estado": "Rio de Janeiro",
        "titulos": 38
      },
      {
        "id": 2,
        "nome": "Palmeiras",
        "estado": "São Paulo",
        "titulos": 10
      }
    ]
    ```

### 2. Consultar um Time Específico
- **URL:** `/times/<int:time_id>`
- **Método:** `GET`
- **Parâmetros:**
  - `time_id`: ID do time que você quer consultar.
- **Descrição:** Retorna os detalhes de um time específico.
- **Resposta de Sucesso:**
  - **Código:** `200 OK`
  - **Corpo:**
    ```json
    {
      "id": 1,
      "nome": "Flamengo",
      "estado": "Rio de Janeiro",
      "titulos": 38
    }
    ```
- **Resposta de Erro:**
  - **Código:** `404 Not Found`
  - **Corpo:**
    ```json
    {
      "mensagem": "Time não encontrado"
    }
    ```

### 3. Adicionar um Novo Time
- **URL:** `/times`
- **Método:** `POST`
- **Corpo da Requisição:**
    ```json
    {
      "nome": "Nome do Time",
      "estado": "Estado do Time",
      "titulos": Número de Títulos
    }
    ```
- **Descrição:** Adiciona um novo time ao banco de dados.
- **Resposta de Sucesso:**
  - **Código:** `201 Created`
  - **Corpo:**
    ```json
    {
      "id": 3,
      "nome": "Nome do Time",
      "estado": "Estado do Time",
      "titulos": Número de Títulos
    }
    ```

### 4. Atualizar um Time Existente
- **URL:** `/times/<int:time_id>`
- **Método:** `PUT`
- **Parâmetros:**
  - `time_id`: ID do time que você deseja atualizar.
- **Corpo da Requisição:**
    ```json
    {
      "nome": "Novo Nome do Time",
      "estado": "Novo Estado",
      "titulos": Novo Número de Títulos
    }
    ```
- **Descrição:** Atualiza os dados de um time existente.
- **Resposta de Sucesso:**
  - **Código:** `200 OK`
  - **Corpo:**
    ```json
    {
      "id": 1,
      "nome": "Novo Nome do Time",
      "estado": "Novo Estado",
      "titulos": Novo Número de Títulos
    }
    ```
- **Resposta de Erro:**
  - **Código:** `404 Not Found`
  - **Corpo:**
    ```json
    {
      "mensagem": "Time não encontrado"
    }
    ```

### 5. Deletar um Time
- **URL:** `/times/<int:time_id>`
- **Método:** `DELETE`
- **Parâmetros:**
  - `time_id`: ID do time que você deseja deletar.
- **Descrição:** Remove um time do banco de dados.
- **Resposta de Sucesso:**
  - **Código:** `200 OK`
  - **Corpo:**
    ```json
    {
      "mensagem": "Time excluído com sucesso"
    }
    ```
- **Resposta de Erro:**
  - **Código:** `404 Not Found`
  - **Corpo:**
    ```json
    {
      "mensagem": "Time não encontrado"
    }
    ```

---

### Notas
- Todos os métodos devem ser testados com um cliente HTTP, como Postman ou através de chamadas AJAX no seu frontend.
- Certifique-se de que o servidor Flask esteja rodando antes de fazer as requisições.
