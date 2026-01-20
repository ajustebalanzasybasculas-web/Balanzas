/* ========================================
   WEIGHING SCALE CALCULATOR - JAVASCRIPT
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const maxCapacityInput = document.getElementById('maxCapacity');
    const scaleIntervalInput = document.getElementById('scaleInterval');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsSection = document.getElementById('resultsSection');
    const accuracyClassDisplay = document.getElementById('accuracyClass');
    const minimumCapacityDisplay = document.getElementById('minimumCapacity');

    /**
     * ========================================
     * CALCULATION LOGIC
     * ========================================
     * Calculates accuracy class and minimum capacity
     * according to OIML R76
     * 
     * @param {number} max - Maximum capacity of the scale
     * @param {number} e - Verification scale interval
     * @returns {object}
     */
    function calculateScaleParameters(max, e) {
        const n = max / e;

        let accuracyClass = 'Does not comply';
        let minimumCapacity = null;

        // Class I – Special
        if (e >= 0.001 && n >= 50000) {
            accuracyClass = 'Clase I (Especial)';
            minimumCapacity = 100 * e;
        }

        // Class II – Fine
        else if (
            (e >= 0.001 && e <= 0.05 && n >= 100 && n <= 100000) ||
            (e >= 0.1 && n >= 5000 && n <= 100000)
        ) {
            accuracyClass = 'Clase II (Fina)';
            minimumCapacity = (e <= 0.05) ? 20 * e : 50 * e;
        }

        // Class III – Medium
        else if (
            (e >= 0.001 && e <= 2 && n >= 100 && n <= 10000) ||
            (e >= 5 && n >= 500 && n <= 10000)
        ) {
            accuracyClass = 'Clase III (Media)';
            minimumCapacity = 20 * e;
        }

        // Class IIII – Ordinary
        else if (e >= 5 && n >= 100 && n <= 1000) {
            accuracyClass = 'Clase IIII (Ordinaria)';
            minimumCapacity = 10 * e;
        }

        return {
            accuracyClass: accuracyClass,
            minimumCapacity: minimumCapacity !== null
                ? minimumCapacity.toFixed(2)
                : 'Error'
        };
    }

    /**
     * ========================================
     * INPUT VALIDATION
     * ========================================
     */
    function validateInputs(max, e) {
        if (isNaN(max) || isNaN(e)) {
            return {
                isValid: false,
                message: 'Por favor ingresa numeros validos'
            };
        }
        
        if (max <= 0 || e <= 0) {
            return {
                isValid: false,
                message: 'Los valores deben ser mayores a cero'
            };
        }
        
        if (e > max) {
            return {
                isValid: false,
                message: 'La division de verificacion no puede ser mayor a la capacidad maxima'
            };
        }
        
        return { isValid: true };
    }

    /**
     * ========================================
     * EVENT HANDLER
     * ========================================
     */
    calculateBtn.addEventListener('click', function() {
        const max = parseFloat(maxCapacityInput.value);
        const e = parseFloat(scaleIntervalInput.value);

        const validation = validateInputs(max, e);
        if (!validation.isValid) {
            alert(validation.message);
            return;
        }

        const result = calculateScaleParameters(max, e);

        accuracyClassDisplay.textContent = result.accuracyClass;
        minimumCapacityDisplay.textContent = result.minimumCapacity;

        resultsSection.style.display = 'block';
    });
});

