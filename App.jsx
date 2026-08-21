import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import FormComponent from "./components/FormComponent";
import ListComponent from "./components/ListComponent";
import BtComponent from "./components/BtComponent";
import Footer from "./components/Footer";

function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (texto.trim() !== "") {
      const tarefaJaExiste = tarefas.find(
        (tarefa) => tarefa.texto.toLowerCase() === texto.trim().toLowerCase()
      );

      if (tarefaJaExiste) {
        alert("Essa tarefa já foi adicionada!");
        return;
      }

      const novaTarefa = {
        texto: texto.trim(),
        concluida: false,
      };

      setTarefas([...tarefas, novaTarefa]);
      setTexto("");
    }
  }

  function limparTarefas() {
    setTarefas([]);
  }

  function removerTarefa(indiceRemover) {
    const listaAtualizada = tarefas.filter(
      (_, indice) => indice !== indiceRemover
    );
    setTarefas(listaAtualizada);
  }

  function concluirTarefa(indiceSelecionado) {
    const listaAtualizada = tarefas.map((tarefa, indice) => {
      if (indice === indiceSelecionado) {
        return {
          ...tarefa,
          concluida: !tarefa.concluida,
        };
      }
      return tarefa;
    });

    setTarefas(listaAtualizada);
  }

  return (
    <div className="container">
      
      <Header />

      <p className="digitado">Você digitou: {texto}</p>

      {tarefas.length === 0 && (
        <p className="vazio">Nenhuma tarefa cadastrada</p>
      )}

      <FormComponent
        texto={texto}
        adicionarTarefa={adicionarTarefa}
        setTexto={setTexto}
      />

      <ListComponent
        tarefas={tarefas}
        concluirTarefa={concluirTarefa}
        removerTarefa={removerTarefa}
      />

      {tarefas.length > 0 && (
        <BtComponent texto="Limpar Tarefas" onClick={limparTarefas} />
      )}

      <Footer totalTarefas={tarefas.length} />
      
    </div>
  );
}

export default App;