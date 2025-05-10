"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
# Leo: Importar las siguientes librerias
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity
from flask_cors import CORS
from sqlalchemy import select

# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "nuestra_clave_secreta"
jwt = JWTManager(app)  # Inicializar jwt para que funcione dentro del BackEnd
CORS(app)
bcrypt = Bcrypt(app)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')


# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# registro y login y en routes: todos los demásendpoints
# Leo: Endpoint "/Login": Recibe usuario, valida, genera y retorna el token

@app.route('/login', methods=['POST'])
def get_logintoken():
    try:
        # silent=True : Devuelve None cuando esta mal formateado el objeto del body recibido del front}, pero no se cae toda la funcion sino que continua
        dataFront = request.get_json(silent=True)
        print("data del Front- body ", dataFront)  # imprimir en terminal

        # Buscar usuario en BD, por su correo electronico (usuario tiene id=1)
        user = db.session.execute(db.select(User).filter_by(
            email=dataFront["email"])).scalar_one_or_none()
        # Nota: Se obtiene el campo de BD a pesar de que en el Modelo de BD no se expone como serializado
        # print("Usuario objero de BD ", user.password)

        # Validar que exista usuario en BD y su contraseña
        if not user:
            return jsonify({"ok": False, "msg": "Usuario no existe o sus credenciales son incorrectas"}), 401
        
        if not bcrypt.check_password_hash(user.password, dataFront.get("password")):
            return jsonify({"ok": False, "msg": "Usuario no existe o su contraseña es incorrecta"}), 401

        user_rol = user.rol

        # Opcional: Agrego Claims como información
        claims = {
            "rol": user_rol,
        }

        # Si todo lo demas es exitoso.... Entonces creamos el token
        access_token = create_access_token(
            identity=str(user.id), additional_claims=claims)

        # Retornamos una respuesta exitosa, junto con el token creado
        return jsonify({
            "ok": True,
            "access_token": access_token,
            "msg": "Loguin existoso!"
        }), 200

    except Exception as e:
        print("Error:", str(e))
        db.session.rollback()
        return jsonify({"ok": False, "msg": str(e)}), 500


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    email = data.get('email')
    password = data.get('password')
    rol = data.get('rol')
    is_active = data.get('is_active')

    # Valida datos
    errors = validate_registration_data(
        username, nombre, apellido, email, password, rol, is_active)
    if errors:
        return jsonify({'errors': errors}), 400

    # Verifica que email y usuario son unicos
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'El nombre de usuario ya existe'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'El correo electrónico ya existe'}), 400

    # Hashear password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Crea nuevo usuario
    try:
        new_user = User(username=username, nombre=nombre,
                        apellido=apellido, email=email, password=hashed_password, rol=rol, is_active=is_active)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Usuario registrado exitosamente.'}), 201
    except Exception as e:
        print(f"Error al registrar usuario: {e}")
        db.session.rollback()
        return jsonify({'error': 'Error interno del servidor'}), 500


def validate_registration_data(username, nombre, apellido, email, password, rol, is_active):
    print (rol)
    errors = {}
    if not username:
        errors['username'] = 'El nombre de usuario es requerido'
    if not nombre:
        errors['nombre'] = 'El nombre es requerido'
    if not apellido:
        errors['apellido'] = 'El apellido es requerido'
    if not email:
        errors['email'] = 'El correo electrónico es requerido'
    elif '@' not in email:
        errors['email'] = 'El correo electrónico no es válido'
    if not password:
        errors['password'] = 'La contraseña es requerida'
    elif len(password) < 6:
        errors['password'] = 'La contraseña debe tener al menos 6 caracteres'
    if not is_active:
        errors['is_active'] = 'El parametro is_active es requerido'
    if rol != "user" and rol != "admin":
        errors['rol'] = 'El rol no es válido'

    return errors

# Actualizar Usuario:
# Paso1: Endpoint "/usuario": Retornar usuario con sus campos según el usuario
@app.route("/usuario", methods=["GET"])
@jwt_required()
def get_private():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    return jsonify(user.serialize()), 200

# Paso2: Endpoint "/usuario": Actualizar usuario
@app.route('/usuario/<int:usuario_id>', methods=['PUT'])
@jwt_required()
def update_profile(usuario_id):
    current_user_id = get_jwt_identity()
    user_jwt = get_jwt()

    if user_jwt.get("rol") != "admin":
        return jsonify({"msg": "No autorizado"}), 401

    try:
        user = db.session.get(User, usuario_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        data = request.get_json(silent=True) or {}

        user.email = data.get("email", user.email)
        user.is_active = data.get("activo", user.is_active)
        user.username = data.get("username", user.username)
        user.nombre = data.get("nombre", user.nombre)
        user.apellido = data.get("apellido", user.apellido)

        if "password" in data and data["password"]:
            user.password = bcrypt.generate_password_hash(data["password"])

        db.session.commit()
        return jsonify({"message": "Perfil actualizado"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar el perfil", "error": str(e)}), 500

# Endpoint "/usuario/todos: Obtiene todos los usuarios"
@app.route("/usuarios", methods=["GET"])
@jwt_required()
def get_all_users():
    user_id = get_jwt_identity()
    user_rol = get_jwt()

    if user_rol["rol"] != "admin":
        return jsonify({"msg": "no autorizado"}), 401

    users = db.session.scalars(select(User)).all()

    return jsonify({"users": [user.serialize() for user in users]}), 200

# Eliminar Usuario:
@app.route('/usuario/<int:usuario_id>', methods=['DELETE'])
@jwt_required()
def delete_profile(usuario_id):
    current_user_id = get_jwt_identity()
    user_jwt = get_jwt()

    if user_jwt.get("rol") != "admin":
        return jsonify({"msg": "No autorizado"}), 401

    try:
        user = db.session.get(User, usuario_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "Cuenta eliminada"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar el usuario", "error": str(e)}), 500

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
