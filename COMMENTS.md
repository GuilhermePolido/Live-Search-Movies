Live Search Movies

Tecnologias:

* React Js
* TypesScript
* JavaScript
* Styled Components

Usar React.js, TypeScript, JavaScript e Styled Components juntos permite criar interfaces reativas e escaláveis (React), com código seguro e tipado (TypeScript), usando a flexibilidade do JavaScript, e estilos encapsulados e dinâmicos (Styled Components).

Tomei a decisão de dividir em componentes pequenos que podem ser reaproveitados em outros lugares. Além de Criar um componente LiveSearch que pode ser reaproveitado para outros tipos de buscas, não apenas de filmes.

Ao implementar a lógica de requisição para a API, encontrei um bug relacionado à paginação com scroll infinito. O problema ocorre quando se busca um novo termo: o scroll da lista, após a atualização do componente, acaba ficando próximo ao final. Isso faz com que o evento de rolagem seja disparado indevidamente, acionando uma nova requisição para a página 2, mesmo que o termo de busca tenha acabado de ser alterado e a paginação tenha sido reiniciada para a página 1. Como resultado, as requisições para a página 1 e página 2 eram disparadas ao mesmo tempo, causando uma sobrecarga e inconsistência nos resultados exibidos. Para resolver esse problema, revisei toda a minha lógica e ajustei o código para que, ao alterar o termo de busca, o scroll seja reiniciado, indo para o início da lista. Além disso, ao receber o evento de scroll, implementei uma validação para garantir que o usuário não esteja no início da página. O cálculo para determinar se o usuário está no final da lista estava sendo influenciado por essa condição, uma vez que limpo a lista de dados sempre que o termo é trocado. Com essa abordagem, evito buscas duplicadas ao alterar o termo de busca.

Durante a implementação da lógica de destaque de texto, notei que, ao digitar certos termos, os espaços em branco no final de uma correspondência eram removidos na renderização. Isso acontecia devido a um comportamento padrão do HTML e CSS, onde os espaços consecutivos, incluindo aqueles no final de uma string, são "colapsados" ou ignorados. O React, por sua vez, segue essa convenção ao renderizar o conteúdo no DOM. Para corrigir esse problema e garantir que os espaços em branco fossem preservados, apliquei a propriedade CSS white-space: pre. Com isso, o navegador passou a respeitar e renderizar os espaços em branco conforme o esperado, garantindo que o texto destacado fosse exibido corretamente, inclusive os espaços entre palavras e no final das correspondências.