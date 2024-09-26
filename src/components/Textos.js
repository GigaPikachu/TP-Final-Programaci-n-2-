async function fetchCSV() {
    const url = 'https://docs.google.com/spreadsheets/d/10l-lViFgBV60pD5s_mz1UY9XX5avT0hMGigrYdHO2SM/pub?output=csv';
  
    try {
        const response = await fetch(url);  // Obtener el archivo CSV
        const data = await response.text(); // Convertir la respuesta a texto
        const text = data.split('\n').map(row => row.split(',')); // Dividir en filas y columnas
  
        console.log(text); // Aquí tienes los datos del CSV en un array
    }
    
    catch (error) {
        console.error('Error al obtener el CSV:', error);
    }
}

export { fetchCSV };