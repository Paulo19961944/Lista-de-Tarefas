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

// Inicializa o array de tarefas vazio
let tasks = [];

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
        // Define o HTML interno do elemento de lista
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span>${task.text}</span>
        `;
        // Adiciona o elemento de lista à lista de tarefas
        taskList.appendChild(li);
    });
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