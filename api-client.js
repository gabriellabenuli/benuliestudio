// API Client - Centraliza todas as chamadas ao banco de dados
const API = {
  // Clientes
  async getClientes() {
    try {
      const res = await fetch('/api/clientes');
      return await res.json();
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return [];
    }
  },

  async createCliente(dados) {
    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      if (!res.ok) throw new Error('Erro ao criar cliente');
      return await res.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  async updateCliente(id, dados) {
    try {
      const res = await fetch('/api/clientes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...dados })
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      throw error;
    }
  },

  async deleteCliente(id) {
    try {
      const res = await fetch('/api/clientes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      return await res.json();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      throw error;
    }
  }
};

// Função para testar a conexão
async function testarAPI() {
  console.log('🔄 Testando conexão com API...');
  try {
    const clientes = await API.getClientes();
    console.log('✅ API funcionando! Clientes:', clientes);
    NOTIF.adicionar('Sucesso', 'API conectada ao banco de dados!', 'sucesso', 'ti-check-circle');
  } catch (error) {
    console.error('❌ Erro na API:', error);
    NOTIF.adicionar('Erro', 'Não conseguiu conectar ao banco de dados', 'erro', 'ti-alert-circle');
  }
}

// Testar ao carregar a página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testarAPI);
} else {
  testarAPI();
}
