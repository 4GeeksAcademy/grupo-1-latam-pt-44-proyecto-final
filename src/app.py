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
# Leo: Importar las siguientes librerias
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jwt_identity
from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "nuestra_clave_secreta"
jwt = JWTManager(app)  # Inicializar jwt para que funcione dentro del BackEnd
CORS(app)
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

#registro y login y en routes: todos los demásendpoints
# Leo: Endpoint "/Login": Recibe usuario, valida, genera y retorna el token
@app.route('/login', methods=['POST'])
def get_logintoken():
    try:
        # silent=True : Devuelve None cuando esta mal formateado el objeto del body recibido del front}, pero no se cae toda la funcion sino que continua
        dataFront = request.get_json(silent=True)
        print("data del Front- body ", dataFront)  # imprimir en terminal

        # Buscar usuario en BD, por su correo electronico (usuario tiene id=1)
        user = db.session.execute(db.select(User).filter_by(email=dataFront["correo"])).scalar_one_or_none()
        print("Usuario objero de BD ", user.password)# Nota: Se obtiene el campo de BD a pesar de que en el Modelo de BD no se expone como serializado

        # Validar que exista usuario en BD y su contraseña
        if not user or user.password != dataFront["contrasena"]:
            return jsonify({"ok": False, "msg": "Usuario no existe o su contraseña es incorrecta"}), 401

        # Opcional: Agrego Claims como información
        claims = {
            "role": "admin",
            "otra_informacion": {"info": "info...", "data": "data info"}
        }

        # Si todo lo demas es exitoso.... Entonces creamos el token
        access_token = create_access_token(identity=str(user.id), additional_claims=claims)

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





# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
