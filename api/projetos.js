import pool from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM projetos ORDER BY criado DESC');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { cliente_id, nome, descricao, status, valor, prazo } = req.body;
      const result = await pool.query(
        'INSERT INTO projetos (cliente_id, nome, descricao, status, valor, prazo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [cliente_id, nome, descricao, status, valor, prazo]
      );
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, cliente_id, nome, descricao, status, valor, prazo } = req.body;
      const result = await pool.query(
        'UPDATE projetos SET cliente_id=$1, nome=$2, descricao=$3, status=$4, valor=$5, prazo=$6, atualizado=CURRENT_TIMESTAMP WHERE id=$7 RETURNING *',
        [cliente_id, nome, descricao, status, valor, prazo, id]
      );
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await pool.query('DELETE FROM projetos WHERE id=$1', [id]);
      return res.status(200).json({ mensagem: 'Projeto deletado' });
    }

    res.status(405).json({ erro: 'Método não permitido' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
