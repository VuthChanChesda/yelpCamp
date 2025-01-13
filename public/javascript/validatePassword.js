function checkPasswordStrength(password) {
  // Define our checks
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  // Count how many checks passed
  const passedChecks = [
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
    isLongEnough
  ].filter(Boolean).length;

  // Match server-side strength.id levels (0-3)
  if (password.length === 0) {
    return {
      id: 0,  // Added id to match server
      score: 0,
      strength: '',
      color: '#808080'
    };
  } else if (passedChecks <= 2) {
    return {
      id: 0,  // Too weak
      score: 1,
      strength: 'Very Weak',
      color: '#ff0000'
    };
  } else if (passedChecks === 3) {
    return {
      id: 1,  // Weak
      score: 2,
      strength: 'Weak',
      color: '#ffa500'
    };
  } else if (passedChecks === 4) {
    return {
      id: 2,  // Medium
      score: 3,
      strength: 'Medium',
      color: '#c9e22d'
    };
  } else {
    return {
      id: 3,  // Strong
      score: 4,
      strength: 'Strong',
      color: '#008000'
    };
  }
}
const passwordInput = document.getElementById('password-with-check');
const strengthIndicator = document.getElementById('strength-indicator');
passwordInput.addEventListener('input', function(event) {
  const result = checkPasswordStrength(this.value);
  
  // Update the indicator
  strengthIndicator.textContent = result.strength;
  strengthIndicator.style.color = result.color;
  
  // You can now check if password meets server requirements
  if (result.id < 2) {
    strengthIndicator.textContent += ' (Not strong enough)';
  }
  
  const requirements = [
    `Strength: ${result.strength}`,
    `Strength ID: ${result.id}`, // Added to show the ID
    'Requirements:',
    '- At least 8 characters',
    '- Contains uppercase letters',
    '- Contains lowercase letters',
    '- Contains numbers',
    '- Contains special characters',
    'Note: Password must achieve Medium strength (ID 2) or higher'
  ].join('\n');
  
  strengthIndicator.title = requirements;
});