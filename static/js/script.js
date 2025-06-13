document.addEventListener('DOMContentLoaded', function() {
    // Lógica para as abas principais (Visão Geral, Cadastro, Agendamentos, Financeiro, Contratos)
    const menuButtons = document.querySelectorAll('.main-nav .menu-btn');
    // Seleciona APENAS as divs tab-content que são filhas diretas de main-content
    const tabContents = document.querySelectorAll('.main-content > .tab-content'); 

    function activateTab(tabId) {
        menuButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const clickedButton = document.querySelector(`.main-nav .menu-btn[data-tab="${tabId}"]`);
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        const targetTabContent = document.getElementById(tabId);
        if (targetTabContent) {
            targetTabContent.classList.add('active');

            // Quando uma aba principal é ativada, garante que a primeira sub-aba interna esteja ativa
            // (Isso só se aplica às abas que têm sub-abas, como Agendamentos e Financeiro)
            if (tabId === 'agendamentos') {
                const defaultAgendaTabButton = document.querySelector('.agenda-tabs .menu-btn.active');
                if (defaultAgendaTabButton) {
                    // Ativa a sub-aba padrão da seção Agendamentos
                    activateAgendaTab(defaultAgendaTabButton.dataset.agendaTab);
                } else { 
                    // Se não houver nenhum ativo por padrão, ativa o primeiro
                    activateAgendaTab('agendamentos-futuros');
                }
            } else if (tabId === 'financeiro') {
                const defaultFinanceiroTabButton = document.querySelector('.financeiro-tabs .menu-btn.active');
                if (defaultFinanceiroTabButton) {
                    // Ativa a sub-aba padrão da seção Financeiro
                    activateFinanceiroTab(defaultFinanceiroTabButton.dataset.financeiroTab);
                } else { 
                    // Se não houver nenhum ativo por padrão, ativa o primeiro
                    activateFinanceiroTab('visao-geral-financeira');
                }
            }
        }
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            activateTab(tabId);
        });
    });

    // Lógica para as sub-abas de Agendamentos
    const agendaTabButtons = document.querySelectorAll('.agenda-tabs .menu-btn');
    // Seleciona APENAS as divs .sub-tab-content filhas diretas de #agendamentos
    const agendaTabContents = document.querySelectorAll('#agendamentos > .sub-tab-content'); 

    function activateAgendaTab(tabId) {
        agendaTabButtons.forEach(button => button.classList.remove('active'));
        agendaTabContents.forEach(content => content.classList.remove('active'));

        const clickedButton = document.querySelector(`.agenda-tabs .menu-btn[data-agenda-tab="${tabId}"]`);
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        const targetTabContent = document.getElementById(tabId);
        if (targetTabContent) {
            targetTabContent.classList.add('active');
        }
    }

    agendaTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.agendaTab;
            activateAgendaTab(tabId);
        });
    });

    // Lógica para as sub-abas de Financeiro
    const financeiroTabButtons = document.querySelectorAll('.financeiro-tabs .menu-btn');
    // Seleciona APENAS as divs .sub-tab-content filhas diretas de #financeiro
    const financeiroTabContents = document.querySelectorAll('#financeiro > .sub-tab-content'); 

    function activateFinanceiroTab(tabId) {
        financeiroTabButtons.forEach(button => button.classList.remove('active'));
        financeiroTabContents.forEach(content => content.classList.remove('active'));

        const clickedButton = document.querySelector(`.financeiro-tabs .menu-btn[data-financeiro-tab="${tabId}"]`);
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        const targetTabContent = document.getElementById(tabId);
        if (targetTabContent) {
            targetTabContent.classList.add('active');
        }
    }

    financeiroTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.financeiroTab;
            activateFinanceiroTab(tabId);
        });
    });

    // --- Lógica de Formulário de Cadastro de Pacientes ---
    const cadastroForm = document.getElementById('cadastro-form');
    const cadastroStatusMessage = document.getElementById('cadastro-statusMessage');
    const cadastroPatientTableBody = document.getElementById('cadastro-patientTableBody');
    const cadastroNoPacientesMessage = document.getElementById('cadastro-noPacientesMessage');
    const cadastroSearchInput = document.getElementById('cadastro-searchPatient');

    let pacientes = []; // Array para armazenar pacientes (simulado, em um app real viria do backend)

    // Função para exibir pacientes na tabela
    function renderPatients() {
        cadastroPatientTableBody.innerHTML = ''; // Limpa a tabela
        if (pacientes.length === 0) {
            cadastroNoPacientesMessage.style.display = 'block';
            return;
        } else {
            cadastroNoPacientesMessage.style.display = 'none';
        }

        pacientes.forEach((paciente, index) => {
            const row = cadastroPatientTableBody.insertRow();
            row.insertCell(0).textContent = paciente.nomePaciente;
            row.insertCell(1).textContent = paciente.telefone;
            row.insertCell(2).textContent = paciente.email || 'N/A';
            row.insertCell(3).textContent = paciente.cpf || 'N/A';

            const actionsCell = row.insertCell(4);
            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.title = 'Editar';
            editButton.classList.add('action-icon-btn', 'edit-btn');
            editButton.addEventListener('click', () => editPatient(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.title = 'Excluir';
            deleteButton.classList.add('action-icon-btn', 'delete-btn');
            deleteButton.addEventListener('click', () => deletePatient(index));
            actionsCell.appendChild(deleteButton);
        });
    }

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const novoPaciente = {
            nomePaciente: document.getElementById('cadastro-nomePaciente').value,
            telefone: document.getElementById('cadastro-telefone').value,
            email: document.getElementById('cadastro-email').value,
            cpf: document.getElementById('cadastro-cpf').value,
            rg: document.getElementById('cadastro-rg').value,
            dataNascimento: document.getElementById('cadastro-dataNascimento').value,
            sexo: document.getElementById('cadastro-sexo').value,
            endereco: document.getElementById('cadastro-endereco').value,
            cidade: document.getElementById('cadastro-cidade').value,
            estado: document.getElementById('cadastro-estado').value,
            cep: document.getElementById('cadastro-cep').value,
            observacoes: document.getElementById('cadastro-observacoes').value
        };

        pacientes.push(novoPaciente);
        renderPatients();

        cadastroStatusMessage.textContent = 'Paciente cadastrado com sucesso!';
        cadastroStatusMessage.style.backgroundColor = 'var(--success-color)';
        cadastroStatusMessage.style.display = 'block';
        
        cadastroForm.reset();

        setTimeout(() => {
            cadastroStatusMessage.style.display = 'none';
        }, 3000);
    });

    function editPatient(index) {
        alert('Funcionalidade de edição para ' + pacientes[index].nomePaciente + ' (índice: ' + index + ') ainda não implementada.');
    }

    function deletePatient(index) {
        if (confirm('Tem certeza que deseja excluir o paciente ' + pacientes[index].nomePaciente + '?')) {
            pacientes.splice(index, 1);
            renderPatients();
            cadastroStatusMessage.textContent = 'Paciente excluído com sucesso!';
            cadastroStatusMessage.style.backgroundColor = 'var(--error-color)';
            cadastroStatusMessage.style.display = 'block';
            setTimeout(() => {
                cadastroStatusMessage.style.display = 'none';
            }, 3000);
        }
    }

    cadastroSearchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = cadastroPatientTableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const nome = row.cells[0].textContent.toLowerCase();
            const cpf = row.cells[3].textContent.toLowerCase();

            if (nome.includes(searchTerm) || cpf.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });


    // --- Lógica de Upload de Contratos (apenas UI) ---
    const fileUpload = document.getElementById('fileUpload');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (fileUpload && fileNameDisplay) {
        fileUpload.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
            }
        });
    }

    // --- Lógica de Gráficos Financeiros (usando Chart.js) ---
    const revenueExpenseChartCtx = document.getElementById('revenueExpenseChart');
    if (revenueExpenseChartCtx) {
        new Chart(revenueExpenseChartCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Receita',
                        data: [ 5000, 10000,12000, 15000, 18000],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Despesa',
                        data: [3000, 3500, 3200, 4000, 4120, 4500],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const revenueByTypeChartCtx = document.getElementById('revenueByTypeChart');
    if (revenueByTypeChartCtx) {
        new Chart(revenueByTypeChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Consultas', 'Exames', 'Procedimentos', 'Outros'],
                datasets: [{
                    data: [8000, 3000, 4000, 670],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(19, 43, 43, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    // Inicializa a exibição da tabela de pacientes
    renderPatients();

    // Inicializa a aba "Visão Geral" ao carregar a página
    activateTab('menu');
});