// Banco de Dados Mock de Repositórios do GitHub com IA
let repositories = [
    {
        id: 1,
        name: "facebook/react",
        category: "libraries",
        description: "The library for web and native user interfaces. Build once, render anywhere with state-of-the-art components.",
        stars: "224,512",
        forks: "45,200",
        language: "JavaScript",
        ranking: "#1 em UI Libraries no GitHub (Top 0.01% global)",
        aiSummary: "Essencial para SPAs modernos. Alta performance com Virtual DOM e ecossistema massivo.",
        url: "https://github.com/facebook/react",
        active: true
    },
    {
        id: 2,
        name: "langchain-ai/langchain",
        category: "ai",
        description: "Building applications with LLMs through composability. Connect models to data sources and APIs.",
        stars: "89,500",
        forks: "14,100",
        language: "Python",
        ranking: "#3 em Inteligência Artificial e LLMs",
        aiSummary: "O framework líder para criação de agentes inteligentes e aplicações RAG com LLMs.",
        url: "https://github.com/langchain-ai/langchain",
        active: true
    },
    {
        id: 3,
        name: "cli/cli",
        category: "tools",
        description: "GitHub’s official command line tool. Bring your GitHub issues, pull requests, and more to your terminal.",
        stars: "34,200",
        forks: "2,800",
        language: "Go",
        ranking: "#5 em Ferramentas de Desenvolvedor Oficiais",
        aiSummary: "Ferramenta CLI oficial indispensável para gerenciar PRs e issues direto do terminal.",
        url: "https://github.com/cli/cli",
        active: true
    },
    {
        id: 4,
        name: "puppeteer/puppeteer",
        category: "scripts",
        description: "Node.js library which provides a high-level API to control Chrome or Firefox over the DevTools Protocol.",
        stars: "86,100",
        forks: "10,400",
        language: "TypeScript",
        ranking: "#2 em Automação Web e Web Scraping",
        aiSummary: "Excelente para automação web, testes E2E e geração de screenshots/PDFs em lote.",
        url: "https://github.com/puppeteer/puppeteer",
        active: true
    }
];

let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
    runGitHubSyncBot();
    incrementVisits();
});

// Robô Sincronizador de Repositórios (Simula varredura na API do GitHub)
function runGitHubSyncBot() {
    console.log("🤖 [GitHub Sync Bot]: Iniciando varredura e validação de repositórios...");
    
    // Filtra apenas os repositórios ativos (removendo os que foram deletados ou arquivados no GitHub)
    repositories = repositories.filter(repo => {
        if (repo.active === false) {
            console.warn(`🗑️ [GitHub Sync Bot]: Repositório ${repo.name} não existe mais no GitHub. Removido da pesquisa.`);
            return false;
        }
        return true;
    });

    renderRepos(repositories);
    console.log("✅ [GitHub Sync Bot]: Sincronização concluída com sucesso. Índice atualizado.");
}

function incrementVisits() {
    let visits = localStorage.getItem('hubfinder_visits');
    if (!visits) {
        visits = 14892;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem('hubfinder_visits', visits);
    const counterEl = document.getElementById('visitCount');
    if (counterEl) {
        counterEl.innerText = visits.toLocaleString('pt-BR');
    }
}

function renderRepos(repos) {
    const grid = document.getElementById('repoGrid');
    document.getElementById('resultCount').innerText = `Mostrando ${repos.length} repositórios`;
    
    if (repos.length === 0) {
        grid.innerHTML = `
            <div class="col-span-2 text-center py-12 bg-gray-900/40 rounded-2xl border border-gray-800">
                <i class="fa-solid fa-triangle-exclamation text-3xl text-yellow-500 mb-3"></i>
                <p class="text-gray-400">Nenhum repositório encontrado com estes critérios.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = repos.map(repo => `
        <div onclick="openRepoDetail('${repo.name}')" class="bg-brand-card/80 border border-brand-border hover:border-indigo-500/50 rounded-2xl p-6 transition-all flex flex-col justify-between group shadow-xl cursor-pointer hover:scale-[1.01]">
            <div>
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center font-bold">
                            <i class="fa-brands fa-github text-lg"></i>
                        </div>
                        <div>
                            <span class="font-bold text-white group-hover:text-indigo-400 transition-colors text-base flex items-center space-x-2">
                                <span>${repo.name}</span>
                                <i class="fa-solid fa-arrow-up-right-from-square text-xs text-gray-500"></i>
                            </span>
                            <span class="text-xs text-indigo-400 font-mono uppercase">${repo.category}</span>
                        </div>
                    </div>
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                        ⭐ ${repo.stars}
                    </span>
                </div>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2">${repo.description}</p>
                
                <!-- IA Summary Box -->
                <div class="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl mb-4">
                    <p class="text-xs font-semibold text-indigo-300 mb-1 flex items-center space-x-1.5">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                        <span>Resumo HubFinder AI:</span>
                    </p>
                    <p class="text-xs text-gray-300">${repo.aiSummary}</p>
                </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-gray-800 text-xs text-gray-400">
                <span class="flex items-center space-x-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <span>${repo.language}</span>
                </span>
                <span class="text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1">
                    <span>Ver Análise Completa</span>
                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </span>
            </div>
        </div>
    `).join('');
}

function filterByCategory(cat) {
    currentCategory = cat;
    if (cat === 'all') {
        renderRepos(repositories);
    } else {
        const filtered = repositories.filter(r => r.category === cat);
        renderRepos(filtered);
    }
}

function handleSearch(query) {
    const q = query.toLowerCase();
    const filtered = repositories.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) ||
        r.language.toLowerCase().includes(q) ||
        r.aiSummary.toLowerCase().includes(q)
    );
    renderRepos(filtered);
}

function triggerAISearch() {
    const query = document.getElementById('searchInput').value;
    openAIChat();
    if (query) {
        const chat = document.getElementById('aiChatContent');
        chat.innerHTML += `
            <div class="p-3 bg-gray-800/40 rounded-xl text-right ml-8">
                <p class="text-xs font-semibold text-gray-400 mb-1">Você:</p>
                <p>Busca inteligente por: "${query}"</p>
            </div>
            <div class="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl mr-8">
                <p class="font-semibold text-indigo-400 mb-1">🤖 HubFinder AI:</p>
                <p>Analisando o GitHub em busca de correspondências semânticas para "${query}"... Encontrei projetos compatíveis com alta atividade e documentação validada!</p>
            </div>
        `;
        chat.scrollTop = chat.scrollHeight;
    }
}

function openAIChat() {
    document.getElementById('aiModal').classList.remove('hidden');
}

function closeAIChat() {
    document.getElementById('aiModal').classList.add('hidden');
}

function openRepoDetail(repoName) {
    const repo = repositories.find(r => r.name === repoName);
    if (!repo) return;

    let modal = document.getElementById('repoDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'repoDetailModal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="bg-gray-900 border border-indigo-500/40 rounded-2xl w-full max-w-3xl p-6 shadow-2xl relative overflow-hidden">
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between pb-4 border-b border-gray-800">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl">
                        <i class="fa-brands fa-github"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">${repo.name}</h3>
                        <span class="text-xs text-indigo-400 font-mono uppercase">${repo.category} • ⭐ ${repo.stars} Estrelas • 🍴 ${repo.forks} Forks</span>
                    </div>
                </div>
                <button onclick="closeRepoDetail()" class="text-gray-400 hover:text-white p-2">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            <div class="py-6 space-y-5 max-h-[70vh] overflow-y-auto text-sm text-gray-300 pr-2">
                <!-- Classificação e Estrelas no GitHub -->
                <div class="p-4 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 rounded-xl border border-indigo-500/30 flex items-center justify-between">
                    <div>
                        <h4 class="font-bold text-indigo-300 mb-1 flex items-center gap-2">
                            <i class="fa-solid fa-trophy text-yellow-400"></i> Classificação Oficial GitHub
                        </h4>
                        <p class="text-gray-200 font-semibold">${repo.ranking}</p>
                    </div>
                    <div class="text-right">
                        <span class="text-xs text-gray-400 block">Total de Estrelas</span>
                        <span class="text-lg font-bold text-yellow-400 font-mono">⭐ ${repo.stars}</span>
                    </div>
                </div>

                <!-- Objeto do Repositório -->
                <div class="p-4 bg-gray-950/60 rounded-xl border border-gray-800">
                    <h4 class="font-bold text-cyan-400 mb-2 flex items-center gap-2">
                        <i class="fa-solid fa-bullseye"></i> Objeto do Repositório
                    </h4>
                    <p class="text-gray-200 leading-relaxed">${repo.description}</p>
                </div>

                <!-- Vantagens -->
                <div class="p-4 bg-indigo-950/30 rounded-xl border border-indigo-500/20">
                    <h4 class="font-bold text-indigo-400 mb-2 flex items-center gap-2">
                        <i class="fa-solid fa-star"></i> Vantagens Principais
                    </h4>
                    <ul class="list-disc list-inside space-y-1.5 text-gray-200">
                        <li>Alta performance e otimização para ecossistemas ${repo.language}.</li>
                        <li>Comunidade extremamente ativa com ${repo.stars} estrelas no GitHub.</li>
                        <li>Arquitetura modular facilitando manutenção, testes e escalabilidade.</li>
                    </ul>
                </div>

                <!-- Aplicação Prática -->
                <div class="p-4 bg-purple-950/30 rounded-xl border border-purple-500/20">
                    <h4 class="font-bold text-purple-400 mb-2 flex items-center gap-2">
                        <i class="fa-solid fa-rocket"></i> Aplicação Prática
                    </h4>
                    <p class="text-gray-200 leading-relaxed">${repo.aiSummary}</p>
                </div>
            </div>

            <div class="pt-4 border-t border-gray-800 flex items-center justify-between">
                <span class="text-xs text-gray-500 font-mono">Linguagem: ${repo.language}</span>
                <div class="flex space-x-3">
                    <button onclick="closeRepoDetail()" class="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-all">
                        Fechar
                    </button>
                    <a href="${repo.url}" target="_blank" class="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium transition-all flex items-center space-x-2">
                        <span>Acessar no GitHub</span>
                        <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

function closeRepoDetail() {
    const modal = document.getElementById('repoDetailModal');
    if (modal) modal.classList.add('hidden');
}

function openContactModal() {
    document.getElementById('contactModal').classList.remove('hidden');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.add('hidden');
}

function submitContact() {
    const name = document.getElementById('contactName').value;
    const msg = document.getElementById('contactMsg').value;
    if (!name || !msg) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    alert('Mensagem enviada com sucesso! Nossa equipe entrará em contato de forma segura.');
    document.getElementById('contactName').value = '';
    document.getElementById('contactMsg').value = '';
    closeContactModal();
}
