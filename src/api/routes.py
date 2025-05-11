"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Categoria, Historia, Favorito
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy import select
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# POST: Crear categoría


@api.route('/categorias', methods=['POST'])
def crear_categoria():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')

    if not nombre:
        return jsonify({"error": "El nombre es requerido"}), 400

    if Categoria.query.filter_by(nombre=nombre).first():
        return jsonify({"error": f"La categoría '{nombre}' ya existe"}), 409

    nueva_categoria = Categoria(nombre=nombre, descripcion=descripcion)
    db.session.add(nueva_categoria)
    db.session.commit()
    return jsonify(nueva_categoria.serialize()), 201

# PUT: Actualizar categoría


@api.route('/categorias/<int:categoria_id>', methods=['PUT'])
def actualizar_categoria(categoria_id):
    categoria = db.session.get(Categoria, categoria_id)
    if not categoria:
        return jsonify({"error": "Categoría no encontrada"}), 404

    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')

    if nombre:
        if nombre != categoria.nombre and Categoria.query.filter_by(nombre=nombre).first():
            return jsonify({"error": f"La categoría '{nombre}' ya existe"}), 409
        categoria.nombre = nombre
    if descripcion is not None:
        categoria.descripcion = descripcion

    db.session.commit()
    return jsonify(categoria.serialize()), 200

# GET: Consultar todas las categorías


@api.route('/categorias', methods=['GET'])
def obtener_categorias():
    categorias = Categoria.query.all()
    return jsonify([categoria.serialize() for categoria in categorias]), 200

# GET: Consultar una sola categoría


@api.route('/categorias/<int:categoria_id>', methods=['GET'])
def obtener_categoria(categoria_id):
    categoria = db.session.get(Categoria, categoria_id)
    if not categoria:
        return jsonify({"error": "Categoría no encontrada"}), 404
    return jsonify(categoria.serialize()), 200

# DELETE: Eliminar una sola categoría


@api.route('/categorias/<int:categoria_id>', methods=['DELETE'])
def eliminar_categoria(categoria_id):
    categoria = db.session.get(Categoria, categoria_id)
    if not categoria:
        return jsonify({"error": "Categoría no encontrada"}), 404

    db.session.delete(categoria)
    db.session.commit()
    return jsonify({"message": f"Categoría '{categoria.nombre}' eliminada"}), 200

# POST: Crear historia


@api.route('/historias', methods=['POST'])
def crear_historia():
    data = request.get_json()
    titulo = data.get('titulo')
    contenido = data.get('contenido')
    imagen = data.get('imagen')
    url = data.get('url')
    duracion = data.get('duracion')
    categoria_id = data.get('categoria_id')

    if not titulo or not contenido or not categoria_id:
        return jsonify({"error": "El título, contenido y categoria_id son requeridos"}), 400

    categoria = db.session.get(Categoria, categoria_id)
    if not categoria:
        return jsonify({"error": f"La categoría con id '{categoria_id}' no existe"}), 400

    nueva_historia = Historia(titulo=titulo, contenido=contenido,
                              imagen=imagen, url=url, duracion=duracion, categoria_id=categoria_id)
    db.session.add(nueva_historia)
    db.session.commit()
    return jsonify(nueva_historia.serialize()), 201

# PUT: Actualizar historia


@api.route('/historias/<int:historia_id>', methods=['PUT'])
def actualizar_historia(historia_id):
    historia = db.session.get(Historia, historia_id)
    if not historia:
        return jsonify({"error": "Historia no encontrada"}), 404

    data = request.get_json()
    titulo = data.get('titulo')
    contenido = data.get('contenido')
    imagen = data.get('imagen')
    url = data.get('url')
    duracion = data.get('duracion')
    categoria_id = data.get('categoria_id')

    if titulo:
        historia.titulo = titulo
    if contenido:
        historia.contenido = contenido
    if imagen is not None:
        historia.imagen = imagen
    if url is not None:
        historia.url = url
    if duracion is not None:
        historia.duracion = duracion
    if categoria_id:
        categoria = db.session.get(Categoria, categoria_id)
        if not categoria:
            return jsonify({"error": f"La categoría con id '{categoria_id}' no existe"}), 400
        historia.categoria_id = categoria_id

    db.session.commit()
    return jsonify(historia.serialize()), 200

# GET: Consultar todas las historias


@api.route('/historias', methods=['GET'])
def obtener_historias():
    historias = Historia.query.all()
    return jsonify([historia.serialize() for historia in historias]), 200

# GET: Consultar una sola historia


@api.route('/historias/<int:historia_id>', methods=['GET'])
def obtener_historia(historia_id):
    historia = db.session.get(Historia, historia_id)
    if not historia:
        return jsonify({"error": "Historia no encontrada"}), 404
    return jsonify(historia.serialize()), 200

# DELETE: Eliminar una sola historia


@api.route('/historias/<int:historia_id>', methods=['DELETE'])
def eliminar_historia(historia_id):
    historia = db.session.get(Historia, historia_id)
    if not historia:
        return jsonify({"error": "Historia no encontrada"}), 404

    db.session.delete(historia)
    db.session.commit()
    return jsonify({"message": f"Historia '{historia.titulo}' eliminada"}), 200


# GET: Obtener todas las historias favoritas de un usuario
@api.route('/favoritos/historias/<int:user_id>', methods=['GET'])
def obtener_FavoritosHistorias_usuario(user_id):
    usuario = db.session.get(User, user_id)
    if not usuario:
        return jsonify({"error": f"Usuario con ID {user_id} no encontrado."}), 404

    historias_favoritas = [favorito.historia.serialize()
                           for favorito in usuario.favoritos]

    return jsonify(historias_favoritas), 200


# POST: Guardar una historia como favorita de un usuario
@api.route('/favoritos/historias/<int:historia_id>', methods=['POST'])
@jwt_required()
def agregar_favorito(historia_id):
    try:
        user_id = get_jwt_identity()

        if not historia_id:
            return jsonify({"error": "Falta el campo 'historia_id' en la solicitud."}), 400

        # Verificar si el usuario existe
        usuario = db.session.get(User, user_id)
        if not usuario:
            return jsonify({"error": f"Usuario con ID {user_id} no encontrado."}), 404

        # Verificar si la historia existe
        historia = db.session.get(Historia, historia_id)
        if not historia:
            return jsonify({"error": f"Historia con ID {historia_id} no encontrada."}), 404

        # Verificar si ya es favorito (opcional, para evitar duplicados)
        favorito_existente = Favorito.query.filter_by(
            user_id=user_id, historia_id=historia_id).first()
        if favorito_existente:
            return jsonify({"info": "La historia ya está en los favoritos del usuario."}), 409

        # Crear y guardar el favorito
        nuevo_favorito = Favorito(
            user_id=user_id, historia_id=historia_id, nombre_historia=historia.titulo)
        db.session.add(nuevo_favorito)
        db.session.commit()

        return jsonify({"mensaje": "Historia agregada a favoritos exitosamente.", "favorito": nuevo_favorito.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "No se pudo agregar a favoritos.,", "error": str(e)}), 500


@api.route('/usuarios/favoritos', methods=['GET'])
@jwt_required()
def obtener_favoritos_usuario():
    try:
        user_id = get_jwt_identity()

        # Verificar si el usuario existe
        usuario = db.session.get(User, user_id)
        if not usuario:
            return jsonify({"error": f"Usuario con ID {user_id} no encontrado."}), 404

        favoritos = [favorite.serialize() for favorite in usuario.favoritos]

        return jsonify({"favoritos": favoritos}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "No se pudo agregar a favoritos.,", "error": str(e)}), 500


# DELETE: Eliminar una historia de los favoritos de un usuario

@api.route('/usuarios/favoritos/<int:historia_id>', methods=['DELETE'])
@jwt_required()
def eliminar_favorito(historia_id):
    user_id = get_jwt_identity()
    stmt = select(Favorito).where(Favorito.user_id == user_id,
                                  Favorito.historia_id == historia_id)
    result = db.session.execute(stmt).scalar_one_or_none()

    if result is None:
        return jsonify({"error": "Favorito no encontrado."}), 404

    # Eliminar el favorito
    db.session.delete(result)
    db.session.commit()

    return jsonify({"mensaje": "Favorito eliminado exitosamente."}), 200
