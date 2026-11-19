let hora = new Date().getHours();
let mensagem;

if (hora < 12) {
  mensagem = "Bom dia! Bem-vindo à Academia Unipe.";
} else if (hora < 18) {
  mensagem = "Boa tarde! Bem-vindo à Academia Unipe.";
} else {
  mensagem = "Boa noite! Bem-vindo à Academia Unipe.";
}

document.getElementById("saudacao").textContent = mensagem;