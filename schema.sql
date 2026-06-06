-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  cpf VARCHAR(14),
  endereco TEXT,
  desde DATE,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Projetos
CREATE TABLE IF NOT EXISTS projetos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  status VARCHAR(50),
  valor DECIMAL(10, 2),
  prazo DATE,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Leads/CRM
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  status VARCHAR(50),
  servico VARCHAR(255),
  origem VARCHAR(100),
  valor DECIMAL(10, 2),
  proximaAcao TEXT,
  ultimoContato DATE,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Propostas
CREATE TABLE IF NOT EXISTS propostas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  valor DECIMAL(10, 2),
  status VARCHAR(50),
  dataEnvio DATE,
  dataValidade DATE,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tarefas
CREATE TABLE IF NOT EXISTS tarefas (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  categoria VARCHAR(100),
  prioridade VARCHAR(50),
  data DATE,
  concluida BOOLEAN DEFAULT FALSE,
  arquivada BOOLEAN DEFAULT FALSE,
  recorrente BOOLEAN DEFAULT FALSE,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Demandas KPMO
CREATE TABLE IF NOT EXISTS demandas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER,
  titulo VARCHAR(255) NOT NULL,
  tipo VARCHAR(100),
  prioridade VARCHAR(50),
  status VARCHAR(50),
  prazo_inicio DATE,
  prazo_fim DATE,
  descricao TEXT,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Configurações
CREATE TABLE IF NOT EXISTS configuracoes (
  id SERIAL PRIMARY KEY,
  chave VARCHAR(255) NOT NULL UNIQUE,
  valor TEXT,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_projetos_cliente ON projetos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_propostas_cliente ON propostas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_tarefas_data ON tarefas(data);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Inserir configurações padrão
INSERT INTO configuracoes (chave, valor) VALUES
  ('canva_meta_mensal', '100'),
  ('studio_name', ''),
  ('studio_email', '')
ON CONFLICT (chave) DO NOTHING;
