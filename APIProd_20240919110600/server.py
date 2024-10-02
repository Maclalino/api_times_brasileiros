from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
import yaml

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///banco.db'
db = SQLAlchemy(app)
CORS(app)

# Configuração do Swagger
SWAGGER_URL = '/apidocs'  # URL para acessar a documentação da API via Swagger
API_URL = '/static/swagger.yml'  # Caminho do arquivo YAML da documentação
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "API de Times de Futebol"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Modelo Time
class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    estado = db.Column(db.String(50), nullable=False)
    titulos = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'estado': self.estado,
            'titulos': self.titulos,
        }

# Rota para a página HTML principal
@app.route('/')
def index():
    return render_template('index.html')

# Rota para obter todos os times
@app.route('/times', methods=['GET'])
def get_times():
    times = Time.query.all()
    return jsonify([time.serialize() for time in times])

# Rota para obter um time específico por ID
@app.route('/times/<int:time_id>', methods=['GET'])
def get_time(time_id):
    time = Time.query.get(time_id)
    if time is None:
        return jsonify({'mensagem': 'Time não encontrado'}), 404
    return jsonify(time.serialize())

# Rota para criar um novo time
@app.route('/times', methods=['POST'])
def create_time():
    dados = request.get_json()
    novo_time = Time(nome=dados['nome'], estado=dados['estado'], titulos=dados['titulos'])
    db.session.add(novo_time)
    db.session.commit()
    return jsonify(novo_time.serialize()), 201

# Rota para atualizar um time existente
@app.route('/times/<int:time_id>', methods=['PUT'])
def update_time(time_id):
    dados = request.get_json()
    time = Time.query.get(time_id)
    if time is None:
        return jsonify({'mensagem': 'Time não encontrado'}), 404
    time.nome = dados['nome']
    time.estado = dados['estado']
    time.titulos = dados['titulos']
    db.session.commit()
    return jsonify(time.serialize())

# Rota para deletar um time
@app.route('/times/<int:time_id>', methods=['DELETE'])
def delete_time(time_id):
    time = Time.query.get(time_id)
    if time is None:
        return jsonify({'mensagem': 'Time não encontrado'}), 404
    db.session.delete(time)
    db.session.commit()
    return jsonify({'mensagem': 'Time excluído com sucesso'}), 200

# Inicializa o servidor
if __name__ == '__main__':
    app.run(debug=True)
