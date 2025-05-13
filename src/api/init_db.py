from flask import Blueprint, jsonify, request
from api.carga_datos import run_seed
from api.create_admin import create_admin
import os

init_db_bp = Blueprint("init_db", __name__)


@init_db_bp.route("/init-db", methods=["GET"])
def initialize_database():
    secret = request.args.get("secret")
    # Cambia este valor para mayor seguridad
    if secret != os.getenv("DB_SEED_PASSWORD"):
        return jsonify({"error": "Unauthorized"}), 401
    results = run_seed()
    return jsonify({"status": "completed", "results": results})

@init_db_bp.route("/init-admin", methods=["GET"])
def initialize_database():
    secret = request.args.get("secret")
    # Cambia este valor para mayor seguridad
    if secret != os.getenv("DB_SEED_PASSWORD"):
        return jsonify({"error": "Unauthorized"}), 401
    results = create_admin()
    return jsonify({"status": "completed", "results": results})
