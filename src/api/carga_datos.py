import requests
import json
import urllib3
import os
import time

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

base_url = os.getenv("VITE_BACKEND_URL")
headers_json = {'Content-Type': 'application/json'}
ssl_verification = False


def post_api_request(endpoint, payload):
    url = f"{base_url}{endpoint}"
    try:
        response = requests.post(url, headers=headers_json, data=json.dumps(
            payload), verify=ssl_verification)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] {endpoint} → {e}")
        return None


def run_seed():
    results = []

    def safe_post(endpoint, payload, tipo, identificador):
        print(f"[POST] {tipo}: {identificador}")
        result = post_api_request(endpoint, payload)
        results.append({"type": tipo, "data": identificador, "result": result})
        time.sleep(4)  # Esperar 4 SEGUNDOS antes de la siguiente petición

    # USERS
    users = [
        {"username": "annya", "nombre": "Any", "apellido": "Mendez", "email": "any@mendez.com",
            "password": os.getenv("SECURE_USER_PASSWORD"), "is_active": True},
        {"username": "leo", "nombre": "Leonardo", "apellido": "Rospigliosi",
            "email": "leo@rospligosi.com", "password": os.getenv("SECURE_USER_PASSWORD"), "is_active": True},
        {"username": "pedro", "nombre": "Pedro", "apellido": "Aguilar", "email": "pedro@aguilar.com",
            "password": os.getenv("SECURE_USER_PASSWORD"), "is_active": True},
        {"username": "admin", "nombre": "admin", "apellido": "admin", "email": "admin@example.com",
            "password": os.getenv("SECURE_ADMIN_PASSWORD"), "is_active": True, "rol": os.getenv("USER_ROLE")}
    ]

    for u in users:
        safe_post("/register", u, "user", u["username"])

    # CATEGORIES
    categories = [
        {
            "nombre": "Historias para dormir",
            "descripcion": "Déjate llevar por narraciones suaves y envolventes diseñadas para calmar tu mente y prepararte para un descanso profundo."
        },
        {
            "nombre": "Meditaciones",
            "descripcion": "Encuentra la paz interior y reduce el estrés con nuestras sesiones de meditación guiada, perfectas para relajar tu cuerpo y mente antes de dormir."
        },
        {
            "nombre": "Sonidos relajantes",
            "descripcion": "Disfruta de una variedad de sonidos armónicos y melodías suaves creadas específicamente para inducir la relajación y facilitar un sueño tranquilo."
        },
        {
            "nombre": "Sonidos de la naturaleza",
            "descripcion": "Sumérgete en la tranquilidad de la naturaleza con paisajes sonoros relajantes como la lluvia suave, el canto de los pájaros y el susurro del mar."
        }
    ]

    for c in categories:
        safe_post("/api/categorias", c, "categoria", c["nombre"])

    # HISTORIAS (asume que ya tienes la lista completa)
    historias = [{
        "titulo": "Los sueños del Faraón",
        "contenido": "La historia de los sueños del Faraón egipcio, narrada en el libro de Génesis de la Biblia, cuenta cómo José, un joven hebreo, interpreta dos sueños del Faraón que predecían siete años de abundancia seguidos de siete años de hambruna. Estos sueños, que inicialmente nadie podía descifrar, revelaban un mensaje divino sobre el futuro de Egipto.\n El contenido de los sueños:\n 1. Primer sueño:\n El Faraón soñó que estaba junto al río Nilo y vio siete vacas gordas y hermosas que salían del río y pastaban en el prado. Luego vio otras siete vacas flacas y raquíticas que las seguían, y las vacas flacas se las comieron. \n 2. Segundo sueño:\n El Faraón volvió a soñar que vio siete espigas de grano llenas y hermosas, y luego siete espigas menudas y quemadas por el viento del este, que se las comieron. \n La interpretación de José:\n José, gracias a su capacidad de interpretar los sueños, explicó al Faraón que los dos sueños significaban lo mismo: siete años de gran cosecha en Egipto, seguidos de siete años de hambruna, donde la comida sería escasa. \n El significado y la importancia de los sueños:\n Predicción divina:\n Los sueños del Faraón no eran meras coincidencias, sino que eran mensajes divinos que revelaban el futuro. \n Advertencia:\n La interpretación de José sirvió de advertencia para que el Faraón tomara medidas para almacenar granos durante los años de abundancia, con el fin de prepararse para la hambruna que vendría después. \n El poder de la interpretación:\n La capacidad de José para interpretar los sueños demostró su sabiduría y su conexión con lo divino, lo que lo llevó a ser nombrado gobernador de Egipto. \n El papel de Dios:\n La historia de los sueños del Faraón destaca el papel de Dios en la vida de las personas y en la historia de la humanidad, revelando Su providencia y Su cuidado por los seres humanos.",
        "imagen": "los_sueños_del_faraon_bbdvw3",
        "url": "bxKuw9v8sT4?si=GqTM6cTNSwxNYO-w",
        "duracion": 5,
        "categoria_id": "1"
    },
        {
        "titulo": "El viejo Búho de Baviera",
        "contenido": "En un pequeño pueblo de Baviera, había un viejo búho que vivía en un árbol centenario. Era conocido por su sabiduría y su capacidad para contar historias. Cada noche, los habitantes del pueblo se reunían bajo el árbol para escuchar sus relatos. El búho hablaba de aventuras pasadas, de amores perdidos y de lecciones aprendidas. Su voz era suave y melodiosa, y todos quedaban cautivados por sus palabras. Una noche, el búho decidió contar la historia de su propio viaje a través de los bosques y montañas de Baviera. Habló de los hermosos paisajes que había visto, de los animales que había encontrado y de las estrellas que iluminaban su camino. Los oyentes estaban tan absortos en la narración que no se dieron cuenta de que el tiempo pasaba rápidamente. Al final de la historia, el búho les recordó la importancia de apreciar cada momento y de seguir sus sueños, sin importar cuán lejanos parezcan.",
        "imagen": "el_viejo_buho_fnezfz",
        "url": "zHpA8ZOrxIA?si=f-OyUzHa6VqBKDMA",
        "duracion": 5,
        "categoria_id": "1"
    },
        {
        "titulo": "Elmer el elefante",
        "contenido": "Elmer es un elefante diferente a los demás. Su piel está cubierta de parches de colores brillantes, lo que lo hace destacar entre su manada. Aunque al principio se siente inseguro por ser diferente, pronto descubre que su singularidad es lo que lo hace especial. Un día, Elmer decide hacer algo al respecto y se pinta de gris para parecerse a los demás elefantes. Sin embargo, al ver la tristeza en sus amigos, se da cuenta de que ser diferente es una bendición. Al final, Elmer regresa a su color original y enseña a todos que la diversidad es hermosa y que cada uno debe abrazar su individualidad.",
        "imagen": "elmer_el_elefante_pa0bmd",
        "url": "OkM1ilzwUlg?si=9CpeQA0S23V72KbZ",
        "duracion": 5,
        "categoria_id": "1"
    },
        {
        "titulo": "Meditación para aliviar la ansiedad",
        "contenido": "La meditación es una práctica poderosa para aliviar la ansiedad y el estrés. Al centrarte en tu respiración y en el momento presente, puedes calmar tu mente y encontrar un espacio de paz interior. Esta meditación guiada te llevará a un viaje de relajación profunda, ayudándote a soltar las tensiones acumuladas y a cultivar una sensación de bienestar. A medida que te sumerges en la meditación, podrás observar tus pensamientos sin juzgarlos, permitiendo que fluyan y se disuelvan. Con cada respiración, sentirás cómo la ansiedad se desvanece, dejando espacio para la calma y la serenidad.",
        "imagen": "meditación_ansiedad_1_zgewhu",
        "url": "nAR2PUPyH1I?si=UkbDQrcsi1Rx0QSB",
        "duracion": 5,
        "categoria_id": "2"
    },
        {
        "titulo": "Meditación para dormir bien",
        "contenido": "La meditación para dormir bien es una práctica que te ayuda a liberar el estrés y la tensión acumulada durante el día. A través de técnicas de respiración y visualización, podrás relajar tu cuerpo y tu mente, preparándote para un sueño reparador. Esta meditación te guiará a un estado de calma profunda, donde podrás dejar atrás las preocupaciones y encontrar la paz interior. Con cada exhalación, sentirás cómo tu cuerpo se relaja más y más, permitiéndote sumergirte en un sueño profundo y reparador.",
        "imagen": "meditación_rápida_2_wpph7m",
        "url": "kdK3RQj7wN4?si=zhzM4cc4dt8aMjPW",
        "duracion": 5,
        "categoria_id": "2"
    },
        {
        "titulo": "Meditación rapida y profunda",
        "contenido": "La meditación rápida y profunda es una técnica que te permite alcanzar un estado de relajación en poco tiempo. Ideal para aquellos que tienen agendas ocupadas, esta meditación te guiará a través de ejercicios de respiración y visualización que te ayudarán a liberar el estrés y la tensión acumulada. En solo unos minutos, podrás sentir cómo tu mente se calma y tu cuerpo se relaja, permitiéndote recargar energías y encontrar la paz interior.",
        "imagen": "meditación_bien_3_drv5ay",
        "url": "3gwLDWU0Zio?si=dYGMvBsXJ2XASMWy",
        "duracion": 5,
        "categoria_id": "2"
    },
        {
        "titulo": "El condor pasa",
        "contenido": "Canción musical relajante de la banda peruana Los Incas, que se ha convertido en un himno de la música andina. La melodía es suave y envolvente, evocando paisajes montañosos y la majestuosidad del cóndor que vuela alto en los Andes. La canción invita a la meditación y a la reflexión, transportando al oyente a un estado de paz y tranquilidad. Su ritmo pausado y sus suaves acordes hacen que sea perfecta para relajarse después de un largo día.",
        "imagen": "musica_relajante_el_condor_1_x1qsv4",
        "url": "8kQZHYbZkLs?si=j4b0WMi8SXPG5MDu",
        "duracion": 5,
        "categoria_id": "3"
    },
        {
        "titulo": "Canciones de Vivaldi para dormir",
        "contenido": "Las obras de Antonio Vivaldi, especialmente sus conciertos para violín, son conocidas por su belleza y elegancia. Su música es perfecta para crear un ambiente relajante y propicio para el descanso. Las suaves melodías de Vivaldi invitan a la meditación y a la tranquilidad, ayudando a calmar la mente y el cuerpo. Escuchar sus composiciones antes de dormir puede ser una experiencia mágica que transporta al oyente a un mundo de paz y serenidad.",
        "imagen": "musica_relajante_vivaldi_2_avyyfz",
        "url": "D8Xu2A9c_JM?si=p019muiwpC357cWf",
        "duracion": 5,
        "categoria_id": "3"
    },
        {
        "titulo": "One Pience Chill Music",
        "contenido": "La música de One Piece es conocida por su energía y emoción, pero también tiene momentos de calma y serenidad. Las melodías suaves y relajantes de la banda sonora de One Piece son perfectas para crear un ambiente tranquilo y propicio para el descanso. Escuchar estas composiciones puede ayudar a liberar tensiones y a encontrar la paz interior, transportando al oyente a un mundo de aventuras y sueños.",
        "imagen": "musica_relajante_one_piece_3_bka7ds",
        "url": "_wcScyiAt9Q?si=6FUQhAFeNuKVaMoK",
        "duracion": 5,
        "categoria_id": "3"
    },
        {
        "titulo": "Sonidos del bosque",
        "contenido": "Los sonidos del bosque son una sinfonía natural que invita a la relajación y la meditación. El canto de los pájaros, el susurro del viento entre los árboles y el murmullo de un arroyo crean un ambiente sereno y pacífico. Escuchar estos sonidos puede ayudar a liberar el estrés y la ansiedad, permitiendo que la mente se calme y el cuerpo se relaje. Sumergirse en la naturaleza a través de estos sonidos es una forma efectiva de encontrar la paz interior y reconectar con uno mismo.",
        "imagen": "sonidos__de__la__naturaleza_1_wtzc7t",
        "url": "oN8xzGZ27_0?si=l8iIOYIco0MrPn6H",
        "duracion": 5,
        "categoria_id": "4"
    },
        {
        "titulo": "Sonidos de la lluvia",
        "contenido": "Los sonidos de la lluvia son una melodía natural que invita a la calma y la reflexión. El suave golpeteo de las gotas sobre el suelo y los techos crea un ambiente acogedor y relajante. Escuchar la lluvia puede ayudar a liberar tensiones y a encontrar un espacio de paz interior. Es una experiencia que transporta al oyente a momentos de tranquilidad y serenidad, permitiendo que la mente se apacigüe y el cuerpo se relaje.",
        "imagen": "sonidos_de_la_naturaleza_lluvia_2_mtzvjl",
        "url": "t8_Dquklg4Y?si=cgVDDMCwOrwJ_mrH",
        "duracion": 5,
        "categoria_id": "4"
    },
        {
        "titulo": "Sonidos de naturaleza",
        "contenido": "Los sonidos de la naturaleza son una sinfonía de paz y serenidad. El canto de los pájaros, el murmullo de un arroyo y el susurro del viento entre los árboles crean un ambiente relajante y acogedor. Escuchar estos sonidos puede ayudar a liberar el estrés y la ansiedad, permitiendo que la mente se calme y el cuerpo se relaje. Sumergirse en la naturaleza a través de estos sonidos es una forma efectiva de encontrar la paz interior y reconectar con uno mismo.",
        "imagen": "sonidos_de_la_naturaleza_3_aepi9o",
        "url": "sZhUVP4R07M?si=eZk4iCyefIBoOYJ9",
        "duracion": 5,
        "categoria_id": "4"
    }]  # Usa la misma lista larga que ya escribiste

    for h in historias:
        safe_post("/api/historias", h, "historia", h["titulo"])

    print("\n✅ Seed finalizado.")
    return results
