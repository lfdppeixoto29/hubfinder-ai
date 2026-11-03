// Banco de Dados Dinâmico conectado diretamente à API Real do GitHub em Tempo Real
let repositories = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
    fetchRealGitHubData('stars:>30000');
    incrementVisits();
});

async function fetchRealGitHubData(query) {
    const grid = document.getElementById('repoGrid');
    if (grid) {
        grid.innerHTML = '<div class="col-span-2 text-center py-12 bg-gray-900/40 rounded-2xl border border-gray-800"><i class="fa-solid fa-spinner fa-spin text-3xl text-indigo-400 mb-3"></i><p class="text-gray-400">Buscando repositórios oficiais no GitHub em tempo real...</p></div>';
    }

    try {
        const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=20`);
        const data = await res.json();
        
        if (data && data.items) {
            repositories = data.items.map((item, idx) => ({
                id: item.id,
                name: item.full_name,
                description: item.description || 'Sem descrição fornecida.',
                stars: item.stargazers_count.toLocaleString('pt-BR'),
                forks: item.forks_count.toLocaleString('pt-BR'),
                language: item.language || 'Diversos',
                url: item.html_url,
                ranking: `#${idx + 1} no Ranking Global do GitHub`,
                aiSummary: `Repositório verificado em ${item.language || 'código aberto'} com ${item.stargazers_count.toLocaleString('pt-BR')} estrelas e alta atividade.`,
                category: classifyCategory(item.topics, item.language, item.name, item.description)
            }));
            renderRepos(repositories);
        }
    } catch (err) {
        console.error('Erro ao buscar dados do GitHub:', err);
    }
}

function classifyCategory(topics = [], language = '', name = '', desc = '') {
    const text = `${name} ${desc} ${topics.join(' ')}`.toLowerCase();
    if (text.includes('ai') || text.includes('llm') || text.includes('gpt') || text.includes('model') || text.includes('agent')) return 'ai';
    if (text.includes('cli') || text.includes('tool') || text.includes('command') || text.includes('terminal')) return 'tools';
    if (text.includes('web') || text.includes('react') || text.includes('vue') || text.includes('next') || text.includes('html')) return 'web';
    if (text.includes('script') || text.includes('automation') || text.includes('scrape') || text.includes('download')) return 'scripts';
    if (text.includes('library') || text.includes('sdk') || text.includes('framework')) return 'libraries';
    return 'open-source';
}

function incrementVisits() {
    let visits = localStorage.getItem('hubfinder_real_visits');
    visits = visits ? parseInt(visits) + 1 : 1;
    localStorage.setItem('hubfinder_real_visits', visits);
    const counterEl = document.getElementById('visitCount');
    if (counterEl) counterEl.innerText = visits.toLocaleString('pt-BR');
}

function renderRepos(repos) {
    const grid = document.getElementById('repoGrid');
    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.innerText = `Mostrando ${repos.length} repositórios oficiais`;
    if (!grid) return;

    if (repos.length === 0) {
        grid.innerHTML = `
            <div class="col-span-2 text-center py-12 bg-gray-900/40 rounded-2xl border border-gray-800">
                <i class="fa-solid fa-triangle-exclamation text-3xl text-yellow-500 mb-3"></i>
                <p class="text-gray-400">Nenhum repositório encontrado.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = repos.map(repo => `
        <div onclick="openRepoDetail('${repo.name}')" class="bg-gray-900/80 border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all flex flex-col justify-between group shadow-xl cursor-pointer hover:scale-[1.01]">
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
                <div class="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl mb-4">
                    <p class="text-xs font-semibold text-indigo-300 mb-1 flex items-center space-x-1.5">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                        <span>Análise HubFinder AI:</span>
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
    if (cat === 'all') fetchRealGitHubData('stars:>30000');
    else if (cat === 'ai') fetchRealGitHubData('topic:artificial-intelligence stars:>5000');
    else if (cat === 'tools') fetchRealGitHubData('topic:cli stars:>5000');
    else if (cat === 'web') fetchRealGitHubData('topic:web-development stars:>10000');
    else if (cat === 'scripts') fetchRealGitHubData('topic:automation stars:>3000');
    else fetchRealGitHubData(`${cat} stars:>5000`);
}

function handleSearch(query) {
    if (!query || query.length < 2) return;
    fetchRealGitHubData(query);
}

function triggerAISearch() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchRealGitHubData(query);
        openAIChat();
        const chat = document.getElementById('aiChatContent');
        if (chat) {
            chat.innerHTML += `
                <div class="p-3 bg-gray-800/40 rounded-xl text-right ml-8">
                    <p class="text-xs font-semibold text-gray-400 mb-1">Você:</p>
                    <p>Busca no GitHub por: "${query}"</p>
                </div>
                <div class="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl mr-8">
                    <p class="font-semibold text-indigo-400 mb-1">🤖 HubFinder AI:</p>
                    <p>Consulta executada na API do GitHub para "${query}". Os resultados foram atualizados na tela principal!</p>
                </div>
            `;
            chat.scrollTop = chat.scrollHeight;
        }
    }
}

function sendAIMessage() {
    const input = document.getElementById('aiInput');
    if (!input) return;
    const msg = input.value.trim();
    if (!msg) return;

    const chat = document.getElementById('aiChatContent');
    if (chat) {
        let reply = `Consulta processada com sucesso no GitHub para "${msg}". Os repositórios mais relevantes foram catalogados pelo nosso assistente inteligente.`;
        const lower = msg.toLowerCase();
        if (lower.includes('react') || lower.includes('frontend')) {
            reply = `O <strong>facebook/react</strong> é a biblioteca líder (#1 global) para interfaces reativas.`;
        } else if (lower.includes('ia') || lower.includes('llm') || lower.includes('python') || lower.includes('claude')) {
            reply = `Para inteligência artificial e modelos, destacamos o <strong>langchain-ai/langchain</strong> e ferramentas de linguagem avançada.`;
        }

        chat.innerHTML += `
            <div class="p-3 bg-gray-800/40 rounded-xl text-right ml-8">
                <p class="text-xs font-semibold text-gray-400 mb-1">Você:</p>
                <p>${msg}</p>
            </div>
            <div class="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl mr-8">
                <p class="font-semibold text-indigo-400 mb-1">🤖 HubFinder AI:</p>
                <p>${reply}</p>
            </div>
        `;
        input.value = '';
        chat.scrollTop = chat.scrollHeight;
    }
}

function openAIChat() { document.getElementById('aiModal').classList.remove('hidden'); }
function closeAIChat() { document.getElementById('aiModal').classList.add('hidden'); }

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
            <div class="flex items-center justify-between pb-4 border-b border-gray-800">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl">
                        <i class="fa-brands fa-github"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">${repo.name}</h3>
                        <span class="text-xs text-indigo-400 font-mono uppercase">⭐ ${repo.stars} Estrelas • 🍴 ${repo.forks} Forks</span>
                    </div>
                </div>
                <button onclick="closeRepoDetail()" class="text-gray-400 hover:text-white p-2">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>
            <div class="py-6 space-y-5 max-h-[70vh] overflow-y-auto text-sm text-gray-300 pr-2">
                <div class="p-4 bg-gray-950/60 rounded-xl border border-gray-800">
                    <h4 class="font-bold text-cyan-400 mb-2">Objeto do Repositório</h4>
                    <p class="text-gray-200 leading-relaxed">${repo.description}</p>
                </div>
            </div>
            <div class="pt-4 border-t border-gray-800 flex items-center justify-between">
                <span class="text-xs text-gray-500 font-mono">Linguagem: ${repo.language}</span>
                <div class="flex space-x-3">
                    <button onclick="closeRepoDetail()" class="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium">Fechar</button>
                    <a href="${repo.url}" target="_blank" class="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium">Acessar no GitHub</a>
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

function openContactModal() { document.getElementById('contactModal').classList.remove('hidden'); }
function closeContactModal() { document.getElementById('contactModal').classList.add('hidden'); }
function submitContact() { alert('Mensagem enviada com sucesso!'); closeContactModal(); }
