const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const enviado = document.getElementById('enviado');



form.addEventListener('submit', function(event) {
 
  const usernameValue = username.value.trim();
  console.log('Username:', usernameValue); // Exibe o valor do campo de usuário no console
  const passwordValue = password.value.trim();
  console.log('Password:', password.value.trim()); // Exibe o valor do campo de senha no console
  let formularioValido = true;
  usernameError.textContent = '';
  passwordError.textContent = '';

  
if (usernameValue === '') {
  usernameError.textContent = 'Digite seu usuário';
  formularioValido = false;
}

if (passwordValue === '') {
  passwordError.textContent = 'Digite sua senha';
  formularioValido = false;
} else if (passwordValue.length < 6) {
  passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
  formularioValido = false;
}

if (!formularioValido) {
  event.preventDefault(); // Impede o envio do formulário
}
});