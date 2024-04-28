function validatePositiveNumber(input, name) {
    if (isNaN(input) || input <= 0) {
        throw new Error(`${name} must be a positive number.`);
    }
    return input;
}

function validateGender(gender) {
    if (gender !== "M" && gender !== "F") {
        throw new Error("Gender must be 'M' (Male) or 'F' (Female).");
    }
    return gender;
}

const activityMultipliers = {
    sedentary: 1.0,
    lightlyActive: 1.1,
    moderatelyActive: 1.2,
    veryActive: 1.3,
    extraActive: 1.5,
};

export function calculateDailyCaloricIntake(weight, height, age, gender, activityLevel) {
    // validate inputs
    try {
        weight = validatePositiveNumber(weight, 'Weight');
        height = validatePositiveNumber(height, 'Height');
        age = validatePositiveNumber(age, 'Age');
        gender = validateGender(gender);

        const activityMultiplier = activityMultipliers[activityLevel] || activityMultipliers['sedentary'];

        // calc Basal Metabolic Rate (BMR)
        const BMR = gender === "M"
            ? (10 * weight) + (6.25 * height) - (5 * age) + 5
            : (10 * weight) + (6.25 * height) - (5 * age) - 161;

        // adjust based on activity level
        const DCI = BMR * activityMultiplier;

        // check DCI 
        if (isNaN(DCI)) {
            throw new Error("Invalid Daily Caloric Intake calculated.");
        }

        return DCI; 
    } catch (error) {
        console.error("Error in DCI calculation:", error.message);
        throw error; 
    }
}
