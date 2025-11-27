const senha = document.getElementById('senha');
const toggle = document.getElementById('toggleSenha');
const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-message');

    // Alternar visibilidade da senha
    toggle.addEventListener('click', () => {
      const isVisible = senha.type === 'text';
      senha.type = isVisible ? 'password' : 'text';
      toggle.textContent = isVisible ? 'Mostrar' : 'Ocultar';
    });

    // Validação do formulário
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const pass = senha.value;

      if (email === '' || pass === '') {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'Preencha todos os campos.';
      } 
      else if (!email.includes('viatruck')) {
        errorMsg.style.display = 'block';
        errorMsg.textContent = 'E-mail inválido.';
      } 
      else {
        errorMsg.style.display = 'none';
        window.location.href = "./index_locacao.html";
      }
    });