// API Client - Integração completa com Neon PostgreSQL
const API = {
  // ===== CLIENTES =====
  async getClientes() {
    const res = await fetch('/api/clientes');
    return await res.json();
  },
  async createCliente(dados) {
    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!res.ok) throw new Error('Erro ao criar cliente');
    return await res.json();
  },
  async updateCliente(id, dados) {
    const res = await fetch('/api/clientes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...dados })
    });
    return await res.json();
  },
  async deleteCliente(id) {
    const res = await fetch('/api/clientes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return await res.json();
  },

  // ===== PROJETOS =====
  async getProjetos() {
    const res = await fetch('/api/projetos');
    return await res.json();
  },
  async createProjeto(dados) {
    const res = await fetch('/api/projetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return await res.json();
  },
  async updateProjeto(id, dados) {
    const res = await fetch('/api/projetos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...dados })
    });
    return await res.json();
  },
  async deleteProjeto(id) {
    const res = await fetch('/api/projetos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return await res.json();
  },

  // ===== LEADS =====
  async getLeads() {
    const res = await fetch('/api/leads');
    return await res.json();
  },
  async createLead(dados) {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return await res.json();
  },
  async updateLead(id, dados) {
    const res = await fetch('/api/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...dados })
    });
    return await res.json();
  },
  async deleteLead(id) {
    const res = await fetch('/api/leads', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return await res.json();
  },

  // ===== TAREFAS =====
  async getTarefas() {
    const res = await fetch('/api/tarefas');
    return await res.json();
  },
  async createTarefa(dados) {
    const res = await fetch('/api/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return await res.json();
  },
  async updateTarefa(id, dados) {
    const res = await fetch('/api/tarefas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...dados })
    });
    return await res.json();
  },
  async deleteTarefa(id) {
    const res = await fetch('/api/tarefas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return await res.json();
  },

  // ===== DEMANDAS =====
  async getDemandas() {
    const res = await fetch('/api/demandas');
    return await res.json();
  },
  async createDemanda(dados) {
    const res = await fetch('/api/demandas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return await res.json();
  },
  async updateDemanda(id, dados) {
    const res = await fetch('/api/demandas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...dados })
    });
    return await res.json();
  },
  async deleteDemanda(id) {
    const res = await fetch('/api/demandas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    return await res.json();
  }
};

// Testar conexão na inicialização
async function testarAPI() {
  try {
    const clientes = await API.getClientes();
    console.log('✅ API Neon conectada com sucesso!', clientes);
    NOTIF.adicionar('Sucesso', 'Conectado ao banco de dados Neon!', 'sucesso', 'ti-check-circle');
  } catch (error) {
    console.error('❌ Erro na API:', error);
    NOTIF.adicionar('Erro', 'Falha ao conectar ao Neon', 'erro', 'ti-alert-circle');
  }
}

// Testar ao carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testarAPI);
} else {
  testarAPI();
}
