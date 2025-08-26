from flask import Blueprint, request, jsonify, make_response
from services.user_service import (create_user,verify_user,get_user_profile,get_user_history,save_search)

auth_bp = Blueprint('auth', __name__)

# 🔐 Registro de usuário
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return make_response(jsonify({'error': 'username e password são obrigatórios'}), 400)

    success = create_user(username, password)
    if success:
        return jsonify({'message': 'Usuário criado com sucesso'}), 201

    return make_response(jsonify({'error': 'Usuário já existe'}), 409)

# 🔑 Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return make_response(jsonify({'error': 'username e password são obrigatórios'}), 400)

    user = verify_user(username, password)
    if user:
        return jsonify({'id': user['id'], 'username': user['username']}), 200

    return make_response(jsonify({'error': 'Credenciais inválidas'}), 401)

# 👤 Perfil do usuário
@auth_bp.route('/profile/<int:user_id>', methods=['GET'])
def profile(user_id):
    user = get_user_profile(user_id)
    if user:
        return jsonify(user), 200

    return make_response(jsonify({'error': 'Usuário não encontrado'}), 404)

# 📜 Histórico de buscas
@auth_bp.route('/history/<int:user_id>', methods=['GET'])
def history(user_id):
    history = get_user_history(user_id)
    return jsonify(history), 200

# 🔍 Registrar busca
@auth_bp.route('/search', methods=['POST'])
def register_search():
    data = request.get_json()
    user_id = data.get('user_id')
    query = data.get('query')

    if not user_id or not query:
        return make_response(jsonify({'error': 'user_id e query são obrigatórios'}), 400)

    save_search(user_id, query)
    return jsonify({'message': 'Busca registrada com sucesso'}), 201