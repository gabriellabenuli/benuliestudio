import pool from './db.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - Listar clientes
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM clientes ORDER BY criado DESC');
      return res.status(200).json(result.rows);
    }

    // POST - Criar cliente
    if (req.method === 'POST') {
      const { nome, email, telefone, cpf, endereco } = req.body;
      const result = await pool.query(
        'INSERT INTO clientes (nome, email, telefone, cpf, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nome, email, telefone, cpf, endereco]
      );
      return res.status(201).json(result.rows[0]);
    }

    // PUT - Atualizar cliente
    if (req.method === 'PUT') {
      const { id, nome, email, telefone, cpf, endereco } = req.body;
      const result = await pool.query(
        'UPDATE clientes SET nome=$1, email=$2, telefone=$3, cpf=$4, endereco=$5, atualizado=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *',
        [nome, email, telefone, cpf, endereco, id]
      );
      return res.status(200).json(result.rows[0]);
    }

    // DELETE - Deletar cliente
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await pool.query('DELETE FROM clientes WHERE id=$1', [id]);
      return res.status(200).json({ mensagem: 'Cliente deletado' });
    }

    res.status(405).json({ erro: 'Método não permitido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
}
