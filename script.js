function gerarPlano() {
  let escola = document.getElementById("escola").value;
  let professor = document.getElementById("professor").value;
  let disciplina = document.getElementById("disciplina").value;
  let data = document.getElementById("data").value;

  let tema = document.getElementById("tema").value;
  let serie = document.getElementById("serie").value;
  let tempo = document.getElementById("tempo").value;

  let plano = `
    <h2>Plano de Aula – Roteiro Completo para o Professor</h2>

    <p><b>Escola:</b> ${escola}</p>
    <p><b>Professor:</b> ${professor}</p>
    <p><b>Disciplina:</b> ${disciplina}</p>
    <p><b>Data:</b> ${data}</p>

    <p><b>Tema:</b> ${tema}</p>
    <p><b>Série:</b> ${serie}</p>
    <p><b>Duração:</b> ${tempo}</p>

    <hr>

    <h3>Objetivo da Aula</h3>
    <p>
    Ao final da aula, os alunos devem compreender o conceito de <b>${tema}</b> 
    e saber aplicar esse conhecimento em situações do dia a dia relacionadas ao uso do dinheiro.
    </p>

    <h3>Explicação do Conteúdo (guia para o professor)</h3>
    <p><b>Explique assim:</b><br>
    "${tema} é algo presente no nosso cotidiano, principalmente quando precisamos tomar decisões envolvendo dinheiro."<br><br>

    <b>Exemplo simples para falar:</b><br>
    "Quando você decide comprar algo ou guardar dinheiro, você está lidando com ${tema}."<br><br>

    <b>Dica:</b><br>
    Use exemplos próximos da realidade dos alunos, como compras, mesada ou gastos do dia a dia.
    </p>

    <h3>Roteiro da Aula (Passo a Passo)</h3>

    <p><b>1. Início da aula (10 minutos)</b><br>
    Pergunte aos alunos:<br>
    - "O que vocês entendem por ${tema}?"<br>
    - "Vocês já viram isso no dia a dia?"<br><br>
    👉 Objetivo: incentivar participação e ativar conhecimento prévio.
    </p>

    <p><b>2. Explicação (20 minutos)</b><br>
    Apresente o conteúdo de forma simples e clara.<br><br>

    👉 Fale isso:<br>
    "Usamos ${tema} quando tomamos decisões financeiras."<br><br>

    👉 Dê exemplos:<br>
    - Comprar ou economizar<br>
    - Planejar gastos<br>
    - Evitar desperdícios
    </p>

    <p><b>3. Atividade prática (20 minutos)</b><br>
    Proponha a situação:<br><br>

    <i>"Você tem R$100. Como organizaria seus gastos durante a semana?"</i><br><br>

    👉 Oriente os alunos a pensar antes de decidir e justificar suas escolhas.
    </p>

    <p><b>4. Discussão e reflexão (10 minutos)</b><br>
    Pergunte:<br>
    - "Foi fácil ou difícil decidir?"<br>
    - "O que vocês aprenderam?"<br><br>

    👉 Ajude os alunos a refletirem sobre suas decisões.
    </p>

    <h3>Atividade para registro</h3>
    <p>
    Os alunos devem escrever como organizaram o dinheiro e explicar suas escolhas.
    </p>

    <h3>Avaliação</h3>
    <ul>
      <li>Participação nas atividades</li>
      <li>Compreensão do tema</li>
      <li>Capacidade de justificar decisões</li>
    </ul>

    <h3>Recursos necessários</h3>
    <ul>
      <li>Quadro e marcador</li>
      <li>Folha de atividade</li>
      <li>Lápis ou caneta</li>
    </ul>

    <h3>Orientação ao Professor</h3>
    <p>
    Não é necessário dominar totalmente o conteúdo.<br>
    O mais importante é conduzir a aula com exemplos simples e incentivar a participação dos alunos.<br><br>

    👉 Se surgir dúvida, transforme em pergunta para a turma — isso também promove aprendizagem.
    </p>
  `;

  document.getElementById("resultado").innerHTML = plano;
}

function baixarPlano() {
  let elemento = document.getElementById("resultado");

  if (!elemento.innerText.trim()) {
    alert("Gere o plano antes de baixar!");
    return;
  }

  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  let escola = document.getElementById("escola").value;
  let professor = document.getElementById("professor").value;
  let disciplina = document.getElementById("disciplina").value;
  let data = document.getElementById("data").value;

  // CAPA
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  doc.text("PLANO DE AULA", 105, 60, { align: "center" });

  doc.setFontSize(14);
  doc.text("EduPlanFin-AI", 105, 80, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");

  doc.text(`Escola: ${escola}`, 20, 120);
  doc.text(`Professor: ${professor}`, 20, 130);
  doc.text(`Disciplina: ${disciplina}`, 20, 140);
  doc.text(`Data: ${data}`, 20, 150);

  doc.addPage();

  let y = 20;
  let elementos = elemento.querySelectorAll("h2, h3, p, li");

  elementos.forEach(el => {
    let texto = el.innerText.replace(/[^\x00-\x7F]/g, "");

    if (el.tagName === "H2" || el.tagName === "H3") {
      doc.setFont("Helvetica", "bold");
    } else {
      doc.setFont("Helvetica", "normal");
    }

    let linhas = doc.splitTextToSize(texto, 180);

    linhas.forEach(linha => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(linha, 10, y);
      y += 6;
    });

    y += 3;
  });

  doc.save("Plano_de_Aula_Profissional.pdf");
}

function limparCampos() {
  document.getElementById("escola").value = "";
  document.getElementById("professor").value = "";
  document.getElementById("disciplina").value = "";
  document.getElementById("data").value = "";
  document.getElementById("tema").value = "";
  document.getElementById("serie").value = "";
  document.getElementById("tempo").value = "";
  document.getElementById("resultado").innerHTML = "";
}