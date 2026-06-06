import pool from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM demandas ORDER BY criado DESC');
      return res.status(200).json(result.rows);
    }
    if (req.method === 'POST') {
      const { cliente_id, titulo, tipo, prioridade, status, prazo_inicio, prazo_fim, descricao } = req.body;
      const result = await pool.query(
        'INSERT INTO demandas (cliente_id, titulo, tipo, prioridade, status, prazo_inicio, prazo_fim, descricao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [cliente_id, titulo, tipo, prioridade, status, prazo_inicio, prazo_fim, descricao]
      );
      return res.status(201).json(result.rows[0]);
    }
    if (req.method === 'PUT') {
      const { id, ...dados } = req.body;
      const fields = Object.keys(dados).map((k, i) => `${k}=$${i+1}`).join(', ');
      const result = await pool.query(
        `UPDATE demandas SET ${fields}, atualizado=CURRENT_TIMESTAMP WHERE id=$${Object.keys(dados).length + 1} RETURNING *`,
        [...Object.values(dados), id]
      );
      return res.status(200).json(result.rows[0]);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await pool.query('DELETE FROM demandas WHERE id=$1', [id]);
      return res.status(200).json({ mensagem: 'Demanda deletada' });
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
