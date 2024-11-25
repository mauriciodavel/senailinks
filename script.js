document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formAgenda");
    const btnCancelar = document.getElementById("cancelar");

    // Cancelar redireciona para a página anterior
    btnCancelar.addEventListener("click", () => {
        window.history.back();
    });

    // Enviar formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar campos
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const email = document.getElementById("email").value;
        const tipoAgenda = document.getElementById("tipoAgenda").value;
        const dataHora = document.getElementById("dataHora").value;
        const expectativas = document.getElementById("expectativas").value;
        const curso = document.getElementById("curso").value;

        // Salvar dados em CSV
        const csvContent = `Nome completo,Telefone,E-mail,Tipo de Agenda,Data/Hora,Expectativas,Curso\n"${nome}","${telefone}","${email}","${tipoAgenda}","${dataHora}","${expectativas}","${curso}"`;
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "solicitacao_agenda.csv";
        link.click();

        // Enviar e-mail usando EmailJS
        emailjs.init("SEU_USER_ID"); // Substitua por seu User ID do EmailJS
        emailjs.send("default_service", "template_id", {
            nome,
            telefone,
            email,
            tipoAgenda,
            dataHora,
            expectativas,
            curso
        }).then(() => {
            alert("Solicitação enviada com sucesso!");
        }).catch((error) => {
            console.error("Erro ao enviar e-mail:", error);
            alert("Erro ao enviar solicitação.");
        });
    });
});
