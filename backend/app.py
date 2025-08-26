from flask import Flask
from routes.auth import auth_bp
from routes.anilist import anilist_bp
from services.user_service import init_db

app = Flask(__name__)

# Inicializa o banco de dados (cria tabelas se não existirem)
init_db()

# Registra os blueprints das rotas
app.register_blueprint(auth_bp)
app.register_blueprint(anilist_bp)

# Rota raiz opcional
@app.route('/')
def home():
    return {'message': 'API ANIWATER está rodando!'}

if __name__ == '__main__':
    app.run(debug=True)