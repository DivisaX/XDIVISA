async function convertCurrency() {
    // Obtén los valores de los campos
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const resultElement = document.getElementById('result');
    
    // Validación de importe
    if (!isNaN(amount) && amount > 0) {
        try {
            // Realiza una solicitud a la API de ExchangeRate-API
            const apiKey = '8cc11c18a4745255b321a3b4'; // Tu clave de API
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
            const data = await response.json();

            // Verifica si la solicitud fue exitosa
            if (data.result === "success") {
                // Obtén la tasa de conversión para la divisa de destino
                const conversionRate = data.conversion_rates[toCurrency];

                if (conversionRate) {
                    // Calcula el resultado de la conversión
                    const result = amount * conversionRate;
                    resultElement.textContent = `Resultado: ${result.toFixed(2)} ${toCurrency}`;
                } else {
                    resultElement.textContent = `No se encontró la tasa de cambio para ${toCurrency}.`;
                }
            } else {
                resultElement.textContent = 'Error al obtener las tasas de cambio. Inténtalo de nuevo más tarde.';
            }
        } catch (error) {
            // Manejo de errores en la solicitud
            resultElement.textContent = 'Error al conectar con el servidor. Inténtalo más tarde.';
            console.error(error);
        }
    } else {
        resultElement.textContent = 'Por favor, introduce un importe válido.';
    }
}
