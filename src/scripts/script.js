// Obtém a referência do elemento de entrada de texto da tarefa
const taskInput = document.getElementById('taskInput');
// Obtém a referência do botão de adicionar tarefa
const addTaskBtn = document.getElementById('addTaskBtn');
// Obtém a referência da lista de tarefas
const taskList = document.getElementById('taskList');
// Obtém a referência do elemento do círculo de progresso
const progressCircle = document.querySelector('.progress-circle');
// Obtém a referência do elemento de texto da porcentagem de progresso
const progressPercentage = document.getElementById('progressPercentage');

// Inicializa o array de tarefas vazio ou recupera do localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para atualizar o progresso
function updateProgress() {
    // Filtra as tarefas concluídas
    const completedTasks = tasks.filter(task => task.completed).length;
    // Calcula a porcentagem de tarefas concluídas
    const percentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    // Atualiza o texto da porcentagem de progresso
    progressPercentage.textContent = `${percentage.toFixed(0)}%`;
    // Atualiza o gradiente cônico do círculo de progresso
    progressCircle.style.background = `conic-gradient(#007bff ${percentage}%, white ${percentage}% 100%)`;
}

// Função para adicionar uma tarefa
function addTask() {
    // Obtém o texto da tarefa, removendo espaços em branco extras
    const taskText = taskInput.value.trim();
    // Verifica se o texto da tarefa não está vazio
    if (taskText) {
        // Adiciona a tarefa ao array de tarefas
        tasks.push({ text: taskText, completed: false });
        // Limpa o campo de entrada de texto
        taskInput.value = '';
        // Salva as tarefas no localStorage
        saveTasks();
        // Renderiza as tarefas na lista
        renderTasks();
        // Atualiza o progresso
        updateProgress();
    }
}

// Função para alternar o estado de conclusão de uma tarefa
function toggleTask(index) {
    // Inverte o estado de conclusão da tarefa no índice fornecido
    tasks[index].completed = !tasks[index].completed;
    // Salva as tarefas no localStorage
    saveTasks();
    // Renderiza as tarefas na lista
    renderTasks();
    // Atualiza o progresso
    updateProgress();
}

// Função para editar uma tarefa diretamente no texto
function editTask(index) {
    const taskSpan = document.querySelector(`#task-${index} .task-text`);
    const currentText = taskSpan.textContent;

    // Cria um campo de entrada de texto
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;

    // Substitui o texto atual pela caixa de texto
    taskSpan.innerHTML = '';
    taskSpan.appendChild(inputField);

    // Foca o campo de texto para o usuário começar a digitar
    inputField.focus();

    // Evento de salvar a edição ao pressionar Enter
    inputField.addEventListener('blur', function() {
        const newText = inputField.value.trim();
        if (newText !== '') {
            tasks[index].text = newText; // Atualiza o texto da tarefa
            saveTasks();
            renderTasks();
        } else {
            taskSpan.textContent = currentText; // Restaura o texto original se vazio
        }
    });

    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            inputField.blur(); // Finaliza a edição ao pressionar Enter
        }
    });
}

// Função para excluir uma tarefa
function deleteTask(index) {
    // Remove a tarefa do array
    tasks.splice(index, 1);
    // Salva as tarefas no localStorage
    saveTasks();
    // Renderiza as tarefas na lista
    renderTasks();
    // Atualiza o progresso
    updateProgress();
}

// Função para renderizar as tarefas na lista
function renderTasks() {
    // Limpa o conteúdo da lista de tarefas
    taskList.innerHTML = '';
    // Itera sobre o array de tarefas
    tasks.forEach((task, index) => {
        // Cria um elemento de lista (li)
        const li = document.createElement('li');
        li.id = `task-${index}`; // Atribui um id único para cada tarefa
        // Define o HTML interno do elemento de lista
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span class="task-text">${task.text}</span>
            <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
            <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
        `;
        // Adiciona o elemento de lista à lista de tarefas
        taskList.appendChild(li);
    });
}

// Função para salvar as tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar as tarefas do localStorage quando a página for carregada
function loadTasks() {
    if (tasks.length > 0) {
        renderTasks();
        updateProgress();
    }
}

// Adiciona um ouvinte de evento de clique ao botão de adicionar tarefa
addTaskBtn.addEventListener('click', addTask);
// Adiciona um ouvinte de evento de tecla pressionada ao campo de entrada de texto
taskInput.addEventListener('keypress', function(event) {
    // Verifica se a tecla pressionada é Enter
    if (event.key === 'Enter') {
        // Adiciona a tarefa
        addTask();
    }
});

// Carregar as tarefas armazenadas ao carregar a página
window.addEventListener('load', loadTasks);
