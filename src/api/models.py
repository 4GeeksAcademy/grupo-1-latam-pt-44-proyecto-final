from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean,Text,ForeignKey,Enum
from sqlalchemy.orm import Mapped, mapped_column,relationship
from enum import Enum as PyEnum
db = SQLAlchemy()

class UserRole(str,PyEnum):
    ADMIN="ADMIN"
    USER="USER"


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    nombre: Mapped[str] = mapped_column(String(120), nullable=False)
    apellido: Mapped[str] = mapped_column(String(120), nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole,name="user_role_enum",native_enum=False),nullable=False,default=UserRole.USER)

    favoritos: Mapped[list["Favorito"]] = relationship(back_populates="usuario", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "rol": self.role,
            "favoritos": [f.serialize() for f in self.favoritos]
        }


class Categoria(db.Model):
    __tablename__ = "categorias"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    descripcion: Mapped[str] = mapped_column(String(255), nullable=True)

    historias: Mapped[list["Historia"]] = relationship(back_populates="categoria", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "historias": [h.serialize() for h in self.historias]
        }


class Historia(db.Model):
    __tablename__ = "historias"

    id: Mapped[int] = mapped_column(primary_key=True)
    titulo: Mapped[str] = mapped_column(String(150), nullable=False)
    contenido: Mapped[str] = mapped_column(Text, nullable=False)
    imagen: Mapped[str] = mapped_column(String(255), nullable=True)  # URL o ruta de la imagen
    duracion: Mapped[int] = mapped_column(nullable=True)  # Duración en segundos, minutos o lo que definas
    url: Mapped[str] = mapped_column(String(350), nullable=True)
    categoria_id: Mapped[int] = mapped_column(ForeignKey("categorias.id"), nullable=False)

    categoria: Mapped["Categoria"] = relationship(back_populates="historias")
    favoritos: Mapped[list["Favorito"]] = relationship(back_populates="historia", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "contenido": self.contenido,
            "imagen": self.imagen,
            "duracion": self.duracion,
            "url": self.url,
            "categoria_id": self.categoria_id
        }


class Favorito(db.Model):
    __tablename__ = "favoritos"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    historia_id: Mapped[int] = mapped_column(ForeignKey("historias.id"), nullable=False)

    usuario: Mapped["User"] = relationship(back_populates="favoritos")
    historia: Mapped["Historia"] = relationship(back_populates="favoritos")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "historia_id": self.historia_id
        }