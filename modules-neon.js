// ============================================================
// MODULES NEON - Override dos módulos para usar API
// ============================================================

// Override do CRM - Leads
const CRM_NEON = {
  async init() {
    const leads = await API.getLeads();
    window.crm_leads = leads;
  },
  
  async openNewModal() {
    const nome = prompt('Nome do lead:');
    if (!nome) return;
    
    const email = prompt('Email (opcional):');
    const telefone = prompt('Telefone (opcional):');
    const origem = prompt('Origem (ex: Instagram, Indicação):') || 'Direto';

    try {
      const novoLead = await API.createLead({
        nome,
        email: email || null,
        telefone: telefone || null,
        status: 'Novo lead',
        origem
      });
      
      NOTIF.adicionar('Sucesso', `Lead criado!`, 'sucesso', 'ti-check-circle');
      await CRM_NEON.init();
      CRM.renderTable();
    } catch (error) {
      NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
    }
  }
};

// Override do TAREFAS
const TAREFAS_NEON = {
  async init() {
    const tarefas = await API.getTarefas();
    window.tarefas = tarefas;
  },
  
  async adicionarTarefa() {
    const titulo = document.getElementById('tarefasInput')?.value;
    if (!titulo) {
      alert('Digite uma tarefa');
      return;
    }

    const categoria = document.getElementById('tarefasCategoria')?.value || 'outro';
    const prioridade = document.getElementById('tarefasPrioridade')?.value || 'normal';
    const data = document.getElementById('tarefasData')?.value || new Date().toISOString().split('T')[0];
    const recorrente = document.getElementById('tarefasRecorrente')?.checked || false;

    try {
      await API.createTarefa({
        descricao: titulo,
        categoria,
        prioridade,
        data,
        recorrente,
        concluida: false,
        arquivada: false
      });

      NOTIF.adicionar('Sucesso', 'Tarefa adicionada!', 'sucesso', 'ti-check-circle');
      document.getElementById('tarefasInput').value = '';
      await TAREFAS_NEON.init();
      TAREFAS.renderTarefas();
    } catch (error) {
      NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
    }
  },

  async toggleConcluida(id) {
    const tarefa = window.tarefas?.find(t => t.id === id);
    if (tarefa) {
      try {
        await API.updateTarefa(id, { concluida: !tarefa.concluida });
        await TAREFAS_NEON.init();
        TAREFAS.renderTarefas();
      } catch (error) {
        NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
      }
    }
  },

  async deletarTarefa(id) {
    try {
      await API.deleteTarefa(id);
      NOTIF.adicionar('Sucesso', 'Tarefa arquivada!', 'sucesso', 'ti-check-circle');
      await TAREFAS_NEON.init();
      TAREFAS.renderTarefas();
    } catch (error) {
      NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
    }
  }
};

// Override do KPMO - Demandas
const KPMO_NEON = {
  async init() {
    const clientes = await API.getClientes();
    const demandas = await API.getDemandas();
    window.kpmo_clientes = clientes;
    window.kpmo_demandas = demandas;
  },

  async abrirNovoCliente() {
    const nome = prompt('Nome do cliente:');
    if (!nome) return;

    try {
      const novoCliente = await API.createCliente({
        nome: nome.trim(),
        criado: new Date().toLocaleDateString('pt-BR')
      });
      
      NOTIF.adicionar('Sucesso', 'Cliente adicionado!', 'sucesso', 'ti-check-circle');
      await KPMO_NEON.init();
      KPMO.renderBoard();
    } catch (error) {
      NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
    }
  },

  async abrirNovaDemanda(clienteId) {
    // Usar o modal já existente do KPMO
    KPMO.abrirNovaDemanda(clienteId);
  }
};

// Inicializar módulos Neon quando API estiver pronta
async function initModulosNeon() {
  console.log('🔄 Inicializando módulos Neon...');
  
  try {
    await CRM_NEON.init();
    await TAREFAS_NEON.init();
    await KPMO_NEON.init();
    
    console.log('✅ Módulos Neon inicializados!');
  } catch (error) {
    console.error('❌ Erro ao inicializar módulos:', error);
  }
}

// Esperar API estar pronta
document.addEventListener('DOMContentLoaded', initModulosNeon);
