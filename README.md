# Aplicativo de Gestão de Clínica Médica

O presente projeto é integrante da cadeira Projeto Integrado IV, da Universidade Federal do Cariri (UFCA), composto pelos alunos Felipe Ribeiro Bezerra - Mat. 2022010301, Lucas Germano Feitosa Costa - Mat. 2022010320, Matheus de Oliveira Policarpo - Mat. 2022011971 e Sarah Feitoza Mota - Mat. 20222010419.

Este aplicativo móvel foi desenvolvido para facilitar a gestão de dados de uma clínica de saúde, oferecendo funcionalidades como cadastro de médicos, pacientes, consultas e controle de atendimentos. O projeto utiliza **React Native** para o frontend e **Supabase** como backend em nuvem.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis multiplataforma com interface nativa.
- **Supabase**: Plataforma de backend em nuvem com PostgreSQL, autenticação e armazenamento de arquivos.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas:

- Node.js
- npm (ou yarn)
- Expo CLI


# Testes Cypress

No presente projeto foram aplicados testes automatizados no Cypress, sendo essenciais para garantir a qualidade e a confiabilidade de aplicações web. Desse modo, cabe pontuar algumas vantagens no seu uso:

1. **Detecção precoce de bugs**: permitindo que problemas sejam identificados e corrigidos mais cedo no ciclo de desenvolvimento, antes que afetem os usuários finais. 

2. **Execução rápida e repetitiva**: permitindo que o mesmo conjunto de testes seja executado quantas vezes for necessário sem intervenção manual. 

3. **Ambiente realista de testes**: executa os testes diretamente no navegador e emula as interações do usuário de forma precisa, fornecendo feedback imediato sobre como o aplicativo se comporta em cenários do mundo real.

4. **Cobertura de testes**: possibilitando testar cenários complexos de forma consistente.

5. **Facilidade de integração**: para integrar em pipelines de CI/CD (Integração e Entrega Contínua), permitindo que os testes sejam executados automaticamente em cada alteração de código, aumentando a eficiência e a segurança do processo de desenvolvimento (inclusive, foi o adotado no projeto, em decorrência da dificuldade de implantação dos testes Junit).

6. **Feedback rápido para desenvolvedores**: ajudando os desenvolvedores a ajustar ou melhorar suas implementações de forma ágil.

Isto posto, realizou-se alguns testes referentes ao login e à verificação de cadastro dos médicos, pacientes e consultas, como forma de verificar a conformidade do sistema.

##Instruções para execução do teste Cypress

Como forma de facilitar o uso, apresenta-se como iniciar o teste de login, verificação de cadastro dos médicos, pacientes e consultas, conforme o passo a passo abaixo:

```
npm i
npm start
```

Apertar D para entrar no modo web.


Em seguida rodar o cypress:


```
npm run cypress
```
