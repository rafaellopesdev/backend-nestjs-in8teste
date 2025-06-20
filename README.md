## Descrição

Este é um projeto back-end desenvolvido com **NestJS**, estruturado com base nos princípios da Clean Architecture. A infraestrutura foi simplificada com o uso de Docker, facilitando a execução e o desenvolvimento local. A combinação entre os módulos do NestJS e a separação de responsabilidades garante uma base escalável, organizada e de fácil manutenção.

---

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## Configuração do Ambiente

1. Copie o arquivo de variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

---

## Executando a aplicação

Com o Docker instalado e configurado corretamente:

```bash
sudo docker-compose up --build
```

---

## Documentação da API

O consumo das APIs é bem simplificado pois seguimos os padrões REST/OpenAPI. Para consumir as APIs, basta seguir a url abaixo:

```bash
http://localhost:3001/api/v1/documentation
```
