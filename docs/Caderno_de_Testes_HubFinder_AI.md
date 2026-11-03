# HubFinder AI — Caderno de Testes & Homologação

Este documento registra os cenários de teste executados para garantir a qualidade, estabilidade e conformidade do HubFinder AI antes do deploy em produção.

---

## 📋 Cenários de Teste

| ID | Módulo / Funcionalidade | Cenário de Teste | Critério de Aceitação | Status |
|----|-------------------------|------------------|----------------------|--------|
| **CT-01** | **Interface & Fundo** | Carregar a página inicial com a imagem `HubFinder.jpg` e menu lateral. | O fundo deve carregar corretamente com overlay e o menu lateral *glassmorphism* deve estar visível e responsivo. | **APROVADO** |
| **CT-02** | **Busca por Categoria** | Clicar nos botões de categoria (Ferramentas, Open Source, Bots, Bibliotecas, Scripts). | A listagem de repositórios deve filtrar instantaneamente apenas os itens pertencentes à categoria selecionada. | **APROVADO** |
| **CT-03** | **Pop-up de Repositório** | Clicar em qualquer card de repositório na listagem. | Deve abrir um modal detalhado exibindo as estrelas, forks, classificação GitHub, vantagens e aplicação prática. | **APROVADO** |
| **CT-04** | **Copilot IA** | Clicar no botão "Buscar com IA" ou "Copilot IA". | O modal de chat da IA deve abrir, permitindo interações e envio de perguntas simuladas. | **APROVADO** |
| **CT-05** | **Contador de Visitas** | Acessar o site e verificar o rodapé do menu lateral. | O contador numérico de visitas deve exibir o valor atual e incrementar a cada nova sessão/refresh. | **APROVADO** |
| **CT-06** | **Fale Conosco (Privacidade)** | Acessar o menu "Fale Conosco" e enviar uma mensagem de teste. | O formulário deve disparar o alerta de sucesso sem expor nenhum e-mail pessoal na interface. | **APROVADO** |
| **CT-07** | **GitHub Sync Bot** | Executar a inicialização do script com repositórios ativos e inativos. | O robô deve manter os ativos e remover automaticamente da listagem qualquer repositório marcado como inativo. | **APROVADO** |
| **CT-08** | **SEO & Indexação** | Validar presença de `robots.txt` e `sitemap.xml`. | Os arquivos de configuração de busca para Google e Bing devem estar corretos na raiz do projeto. | **APROVADO** |

---
*Homologado e validado em ambiente local. Pronto para publicação em produção.*
