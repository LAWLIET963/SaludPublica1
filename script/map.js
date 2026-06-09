// Script para el mapa de hospitales
document.addEventListener('DOMContentLoaded', function() {
    // Coordenadas por defecto (Centro de México)
    let userLat = 19.4326;
    let userLon = -99.1332;

    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLat = position.coords.latitude;
                userLon = position.coords.longitude;
                initMap(userLat, userLon);
            },
            function() {
                // Si no se puede obtener ubicación, usar coordenadas por defecto
                initMap(userLat, userLon);
            }
        );
    } else {
        initMap(userLat, userLon);
    }

    function initMap(lat, lon) {
        // Crear mapa
        const map = L.map('map').setView([lat, lon], 14);

        // Agregar tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        // Marcador de ubicación del usuario
        const userIcon = L.divIcon({
            html: '<div style="background: #d946ef; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(217, 70, 239, 0.5);"></div>',
            className: 'user-marker'
        });

        L.marker([lat, lon], { icon: userIcon })
            .addTo(map)
            .bindPopup('<b>Tu Ubicación</b><br>Aquí estás');

        // Hospitales de ejemplo (ampliada)
        const hospitals = [
            {
                name: 'Hospital Central de Salud',
                lat: lat + 0.01,
                lon: lon + 0.01,
                phone: '+52 1 951 588 7041',
                services: 'Urgencias, Cirugía, Maternidad',
                hours: '24/7'
            },
            {
                name: 'Clínica de Atención Primaria',
                lat: lat - 0.01,
                lon: lon + 0.02,
                phone: '+52 1 951 588 7042',
                services: 'Consulta General, Vacunación',
                hours: '8:00 - 20:00'
            },
            {
                name: 'Centro Médico Comunitario',
                lat: lat + 0.02,
                lon: lon - 0.01,
                phone: '+52 1 951 588 7043',
                services: 'Laboratorios, Radiología',
                hours: '8:00 - 18:00'
            },
            {
                name: 'Hospital Regional',
                lat: lat - 0.015,
                lon: lon - 0.015,
                phone: '+52 1 951 588 7044',
                services: 'Especialidades, UCI',
                hours: '24/7'
            },
            {
                name: 'Centro de Salud Mental',
                lat: lat + 0.015,
                lon: lon - 0.02,
                phone: '+52 1 951 588 7045',
                services: 'Psicología, Psiquiatría',
                hours: '9:00 - 19:00'
            },
            {
                name: 'Clínica Oftalmológica',
                lat: lat - 0.02,
                lon: lon - 0.01,
                phone: '+52 1 951 588 7046',
                services: 'Oftalmología, Optometría',
                hours: '9:00 - 18:00'
            },
            {
                name: 'Centro Dental Integral',
                lat: lat + 0.02,
                lon: lon + 0.02,
                phone: '+52 1 951 588 7047',
                services: 'Odontología, Ortodoncia',
                hours: '8:00 - 19:00'
            },
            {
                name: 'Hospital de Pediatría',
                lat: lat - 0.025,
                lon: lon + 0.015,
                phone: '+52 1 951 588 7048',
                services: 'Pediatría, Neonatología',
                hours: '24/7'
            },
            {
                name: 'Centro de Rehabilitación',
                lat: lat + 0.025,
                lon: lon + 0.01,
                phone: '+52 1 951 588 7049',
                services: 'Fisioterapia, Terapia ocupacional',
                hours: '8:00 - 17:00'
            },
            {
                name: 'Clínica de Oncología',
                lat: lat - 0.015,
                lon: lon + 0.025,
                phone: '+52 1 951 588 7050',
                services: 'Oncología, Radioterapia',
                hours: '8:00 - 18:00'
            },
            {
                name: 'Hospital Metropolitano',
                lat: lat + 0.018,
                lon: lon - 0.025,
                phone: '+52 1 951 588 7051',
                services: 'Cardiología, Urgencias, Traumatología',
                hours: '24/7'
            },
            {
                name: 'Centro Dermatológico',
                lat: lat - 0.022,
                lon: lon + 0.018,
                phone: '+52 1 951 588 7052',
                services: 'Dermatología, Cirugía estética',
                hours: '9:00 - 18:00'
            },
            {
                name: 'Clínica Vascular',
                lat: lat + 0.012,
                lon: lon + 0.022,
                phone: '+52 1 951 588 7053',
                services: 'Angiología, Cirugía vascular',
                hours: '8:00 - 17:00'
            },
            {
                name: 'Centro de Neumología',
                lat: lat - 0.018,
                lon: lon - 0.022,
                phone: '+52 1 951 588 7054',
                services: 'Neumología, Alergología',
                hours: '9:00 - 19:00'
            },
            {
                name: 'Hospital de Nutrición',
                lat: lat + 0.022,
                lon: lon - 0.018,
                phone: '+52 1 951 588 7055',
                services: 'Nutrición, Endocrinología',
                hours: '8:00 - 18:00'
            },
            {
                name: 'Clínica Reumatológica',
                lat: lat - 0.012,
                lon: lon - 0.025,
                phone: '+52 1 951 588 7056',
                services: 'Reumatología, Ortopedia',
                hours: '9:00 - 18:00'
            },
            {
                name: 'Centro Gastrointestinal',
                lat: lat + 0.025,
                lon: lon - 0.012,
                phone: '+52 1 951 588 7057',
                services: 'Gastroenterología, Hepatología',
                hours: '8:00 - 17:00'
            },
            {
                name: 'Hospital Oftalmológico Premium',
                lat: lat - 0.025,
                lon: lon + 0.022,
                phone: '+52 1 951 588 7058',
                services: 'Oftalmología avanzada, Cirugía ocular',
                hours: '9:00 - 19:00'
            },
            {
                name: 'Centro de Urología',
                lat: lat + 0.018,
                lon: lon + 0.025,
                phone: '+52 1 951 588 7059',
                services: 'Urología, Nefrología',
                hours: '8:00 - 18:00'
            },
            {
                name: 'Clínica Neurológica Especializada',
                lat: lat - 0.022,
                lon: lon - 0.018,
                phone: '+52 1 951 588 7060',
                services: 'Neurología, Neurocirugía',
                hours: '9:00 - 19:00'
            }
        ];

        // Icono personalizado para hospitales
        const hospitalIcon = L.divIcon({
            html: '<div style="background: #ff006e; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 0 15px rgba(255, 0, 110, 0.5); font-size: 18px;">🏥</div>',
            className: 'hospital-marker'
        });

        // Agregar hospitales al mapa
        hospitals.forEach(hospital => {
            L.marker([hospital.lat, hospital.lon], { icon: hospitalIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="min-width: 220px; font-family: Arial, sans-serif;">
                        <h4 style="color: #d946ef; margin: 0 0 10px 0; font-size: 14px;">${hospital.name}</h4>
                        <p style="margin: 5px 0; font-size: 12px;"><strong>📞 Teléfono:</strong> ${hospital.phone}</p>
                        <p style="margin: 5px 0; font-size: 12px;"><strong>🩺 Servicios:</strong> ${hospital.services}</p>
                        <p style="margin: 5px 0; font-size: 12px;"><strong>🕐 Horario:</strong> ${hospital.hours}</p>
                    </div>
                `);
        });

        // Calcular distancias y agregar círculo de búsqueda
        const searchRadius = L.circle([lat, lon], {
            color: '#d946ef',
            fillColor: '#d946ef',
            fillOpacity: 0.1,
            radius: 1000, // 1 km
            weight: 2,
            dashArray: '5, 5'
        }).addTo(map);
    }
});

