# Projeto: Poke Trader

## Requisitos:
Sua tarefa é construir uma calculadora de trades de pokemon, para que o usuário possa calcular se
uma troca é "justa" ou não. Na API descrita abaixo você vai encontrar uma vasta base de
conhecimento sobre pokemon. Uma sugestão seria usar o valor do “base_experience” como forma a
chegar em um valor numérico de justiça.
Uma troca consiste em dois jogadores ofertarem entre 1 e 6 pokemons de cada lado. Qualquer
combinação é válida. Por exemplo, trocar 2 pokemons iguais por 4 pokemons distintos.
Uma troca é considerada justa, se a soma dos “base_experience” dos pokemons de cada lado da
troca é próxima uma da outra. O critério de “próximo” é aberto a sua definição.

## Sua tarefa é:
- Permitir que o jogador monte uma troca combinando pokemons dos dois lados
- O sistema o informe se a mesma é justa ou não
- Permitir persistir e visualizar o histórico de trocas registradas junto com seus dados
relevantes
Para esta tarefa, vamos utilizar a [PokeAPI](https://pokeapi.co/docs/v2)

## Critérios:
- Minha avaliação é baseada na escrita do seu código e na forma como você desenvolve a
solução. Use seu código para me apresentar como você desenvolve seu raciocínio e resolve
o problema apresentado.
- Não está sendo avaliada a extensão do seu conhecimento sobre bibliotecas, sintaxe ou da
tecnologia utilizada. Dessa forma, não se preocupe em me mostrar quanto você conhece a
ferramenta, mas sim como você a utiliza.
- A solução pode ser desenvolvida na plataforma ou linguagem em que se sentir mais
confortável. Na bx a maior parte da nossa stack é Ruby on Rails, React.js e MongoDB. Mas
isso não deve guiar seu exercício. Pois, caso não tenha familiaridade com a plataforma,
teremos espaço para seu aprendizado e desenvolvimento durante o trabalho.

# Solução

## Rodando o projeto

Para poder rodar a aplicação, é necessário ter o nodejs e o npm instalados na máquina.

Para rodar a aplicação basta rodar o comando:

```sh
DATABASE_PASSWORD=root JWT_SECRET_KEY=<SECRET_KEY_PARA_GERAR_JWTs_UNICOS> npm run start:dev
```