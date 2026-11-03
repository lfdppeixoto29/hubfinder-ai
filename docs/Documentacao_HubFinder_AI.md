# HubFinder AI — Documentação Completa do Projeto

## 1. Visão Geral do Projeto
O **HubFinder AI** é uma plataforma web moderna e de alta performance desenvolvida para revolucionar a descoberta e análise de repositórios, ferramentas, scripts e bots no GitHub. Utilizando inteligência artificial embarcada (Copilot AI), a aplicação oferece busca semântica em tempo real, resumos executivos automáticos de código, contadores de visitas, proteção de privacidade e um robô de sincronização contínua.

---

## 2. Arquitetura e Stack Tecnológica
- **Front-end:** HTML5, Tailwind CSS (via CDN otimizada), JavaScript ES6+ modular.
- **Ícones & Estilização:** FontAwesome 6.4.0, fontes Inter e Fira Code.
- **Hospedagem & Infraestrutura:** Cloudflare Pages (suporte a assets estáticos ilimitados, CDN global e SSL gratuito).
- **SEO & Indexação:** `robots.txt`, `sitemap.xml` e meta tags de verificação para Google e Bing.

---

## 3. Principais Funcionalidades Implementadas
1. **Menu Moderno e Imersivo:** Sidebar em estilo *glassmorphism* com transições suaves, agrupado por categorias oficiais do GitHub.
2. **Identidade Visual Personalizada:** Fundo imersivo baseado na imagem oficial `HubFinder.jpg` com sobreposição escura e logotipo exclusivo (`logo.svg`).
3. **Busca Avançada & Categorias:** Filtros rápidos para Ferramentas, Open Source, Bots & Agents, Bibliotecas e Scripts.
4. **Pop-up de Detalhes do Repositório:** Ao clicar em um projeto, exibe contagem de estrelas/forks, classificação oficial no GitHub (*ranking*), objeto, vantagens e aplicação prática.
5. **HubFinder AI Copilot:** Assistente integrado via chat modal para responder dúvidas sobre os projetos.
6. **Contador de Visitas:** Registro persistente de acessos únicos e totais no site.
7. **Privacidade de E-mail ("Fale Conosco"):** Canal de suporte integrado que protege o e-mail do proprietário (`lfdppeixoto29@gmail.com`).
8. **GitHub Sync Bot:** Robô de varredura executado no carregamento que valida o status dos repositórios e remove automaticamente projetos desativados ou removidos do GitHub.

---

## 4. Guia de Instalação e Execução Local
1. Abra a pasta do projeto: `G:\projeto Hubfinder`
2. Para testar localmente sem bloqueios de CORS, utilize um servidor HTTP estático ou acesse via: `http://localhost:8080/index.html`.
