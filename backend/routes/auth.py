from services.user_service import (create_user, verify_user, get_user_profile, get_user_history, save_search)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    success = create_user(data['username'], data['password'])
    if success:
        return jsonify({'message': 'Usuário criado com sucesso'})
    return jsonify({'error': 'Usuário já existe'}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = verify_user(data['username'], data['password'])
    if user:
        return jsonify({'id': user['id'], 'username': user['username']})
    return jsonify({'error': 'Credenciais inválidas'}), 401

@auth_bp.route('/profile/<int:user_id>', methods=['GET'])
def profile(user_id):
    user = get_user_profile(user_id)
    if user:
        return jsonify(user)
    return jsonify({'error': 'Usuário não encontrado'}), 404

@auth_bp.route('/history/<int:user_id>', methods=['GET'])
def history(user_id):
    history = get_user_history(user_id)
    return jsonify(history)

@auth_bp.route('/search', methods=['POST'])
def register_search():
    data = request.json
    user_id = data.get('user_id')
    query = data.get('query')

    if not user_id or not query:
        return jsonify({'error': 'user_id e query são obrigatórios'}), 400

    save_search(user_id, query)
    return jsonify({'message': 'Busca registrada com sucesso'})

def save_search(user_id, query):
    conn = get_db()
    conn.execute(
        'INSERT INTO history (user_id, query) VALUES (?, ?)',
        (user_id, query)
    )
    conn.commit()
    conn.close()