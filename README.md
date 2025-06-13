# mb-monorepo

## TODO: [AJUSTAR O README]


#### Escolhas tecnicas
- Optei por usar o npm workspaces por sua simplicidade e agilidade de configuração: bastam algumas linhas em `package.json` para linkar os pacotes, sem depender de ferramentas extras ou de um arquivo de pipeline adicional. Para um monorepo com apenas três workspaces, o ganho de performance do Turborepo é mínimo.
Com npm workspaces garantimos um setup leve, foco total na lógica do projeto e futura escalabilidade e mesmo que no futuro precisarmos de caching avançado ou pipelines distribuídos, basta adicionar Turborepo sobre a mesma estrutura sem retrabalho.



#### Analise