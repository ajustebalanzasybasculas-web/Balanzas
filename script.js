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
     * 
     * This function calculates the weighing scale parameters based on user input.
     * 
     * MODIFY THIS FUNCTION to implement your specific calculation formulas.
     * 
     * @param {number} max - Maximum capacity of the scale
     * @param {number} e - Scale interval
     * @returns {object} Object containing accuracyClass and minimumCapacity
     */
    function calculateScaleParameters(max, e) {
        // ========================================
        // TODO: IMPLEMENT YOUR CALCULATION LOGIC HERE
        // ========================================
        
        // Example placeholder calculations (replace these with actual formulas):
        
        // Placeholder for accuracy class calculation
        // Common accuracy classes: I, II, III, IV (based on verification scale interval)
        var calculatedAccuracyClass = 'II'; // Replace with actual calculation
        
        // Placeholder for minimum capacity calculation
        // Typically: Min = accuracy class factor × e
        var calculatedMinCapacity = (20 * e).toFixed(2); // Replace with actual calculation
        
        // Return the calculated values
        return {
            accuracyClass: calculatedAccuracyClass,
            minimumCapacity: calculatedMinCapacity
        };
    }

    /**
     * Validates user input
     * @param {number} max - Maximum capacity
     * @param {number} e - Scale interval
     * @returns {object} Object with isValid boolean and error message
     */
    function validateInputs(max, e) {
        if (isNaN(max) || isNaN(e)) {
            return {
                isValid: false,
                message: 'Please enter valid numbers for both fields.'
            };
        }
        
        if (max <= 0 || e <= 0) {
            return {
                isValid: false,
                message: 'Values must be greater than zero.'
            };
        }
        
        if (e > max) {
            return {
                isValid: false,
                message: 'Scale interval cannot be greater than maximum capacity.'
            };
        }
        
        return {
            isValid: true,
            message: ''
        };
    }

    /**
     * Handles the calculation when button is clicked
     */
    function handleCalculate() {
        // Get input values
        var maxCapacity = parseFloat(maxCapacityInput.value);
        var scaleInterval = parseFloat(scaleIntervalInput.value);
        
        // Validate inputs
        var validation = validateInputs(maxCapacity, scaleInterval);
        
        if (!validation.isValid) {
            alert(validation.message);
            return;
        }
        
        // Perform calculation
        var results = calculateScaleParameters(maxCapacity, scaleInterval);
        
        // Display results
        accuracyClassDisplay.textContent = results.accuracyClass;
        minimumCapacityDisplay.textContent = results.minimumCapacity;
        
        // Show results section with smooth transition
        resultsSection.style.display = 'block';
        
        // Smooth scroll to results (optional)
        setTimeout(function() {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    /**
     * Handles Enter key press in input fields
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleCalculate();
        }
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================
    
    // Calculate button click
    calculateBtn.addEventListener('click', handleCalculate);
    
    // Enter key press on input fields
    maxCapacityInput.addEventListener('keypress', handleKeyPress);
    scaleIntervalInput.addEventListener('keypress', handleKeyPress);
    
    // Optional: Focus on first input field on page load
    maxCapacityInput.focus();
});
