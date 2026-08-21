function Footer({ totalTarefas }) {
  return (
    <footer className="footer">
      <p className="digitando">Total de tarefas: {totalTarefas}</p>
      <p style={{ fontSize: '12px', marginTop: '10px' }}>&copy; 2026 - Projeto Lista de Tarefas</p>
    </footer>
  );
}

export default Footer;