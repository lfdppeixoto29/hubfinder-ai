require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''; // Opcional, mas aumenta o limite de requisições

// Endpoint para busca completa no GitHub em tempo real
app.get('/api/search', async (req, res) => {
    const query = req.query.q || 'stars:>50000';
    const sort = req.query.sort || 'stars';
    
    try {
        const headers = {
            'User-Agent': 'HubFinder-AI-Engine',
            'Accept': 'application/vnd.github.v3+json'
        };
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }

        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=desc&per_page=20`;
        
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.message || 'Erro ao consultar a API do GitHub'
            });
        }

        // Mapeia os dados para o formato inteligente do HubFinder
        const repositories = data.items.map(item => ({
            id: item.id,
            name: item.full_name,
            description: item.description || 'Sem descrição fornecida.',
            stars: item.stargazers_count.toLocaleString('pt-BR'),
            forks: item.forks_count.toLocaleString('pt-BR'),
            language: item.language || 'Diversos',
            url: item.html_url,
            owner: item.owner.login,
            updated_at: item.updated_at,
            category: classifyCategory(item.topics, item.language, item.name, item.description),
            aiSummary: generateAISummary(item)
        }));

        res.json({
            total_count: data.total_count,
            items: repositories
        });

    } catch (error) {
        console.error('Erro no servidor backend:', error);
        res.status(500).json({ error: 'Erro interno ao processar a busca no GitHub.' });
    }
});

// Classificador inteligente de categorias baseado em tópicos e descrições
function classifyCategory(topics = [], language = '', name = '', desc = '') {
    const text = `${name} ${desc} ${topics.join(' ')}`.toLowerCase();
    if (text.includes('ai') || text.includes('llm') || text.includes('gpt') || text.includes('model') || text.includes('agent')) return 'ai';
    if (text.includes('cli') || text.includes('tool') || text.includes('command') || text.includes('terminal')) return 'tools';
    if (text.includes('web') || text.includes('react') || text.includes('vue') || text.includes('next') || text.includes('html')) return 'web';
    if (text.includes('script') || text.includes('automation') || text.includes('scrape') || text.includes('download')) return 'scripts';
    if (text.includes('library') || text.includes('sdk') || text.includes('framework')) return 'libraries';
    return 'open-source';
}

// Gerador automático de resumo analítico simulando IA
function generateAISummary(item) {
    const lang = item.language || 'Tecnologia Mista';
    const stars = item.stargazers_count;
    return `Repositório altamente validado em ${lang} com ${stars.toLocaleString('pt-BR')} estrelas. Focado em alta performance, robustez e ampla adoção pela comunidade open-source global.`;
}

app.listen(PORT, () => {
    console.log(`🚀 HubFinder AI Backend rodando na porta ${PORT}`);
});
