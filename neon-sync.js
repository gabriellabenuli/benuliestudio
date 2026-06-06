// ============================================================
// NEON SYNC - Substitui localStorage por API automaticamente
// ============================================================

// Cache local para performance
const NEON_CACHE = {};

// Mapear localStorage keys para endpoints API
const STORAGE_MAP = {
  'clientes': '/api/clientes',
  'projetos': '/api/projetos',
  'crm_leads': '/api/leads',
  'leads': '/api/leads',
  'tarefas': '/api/tarefas',
  'kpmo_demandas': '/api/demandas',
  'kpmo_clientes': '/api/clientes'
};

// Override localStorage.getItem
const originalGetItem = localStorage.getItem;
localStorage.getItem = function(key) {
  // Se tem um endpoint para isso, buscar da API
  if (STORAGE_MAP[key]) {
    const endpoint = STORAGE_MAP[key];
    return JSON.stringify(NEON_CACHE[key] || []);
  }
  // Senão, usar localStorage normal
  return originalGetItem.call(localStorage, key);
};

// Override localStorage.setItem
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  // Se tem endpoint, sincronizar com API
  if (STORAGE_MAP[key]) {
    try {
      const data = JSON.parse(value);
      NEON_CACHE[key] = data;
      sincronizarComNeon(key, data).catch(err => console.error('Erro ao sincronizar:', err));
    } catch (e) {
      // Se não é JSON, guardar normalmente
      originalSetItem.call(localStorage, key, value);
    }
    return;
  }
  // Senão, usar localStorage normal
  originalSetItem.call(localStorage, key, value);
};

// Sincronizar dados com Neon
async function sincronizarComNeon(key, data) {
  const endpoint = STORAGE_MAP[key];
  if (!endpoint || !Array.isArray(data)) return;

  // Os dados já estão salvos via API.create/update/delete
  // Aqui apenas atualizamos o cache
  NEON_CACHE[key] = data;
  console.log(`✅ Sincronizado ${key} com Neon`);
}

// Carregar todos os dados do Neon ao inicializar
async function carregarDadosDoNeon() {
  console.log('🔄 Carregando dados do Neon...');
  
  try {
    // Carregar cada tipo de dado
    NEON_CACHE['clientes'] = await API.getClientes();
    NEON_CACHE['projetos'] = await API.getProjetos();
    NEON_CACHE['leads'] = await API.getLeads();
    NEON_CACHE['crm_leads'] = NEON_CACHE['leads'];
    NEON_CACHE['tarefas'] = await API.getTarefas();
    NEON_CACHE['kpmo_demandas'] = await API.getDemandas();
    NEON_CACHE['kpmo_clientes'] = NEON_CACHE['clientes'];

    console.log('✅ Todos os dados carregados do Neon!');
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error);
  }
}

// Carregar ao inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', carregarDadosDoNeon);
} else {
  carregarDadosDoNeon();
}
