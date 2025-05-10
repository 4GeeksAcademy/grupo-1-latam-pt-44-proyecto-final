import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

export const Historias = () => {
    // Estado para almacenar las historias
    const [historias, setHistorias] = useState([]);
    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    // Estado para la historia seleccionada
    const [selectedHistoria, setSelectedHistoria] = useState(null);
    // Estado para la categoría seleccionada (opcional)
    const [selectedCategory, setSelectedCategory] = useState(null);


    const cld = new Cloudinary({ cloud: { cloudName: 'dz71k8oei' } });

    // Datos de ejemplo (en una aplicación real, estos vendrían de una API)
    const historiasData = [
        {
            "categoria_id": 1,
            "contenido": "La historia de los sueños del Faraón egipcio, narrada en el libro de Génesis de la Biblia, cuenta cómo José, un joven hebreo, interpreta dos sueños del Faraón que predecían siete años de abundancia seguidos de siete años de hambruna. Estos sueños, que inicialmente nadie podía descifrar, revelaban un mensaje divino sobre el futuro de Egipto.\n El contenido de los sueños:\n 1. Primer sueño:\n El Faraón soñó que estaba junto al río Nilo y vio siete vacas gordas y hermosas que salían del río y pastaban en el prado. Luego vio otras siete vacas flacas y raquíticas que las seguían, y las vacas flacas se las comieron. \n 2. Segundo sueño:\n El Faraón volvió a soñar que vio siete espigas de grano llenas y hermosas, y luego siete espigas menudas y quemadas por el viento del este, que se las comieron. \n La interpretación de José:\n José, gracias a su capacidad de interpretar los sueños, explicó al Faraón que los dos sueños significaban lo mismo: siete años de gran cosecha en Egipto, seguidos de siete años de hambruna, donde la comida sería escasa. \n El significado y la importancia de los sueños:\n Predicción divina:\n Los sueños del Faraón no eran meras coincidencias, sino que eran mensajes divinos que revelaban el futuro. \n Advertencia:\n La interpretación de José sirvió de advertencia para que el Faraón tomara medidas para almacenar granos durante los años de abundancia, con el fin de prepararse para la hambruna que vendría después. \n El poder de la interpretación:\n La capacidad de José para interpretar los sueños demostró su sabiduría y su conexión con lo divino, lo que lo llevó a ser nombrado gobernador de Egipto. \n El papel de Dios:\n La historia de los sueños del Faraón destaca el papel de Dios en la vida de las personas y en la historia de la humanidad, revelando Su providencia y Su cuidado por los seres humanos.",
            "duracion": 29,
            "id": 1,
            "imagen": "los_sueños_del_faraon_bbdvw3",
            "titulo": "Los sueños del Faraón",
            "url": "los_sueños_del_faraon_afvmur"
        },
        {
            "categoria_id": 1,
            "contenido": "En un pequeño pueblo de Baviera, había un viejo búho que vivía en un árbol centenario. Era conocido por su sabiduría y su capacidad para contar historias. Cada noche, los habitantes del pueblo se reunían bajo el árbol para escuchar sus relatos. El búho hablaba de aventuras pasadas, de amores perdidos y de lecciones aprendidas. Su voz era suave y melodiosa, y todos quedaban cautivados por sus palabras. Una noche, el búho decidió contar la historia de su propio viaje a través de los bosques y montañas de Baviera. Habló de los hermosos paisajes que había visto, de los animales que había encontrado y de las estrellas que iluminaban su camino. Los oyentes estaban tan absortos en la narración que no se dieron cuenta de que el tiempo pasaba rápidamente. Al final de la historia, el búho les recordó la importancia de apreciar cada momento y de seguir sus sueños, sin importar cuán lejanos parezcan.",
            "duracion": 55,
            "id": 2,
            "imagen": "el_viejo_buho_fnezfz",
            "titulo": "El viejo Búho de Baviera",
            "url": "el_viejo_buho_petucr"
        },
        {
            "categoria_id": 1,
            "contenido": "Elmer es un elefante diferente a los demás. Su piel está cubierta de parches de colores brillantes, lo que lo hace destacar entre su manada. Aunque al principio se siente inseguro por ser diferente, pronto descubre que su singularidad es lo que lo hace especial. Un día, Elmer decide hacer algo al respecto y se pinta de gris para parecerse a los demás elefantes. Sin embargo, al ver la tristeza en sus amigos, se da cuenta de que ser diferente es una bendición. Al final, Elmer regresa a su color original y enseña a todos que la diversidad es hermosa y que cada uno debe abrazar su individualidad.",
            "duracion": 48,
            "id": 3,
            "imagen": "elmer_el_elefante_pa0bmd",
            "titulo": "Elmer el elefante",
            "url": "elmer_el_elefante_ywiyet"
        },
        {
            "categoria_id": 2,
            "contenido": "La meditación es una práctica poderosa para aliviar la ansiedad y el estrés. Al centrarte en tu respiración y en el momento presente, puedes calmar tu mente y encontrar un espacio de paz interior. Esta meditación guiada te llevará a un viaje de relajación profunda, ayudándote a soltar las tensiones acumuladas y a cultivar una sensación de bienestar. A medida que te sumerges en la meditación, podrás observar tus pensamientos sin juzgarlos, permitiendo que fluyan y se disuelvan. Con cada respiración, sentirás cómo la ansiedad se desvanece, dejando espacio para la calma y la serenidad.",
            "duracion": 47,
            "id": 4,
            "imagen": "meditación_ansiedad_1_zgewhu",
            "titulo": "Meditación para aliviar la ansiedad",
            "url": "meditación_ansiedad_1_odwmey"
        },
        {
            "categoria_id": 2,
            "contenido": "La meditación para dormir bien es una práctica que te ayuda a liberar el estrés y la tensión acumulada durante el día. A través de técnicas de respiración y visualización, podrás relajar tu cuerpo y tu mente, preparándote para un sueño reparador. Esta meditación te guiará a un estado de calma profunda, donde podrás dejar atrás las preocupaciones y encontrar la paz interior. Con cada exhalación, sentirás cómo tu cuerpo se relaja más y más, permitiéndote sumergirte en un sueño profundo y reparador.",
            "duracion": 45,
            "id": 5,
            "imagen": "meditación_rápida_2_wpph7m",
            "titulo": "Meditación para dormir bien",
            "url": "meditación_rápida_2_iyd1jo"
        },
        {
            "categoria_id": 2,
            "contenido": "La meditación rápida y profunda es una técnica que te permite alcanzar un estado de relajación en poco tiempo. Ideal para aquellos que tienen agendas ocupadas, esta meditación te guiará a través de ejercicios de respiración y visualización que te ayudarán a liberar el estrés y la tensión acumulada. En solo unos minutos, podrás sentir cómo tu mente se calma y tu cuerpo se relaja, permitiéndote recargar energías y encontrar la paz interior.",
            "duracion": 36,
            "id": 6,
            "imagen": "meditación_bien_3_drv5ay",
            "titulo": "Meditación rapida y profunda",
            "url": "meditación_bien_3_euyjjd"
        },
        {
            "categoria_id": 3,
            "contenido": "Canción musical relajante de la banda peruana Los Incas, que se ha convertido en un himno de la música andina. La melodía es suave y envolvente, evocando paisajes montañosos y la majestuosidad del cóndor que vuela alto en los Andes. La canción invita a la meditación y a la reflexión, transportando al oyente a un estado de paz y tranquilidad. Su ritmo pausado y sus suaves acordes hacen que sea perfecta para relajarse después de un largo día.",
            "duracion": 69,
            "id": 7,
            "imagen": "musica_relajante_el_condor_1_x1qsv4",
            "titulo": "El condor pasa",
            "url": "musica_relajante_el_condor_1_qlqw7k"
        },
        {
            "categoria_id": 3,
            "contenido": "Las obras de Antonio Vivaldi, especialmente sus conciertos para violín, son conocidas por su belleza y elegancia. Su música es perfecta para crear un ambiente relajante y propicio para el descanso. Las suaves melodías de Vivaldi invitan a la meditación y a la tranquilidad, ayudando a calmar la mente y el cuerpo. Escuchar sus composiciones antes de dormir puede ser una experiencia mágica que transporta al oyente a un mundo de paz y serenidad.",
            "duracion": 96,
            "id": 8,
            "imagen": "musica_relajante_vivaldi_2_avyyfz",
            "titulo": "Canciones de Vivaldi para dormir",
            "url": "musica_relajante_vivaldi_2_synqcn"
        },
        {
            "categoria_id": 3,
            "contenido": "La música de One Piece es conocida por su energía y emoción, pero también tiene momentos de calma y serenidad. Las melodías suaves y relajantes de la banda sonora de One Piece son perfectas para crear un ambiente tranquilo y propicio para el descanso. Escuchar estas composiciones puede ayudar a liberar tensiones y a encontrar la paz interior, transportando al oyente a un mundo de aventuras y sueños.",
            "duracion": 81,
            "id": 9,
            "imagen": "musica_relajante_one_piece_3_bka7ds",
            "titulo": "One Pience Chill Music",
            "url": "musica_relajante_one_piece_3_ufstko"
        },
        {
            "categoria_id": 4,
            "contenido": "Los sonidos del bosque son una sinfonía natural que invita a la relajación y la meditación. El canto de los pájaros, el susurro del viento entre los árboles y el murmullo de un arroyo crean un ambiente sereno y pacífico. Escuchar estos sonidos puede ayudar a liberar el estrés y la ansiedad, permitiendo que la mente se calme y el cuerpo se relaje. Sumergirse en la naturaleza a través de estos sonidos es una forma efectiva de encontrar la paz interior y reconectar con uno mismo.",
            "duracion": 65,
            "id": 10,
            "imagen": "sonidos_de_la_naturaleza_1_wtzc7t",
            "titulo": "Sonidos del bosque",
            "url": "sonidos_de_la_naturaleza_1_l6mlia"
        },
        {
            "categoria_id": 4,
            "contenido": "Los sonidos de la lluvia son una melodía natural que invita a la calma y la reflexión. El suave golpeteo de las gotas sobre el suelo y los techos crea un ambiente acogedor y relajante. Escuchar la lluvia puede ayudar a liberar tensiones y a encontrar un espacio de paz interior. Es una experiencia que transporta al oyente a momentos de tranquilidad y serenidad, permitiendo que la mente se apacigüe y el cuerpo se relaje.",
            "duracion": 75,
            "id": 11,
            "imagen": "sonidos_de_la_naturaleza_lluvia_2_mtzvjl",
            "titulo": "Sonidos de la lluvia",
            "url": "sonidos_de_la_naturaleza_lluvia_2_bod1x6"
        },
        {
            "categoria_id": 4,
            "contenido": "Los sonidos de la naturaleza son una sinfonía de paz y serenidad. El canto de los pájaros, el murmullo de un arroyo y el susurro del viento entre los árboles crean un ambiente relajante y acogedor. Escuchar estos sonidos puede ayudar a liberar el estrés y la ansiedad, permitiendo que la mente se calme y el cuerpo se relaje. Sumergirse en la naturaleza a través de estos sonidos es una forma efectiva de encontrar la paz interior y reconectar con uno mismo.",
            "duracion": 70,
            "id": 12,
            "imagen": "sonidos_de_la_naturaleza_3_aepi9o",
            "titulo": "Sonidos de naturaleza",
            "url": "sonidos_de_la_naturaleza_3_hlpqhu"
        }
    ];

    // Función para formatear la duración
    const formatDuration = (minutes) => {
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours} hr ${mins} min`;
        }
        return `${minutes} min`;
    };

    // Función para obtener la URL de la imagen
    const getImageUrl = (imageName) => {
        // En una aplicación real, esto podría ser una URL a un servicio de imágenes como Cloudinary
        return `https://res.cloudinary.com/demo/image/upload/${imageName}.jpg`;
    };

    // Efecto para cargar las historias
    useEffect(() => {
        // En una aplicación real, aquí harías una llamada a la API
        setHistorias(historiasData);
        
        // Establecer la primera historia como seleccionada por defecto
        if (historiasData.length > 0) {
            setSelectedHistoria(historiasData[0].id);
        }
    }, []);

    // Filtrar historias por categoría si es necesario
    const filteredHistorias = selectedCategory 
        ? historias.filter(historia => historia.categoria_id === selectedCategory)
        : historias;

    // Calcular paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHistorias.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredHistorias.length / itemsPerPage);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // Manejar clic en una historia
    const handleHistoriaClick = (id) => {
        setSelectedHistoria(id);
        // Aquí podrías navegar a la página de detalle o reproducir la historia
        console.log(`Historia seleccionada: ${id}`);
    };

    return (
        <div className="container-fluid py-4" style={{ 
            backgroundColor: '#0a1744', 
            minHeight: '100vh',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', 
            backgroundSize: '50px 50px'
        }}>
            {/* Título con estrella decorativa */}
            <div className="text-center mb-4 position-relative">
                <span className="position-absolute" style={{ top: '-15px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: '24px' }}>✦</span>
                <h2 className="text-white">Historias para dormir</h2>
            </div>
            
            {/* Contenedor principal de la cuadrícula */}
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 position-relative">
                    {/* Botón de navegación izquierdo */}
                    {currentPage > 1 && (
                        <button 
                            className="btn position-absolute start-0 top-50 translate-middle-y text-white" 
                            onClick={prevPage}
                            style={{ zIndex: 10 }}
                        >
                            <i className="fa-solid fa-chevron-left fs-1"></i>
                        </button>
                    )}
                    
                    {/* Cuadrícula de historias */}
                    <div className="row g-4">
                        {currentItems.map((historia) => (
                            <div className="col-12 col-md-6 col-lg-4" key={historia.id}>
                                <div 
                                    className={`card h-100 bg-transparent border-0 position-relative overflow-hidden ${selectedHistoria === historia.id ? 'selected' : ''}`}
                                    onClick={() => handleHistoriaClick(historia.id)}
                                    style={{ 
                                        cursor: 'pointer',
                                        borderRadius: '16px',
                                        boxShadow: selectedHistoria === historia.id ? '0 0 0 3px #3b82f6' : 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {/* Imagen de la historia */}
                                    <div className="position-relative" style={{ height: '200px', borderRadius: '16px', overflow: 'hidden' }}>
                                        <img 
                                            src={cld.image(historia.imagen).toURL()}
                                            className="w-100 h-100 object-fit-cover" 
                                            alt={historia.titulo}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `https://via.placeholder.com/400x200?text=${encodeURIComponent(historia.titulo)}`;
                                            }}
                                        />
                                        
                                        {/* Overlay oscuro para mejorar la legibilidad del texto */}
                                        <div className="position-absolute top-0 start-0 w-100 h-100" 
                                            style={{ 
                                                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)',
                                                borderRadius: '16px'
                                            }}>
                                        </div>
                                        
                                        {/* Duración */}
                                        <div className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded" 
                                            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                                            <span className="text-white small">{formatDuration(historia.duracion)}</span>
                                        </div>
                                        
                                        {/* Título */}
                                        <div className="position-absolute bottom-0 start-0 w-100 p-3">
                                            <h5 className="text-white mb-0">{historia.titulo}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Botón de navegación derecho */}
                    {currentPage < totalPages && (
                        <button 
                            className="btn position-absolute end-0 top-50 translate-middle-y text-white" 
                            onClick={nextPage}
                            style={{ zIndex: 10 }}
                        >
                            <i className="fa-solid fa-chevron-right fs-1"></i>
                        </button>
                    )}
                    
                    {/* Enlace "Saltar" */}
                    <div className="text-end mt-3">
                        <Link to="/" className="text-white text-decoration-none">Saltar</Link>
                    </div>
                </div>
            </div>
            
            {/* Paginación */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Navegación de historias">
                        <ul className="pagination pagination-sm">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => paginate(i + 1)}
                                        style={{ 
                                            backgroundColor: currentPage === i + 1 ? '#3b82f6' : 'transparent',
                                            borderColor: currentPage === i + 1 ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                                            color: 'white'
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};