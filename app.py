from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Rota principal que renderiza o index.html
# O index.html agora usará {% include %} para trazer o conteúdo das outras abas
@app.route('/')
def index():
    return render_template('index.html')

# Esta rota de API continua necessária para processar o formulário de cadastro de paciente
@app.route('/api/cadastrar_paciente', methods=['POST'])
def cadastrar_paciente():
    data = request.get_json()
    nome = data.get('nomePaciente')
    telefone = data.get('telefone')
    print(f"Recebido novo paciente: {nome}, Telefone: {telefone}")
    # Você adicionaria aqui a lógica para salvar o paciente em um banco de dados, etc.
    return jsonify({"message": "Paciente cadastrado com sucesso!", "status": "success"})

if __name__ == '__main__':
    app.run(debug=True)