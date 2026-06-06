// ============================================================
// INTEGRAÇÃO NEON - Substitua as funções CRUD dos módulos
// ============================================================

// EXEMPLO 1: Novo Lead com Neon
async function novoLeadComAPI() {
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
    
    NOTIF.adicionar('Sucesso', `Lead "${nome}" adicionado ao Neon!`, 'sucesso', 'ti-check-circle');
    // Recarregar lista de leads
    carregarLeadsDoBanco();
  } catch (error) {
    NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
  }
}

// Carregar leads do banco
async function carregarLeadsDoBanco() {
  try {
    const leads = await API.getLeads();
    console.log('Leads do Neon:', leads);
    // Aqui você renderiza os leads na página
    // renderLeads(leads);
  } catch (error) {
    console.error('Erro ao carregar leads:', error);
  }
}

// EXEMPLO 2: Novo Cliente com Neon
async function novoClienteComAPI() {
  const nome = prompt('Nome do cliente:');
  if (!nome) return;

  const email = prompt('Email (opcional):');
  const telefone = prompt('Telefone (opcional):');
  const endereco = prompt('Endereço (opcional):');

  try {
    const novoCliente = await API.createCliente({
      nome,
      email: email || null,
      telefone: telefone || null,
      endereco: endereco || null
    });
    
    NOTIF.adicionar('Sucesso', `Cliente "${nome}" criado!`, 'sucesso', 'ti-check-circle');
    carregarClientesDoBanco();
  } catch (error) {
    NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
  }
}

async function carregarClientesDoBanco() {
  try {
    const clientes = await API.getClientes();
    console.log('Clientes do Neon:', clientes);
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

// EXEMPLO 3: Nova Tarefa com Neon
async function novaTarefaComAPI() {
  const descricao = prompt('Descrição da tarefa:');
  if (!descricao) return;

  const categoria = prompt('Categoria (ex: Financeiro, Marketing):');
  const prioridade = prompt('Prioridade (alta/media/baixa):') || 'media';
  const dataStr = prompt('Data (YYYY-MM-DD):');

  try {
    const novaTarefa = await API.createTarefa({
      descricao,
      categoria: categoria || 'Outro',
      prioridade,
      data: dataStr || new Date().toISOString().split('T')[0],
      concluida: false
    });
    
    NOTIF.adicionar('Sucesso', 'Tarefa criada!', 'sucesso', 'ti-check-circle');
    carregarTarefasDoBanco();
  } catch (error) {
    NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
  }
}

async function carregarTarefasDoBanco() {
  try {
    const tarefas = await API.getTarefas();
    console.log('Tarefas do Neon:', tarefas);
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  }
}

// EXEMPLO 4: Deletar lead
async function deletarLeadDoNeon(leadId) {
  if (!confirm('Tem certeza?')) return;
  
  try {
    await API.deleteLead(leadId);
    NOTIF.adicionar('Sucesso', 'Lead deletado!', 'sucesso', 'ti-check-circle');
    carregarLeadsDoBanco();
  } catch (error) {
    NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
  }
}

// EXEMPLO 5: Atualizar tarefa (marcar como concluída)
async function marcarTarefaConcluida(tarefaId, concluida) {
  try {
    await API.updateTarefa(tarefaId, { concluida: !concluida });
    NOTIF.adicionar('Sucesso', 'Tarefa atualizada!', 'sucesso', 'ti-check-circle');
    carregarTarefasDoBanco();
  } catch (error) {
    NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
  }
}

// EXEMPLO 6: Nova Demanda KPMO com Neon
async function novaDemandaComAPI(clienteId) {
  const titulo = prompt('Título da demanda:');
  if (!titulo) return;

  const tipo = prompt('Tipo (Post/Apresentação/Reels/Story):');
  const prioridade = prompt('Prioridade (alta/media/baixa):');
  const prazoStr = prompt('Prazo (YYYY-MM-DD):');

  try {
    const novaDemanda = await API.createDemanda({
      cliente_id: clienteId,
      titulo,
      tipo: tipo || 'Post',
      prioridade: prioridade || 'media',
      status: 'pendente',
      prazo_fim: prazoStr || new Date().toISOString().split('T')[0]
    });
    
    NOTIF.adicionar('Sucesso', 'Demanda criada!', 'sucesso', 'ti-check-circle');
    carregarDemandasDoBanco();
  } catch (error) {
    NOTIF.adicionar('Erro', error.message, 'erro', 'ti-alert-circle');
  }
}

async function carregarDemandasDoBanco() {
  try {
    const demandas = await API.getDemandas();
    console.log('Demandas do Neon:', demandas);
  } catch (error) {
    console.error('Erro ao carregar demandas:', error);
  }
}

// Carregar dados ao inicializar
async function carregarTodosDadosDoBanco() {
  console.log('Carregando todos os dados do Neon...');
  await carregarClientesDoBanco();
  await carregarLeadsDoBanco();
  await carregarTarefasDoBanco();
  await carregarDemandasDoBanco();
}

// Chamar ao carregar a página
window.addEventListener('DOMContentLoaded', carregarTodosDadosDoBanco);
