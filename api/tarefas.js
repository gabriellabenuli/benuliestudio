import pool from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const result = await pool.query('SELECT * FROM tarefas WHERE NOT arquivada ORDER BY data DESC');
      return res.status(200).json(result.rows);
    }
    if (req.method === 'POST') {
      const { descricao, categoria, prioridade, data, concluida, recorrente } = req.body;
      const result = await pool.query(
        'INSERT INTO tarefas (descricao, categoria, prioridade, data, concluida, recorrente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [descricao, categoria, prioridade, data, concluida || false, recorrente || false]
      );
      return res.status(201).json(result.rows[0]);
    }
    if (req.method === 'PUT') {
      const { id, ...dados } = req.body;
      const fields = Object.keys(dados).map((k, i) => `${k}=$${i+1}`).join(', ');
      const result = await pool.query(
        `UPDATE tarefas SET ${fields}, atualizado=CURRENT_TIMESTAMP WHERE id=$${Object.keys(dados).length + 1} RETURNING *`,
        [...Object.values(dados), id]
      );
      return res.status(200).json(result.rows[0]);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await pool.query('DELETE FROM tarefas WHERE id=$1', [id]);
      return res.status(200).json({ mensagem: 'Tarefa deletada' });
    }
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
