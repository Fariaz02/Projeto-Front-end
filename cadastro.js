document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const fullName = document.getElementById('fullName');
  const cpfInput = document.getElementById('cpfInput');
  const phoneInput = document.getElementById('phoneInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const confirmPasswordInput = document.getElementById('confirmPasswordInput');
  const termsCheck = document.getElementById('termsCheck');
  const strengthFill = document.getElementById('strengthFill');
  const submitBtn = document.getElementById('submitBtn');

  // Elementos do Resumo Lateral
  const summaryPlan = document.getElementById('summaryPlan');
  const summaryGoal = document.getElementById('summaryGoal');
  const summaryPrice = document.getElementById('summaryPrice');

  let selectedPlan = 'UNIPE Black Anual';
  let selectedGoal = 'Hipertrofia';

  // Máscara de CPF (000.000.000-00)
  cpfInput.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    digits = digits.replace(/(\d{3})(\d)/, '$1.$2');
    digits = digits.replace(/(\d{3})(\d)/, '$1.$2');
    digits = digits.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = digits;
  });

  // Máscara de Telefone ((83) 90000-0000)
  phoneInput.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    digits = digits.replace(/^(\d{2})(\d)/g, '($1) $2');
    digits = digits.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = digits;
  });

  // Seleção de Objetivo
  document.querySelectorAll('.goal-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.goal-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      selectedGoal = pill.dataset.goal;
      summaryGoal.textContent = selectedGoal;
    });
  });

  // Seleção de Plano
  document.querySelectorAll('.plan-card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.plan-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedPlan = card.dataset.plan;
      summaryPlan.textContent = selectedPlan;
      summaryPrice.textContent = card.dataset.price;
    });
  });

  // Mostrar / Ocultar Senha
  document.querySelectorAll('.eye-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const isHidden = target.type === 'password';
      target.type = isHidden ? 'text' : 'password';
      btn.style.color = isHidden ? '#FFC21A' : '#9E9E9E';
    });
  });

  // Indicador de força da senha
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;
    if (val.length >= 6) score += 35;
    if (/[A-Z]/.test(val) || /\d/.test(val)) score += 35;
    if (/[^A-Za-z0-9]/.test(val) && val.length >= 8) score += 30;

    strengthFill.style.width = `${score}%`;
    strengthFill.style.backgroundColor = score >= 70 ? '#FFC21A' : '#FF5A1F';
  });

  // Validação e Envio
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    if (fullName.value.trim().split(' ').length < 2) {
      document.getElementById('nameError').textContent = 'Informe seu nome e sobrenome.';
      isValid = false;
    }

    if (cpfInput.value.replace(/\D/g, '').length !== 11) {
      document.getElementById('cpfError').textContent = 'Digite um CPF válido com 11 dígitos.';
      isValid = false;
    }

    if (phoneInput.value.replace(/\D/g, '').length < 10) {
      document.getElementById('phoneError').textContent = 'Informe um WhatsApp válido com DDD.';
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Informe um e-mail válido.';
      isValid = false;
    }

    if (passwordInput.value.length < 6) {
      document.getElementById('passError').textContent = 'Mínimo de 6 caracteres.';
      isValid = false;
    }

    if (confirmPasswordInput.value !== passwordInput.value || !confirmPasswordInput.value) {
      document.getElementById('confirmError').textContent = 'As senhas não coincidem.';
      isValid = false;
    }

    if (!termsCheck.checked) {
      document.getElementById('termsError').textContent = 'Você precisa aceitar o regulamento para continuar.';
      isValid = false;
    }

    if (!isValid) return;

    // Simula criação da matrícula
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const firstName = fullName.value.trim().split(' ')[0];

      document.getElementById('generatedId').textContent = `#UNIPE-2026-${randomCode}`;
      document.getElementById('successMessage').textContent =
        `${firstName}, seu cadastro no plano ${selectedPlan} (${selectedGoal}) está pronto!`;
      document.getElementById('successModal').classList.remove('hidden');
    }, 900);
  });

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));
  }
});