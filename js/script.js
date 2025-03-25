// Dark mode detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (event.matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// Função para formatar o telefone
function formatarTelefone(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length <= 10) {
    value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
  } else {
    value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  }
  
  input.value = value;
}

// Função para formatar CPF/RG
function formatarDocumento(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length <= 9) {
    // Formato RG
    if (value.length > 8) {
        value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1}).*/, '$1.$2.$3-$4');
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{3})(\d{1,3}).*/, '$1.$2.$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{1,3}).*/, '$1.$2');
      }
  } else {
    // Formato CPF
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
  }
  
  input.value = value;
}

// Criar animação de confete
function criarConfete() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  
  const colors = ['#00A859', '#FFFFFF', '#008C4B', '#E6E6E6', '#007540'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 20 + 10 + 'px';
    container.appendChild(confetti);
  }
  
  container.classList.add('animate');
  setTimeout(() => {
    container.classList.remove('animate');
  }, 5000);
}

// Carregamento inicial
document.addEventListener('DOMContentLoaded', function() {
  const formElement = document.getElementById('sambaForm');
  const confirmacaoElement = document.getElementById('confirmacaoInscricao');
  const telefoneInput = document.getElementById('telefone');
  const documentoInput = document.getElementById('documento');
  const alaSelect = document.getElementById('ala');
  const outraAlaContainer = document.getElementById('outraAlaContainer');
  const outraAlaInput = document.getElementById('outraAla');
  const btnNovaInscricao = document.getElementById('btnNovaInscricao');
  
  // Formatação de telefone
  telefoneInput.addEventListener('input', function() {
    formatarTelefone(this);
  });
  
  // Formatação de documento
  documentoInput.addEventListener('input', function() {
    formatarDocumento(this);
  });
  
  // Mostrar/ocultar campo "Outra Ala"
  alaSelect.addEventListener('change', function() {
    if (this.value === 'outro') {
      outraAlaContainer.classList.remove('hidden');
      outraAlaInput.required = true;
    } else {
      outraAlaContainer.classList.add('hidden');
      outraAlaInput.required = false;
    }
  });
  
  // Envio do formulário
  formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação de idade (pelo menos 16 anos)
    const dataNascimento = new Date(document.getElementById('dataNascimento').value);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth() - dataNascimento.getMonth();
    
    if (idade < 16 || (idade === 16 && mesAtual < 0)) {
      alert('É necessário ter pelo menos 16 anos para participar do desfile.');
      return;
    }
    
    // Em um ambiente real, aqui enviaria os dados para um servidor
    
    // Mostrar confirmação
    formElement.classList.add('hidden');
    confirmacaoElement.classList.remove('hidden');
    
    // Animar confete
    criarConfete();
  });
  
  // Nova inscrição
  btnNovaInscricao.addEventListener('click', function() {
    formElement.reset();
    formElement.classList.remove('hidden');
    confirmacaoElement.classList.add('hidden');
    outraAlaContainer.classList.add('hidden');
    outraAlaInput.required = false;
  });
});