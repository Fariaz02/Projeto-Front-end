document.addEventListener('DOMContentLoaded', () => {
  const profiles = {
    aluno: {
      index: 0,
      description: 'Entre com seu CPF ou matrícula para acessar sua ficha de treino e liberar a catraca.',
      label: 'CPF ou Matrícula',
      placeholder: '000.000.000-00',
      button: 'ENTRAR NO TREINO',
      demo: '123.456.789-00',
      cpfMask: true
    },
    professor: {
      index: 1,
      description: 'Acesse o painel técnico para prescrever treinos, acompanhar turmas e avaliações.',
      label: 'CREF ou E-mail Institucional',
      placeholder: 'professor@unipe.edu.br',
      button: 'ACESSAR PAINEL TÉCNICO',
      demo: 'prof.ricardo@unipe.edu.br',
      cpfMask: false
    },
    experimental: {
      index: 2,
      description: 'Informe o código recebido via WhatsApp ou telefone para liberar seu passe livre.',
      label: 'Código do Passe ou WhatsApp',
      placeholder: '(83) 99999-0000',
      button: 'LIBERAR PASSE VISITANTE',
      demo: 'UNIPE-PASS-2026',
      cpfMask: false
    }
  };

  let activeRole = 'aluno';

  const tabs = document.querySelectorAll('.profile-tab');
  const glider = document.getElementById('switcherGlider');
  const roleDescription = document.getElementById('roleDescription');
  const userLabel = document.getElementById('userLabel');
  const userInput = document.getElementById('userInput');
  const passInput = document.getElementById('passInput');
  const togglePass = document.getElementById('togglePass');
  const demoFill = document.getElementById('demoFill');
  const loginForm = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');
  const submitLabel = document.getElementById('submitLabel');
  const userError = document.getElementById('userError');
  const passError = document.getElementById('passError');
  const toastAlert = document.getElementById('toastAlert');

  // Troca de Perfil com animação do glider
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeRole = tab.dataset.role;
      const cfg = profiles[activeRole];

      glider.style.transform = `translateX(${cfg.index * 100}%)`;
      roleDescription.textContent = cfg.description;
      userLabel.textContent = cfg.label;
      userInput.placeholder = cfg.placeholder;
      userInput.value = '';
      submitLabel.textContent = cfg.button;

      clearValidation();
      toastAlert.classList.add('hidden');
    });
  });

  // Máscara automática de CPF na aba Aluno
  userInput.addEventListener('input', (e) => {
    if (!profiles[activeRole].cpfMask) return;

    const val = e.target.value;
    if (/^[\d.\-]+$/.test(val)) {
      let digits = val.replace(/\D/g, '').slice(0, 11);
      digits = digits.replace(/(\d{3})(\d)/, '$1.$2');
      digits = digits.replace(/(\d{3})(\d)/, '$1.$2');
      digits = digits.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = digits;
    }
  });

  // Alternar visibilidade da senha
  togglePass.addEventListener('click', () => {
    const hidden = passInput.type === 'password';
    passInput.type = hidden ? 'text' : 'password';
    togglePass.style.color = hidden ? '#FFC21A' : '#9E9E9E';
  });

  // Preencher dados de demonstração
  demoFill.addEventListener('click', () => {
    userInput.value = profiles[activeRole].demo;
    passInput.value = 'Unipe@2026';
    clearValidation();
  });

  // Validação e Submit
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearValidation();
    toastAlert.classList.add('hidden');

    const userVal = userInput.value.trim();
    const passVal = passInput.value.trim();
    let valid = true;

    if (!userVal) {
      userError.textContent = 'Informe sua identificação para continuar.';
      valid = false;
    }

    if (passVal.length < 4) {
      passError.textContent = 'A senha precisa ter pelo menos 4 caracteres.';
      valid = false;
    }

    if (!valid) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      toastAlert.textContent = `Acesso autorizado! Bem-vindo(a) à ACADEMIA UNIPE (${activeRole.toUpperCase()}).`;
      toastAlert.classList.remove('hidden');
    }, 850);
  });

  function clearValidation() {
    userError.textContent = '';
    passError.textContent = '';
  }

  // Controle de Modais
  const forgotModal = document.getElementById('forgotModal');
  const trialModal = document.getElementById('trialModal');

  document.getElementById('forgotTrigger').addEventListener('click', () => {
    forgotModal.classList.remove('hidden');
  });

  document.getElementById('trialTrigger').addEventListener('click', () => {
    trialModal.classList.remove('hidden');
  });

  document.querySelectorAll('.close-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.close).classList.add('hidden');
    });
  });

  [forgotModal, trialModal].forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

  document.getElementById('forgotForm').addEventListener('submit', (e) => {
    e.preventDefault();
    forgotModal.classList.add('hidden');
    toastAlert.textContent = 'Código de recuperação enviado para seu contato cadastrado.';
    toastAlert.classList.remove('hidden');
    e.target.reset();
  });

  document.getElementById('trialForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('trialName').value.trim();
    trialModal.classList.add('hidden');
    toastAlert.textContent = `Passe livre emitido para ${name}! Apresente seu documento na recepção.`;
    toastAlert.classList.remove('hidden');
    e.target.reset();
  });
});