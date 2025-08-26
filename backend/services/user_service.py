import sqlite3
import bcrypt

def get_db():
    conn = sqlite3.connect('backend/database.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            query TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def create_user(username, password):
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    conn = get_db()
    try:
        conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False

def verify_user(username, password):
    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    if user and bcrypt.checkpw(password.encode(), user['password']):
        return dict(user)
    return None

def get_user_profile(user_id):
    conn = get_db()
    user = conn.execute('SELECT id, username FROM users WHERE id = ?', (user_id,)).fetchone()
    return dict(user) if user else None

def get_user_history(user_id):
    conn = get_db()
    rows = conn.execute('SELECT query, timestamp FROM history WHERE user_id = ?', (user_id,))
    return [dict(row) for row in rows]

def save_search(user_id, query):
    conn = get_db()
    conn.execute(
        'INSERT INTO history (user_id, query) VALUES (?, ?)',
        (user_id, query)
    )
    conn.commit()
    conn.close()