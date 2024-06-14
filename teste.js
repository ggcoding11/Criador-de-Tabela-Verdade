/* Vamos tentar planejar só a lógica do código pelo JS, depois mandar pro HTML mexer me tudo

1)Vou escrever a expressão
2)Ele vai entender o que eu escrevi
3)Ele vai analisar linha por linha e ver se a expressão vai estar V ou F
4) Vai escrever tudo isso em uma tabela

Explicações:

DICA: não busque atalhos mais simples antes de realizar o projeto de verdade. Isso gera uma reformulação gigante no código
que deixa tudo mt difícil de fazer a manutenção. Pense no que quer fazer desde o início e depois já faça como planeja (NÃO FUJA DO PLANEJADO)

1) e 2) Eu vou deixar a expressão em uma variável em forma de string.
Só com isso, eu quero que ele reconheça o tipo de expressão que ele vai trabalhar.
Também quero que com isso, ele saiba quantas entradas estão na expressão e quantas linhas a tabela verdade terá

quais operações vai ter : conjunção(∧), disjunção inclusiva(v) e exclusiva(⊕), condicional(→) e bicondicional(↔)

Quero trabalhar com NO MÁXIMO 2 variáveis

- Como puxar essas entradas? ---> Vamos juntar tudo sem espaços vazios, depois eu vou retirar o conectivo do meio e puxar só as entradas e armazenar em um array de Entradas

Junto com a puxada da entradas, ele já estabeleceu que tipo de expressão eu estou usando também

3) eu vou criar um array para armazenar os resultados das linhas de cada entrada
como aqui eu sei que são duas linhas e eu não tenho o HTML para deixar esses valores em algum lugar

----> Fiz tudo isso em uma função, que poderá ser chamada para cada caso específico
- Como avaliar linha por linha se vai dar true ou false --> Depende da avalição que eu tiver
Essa parte no html seria mais fácil, mas aqui eu posso fazer 2 tipos de avaliações (uma se tiver só uma entrada e outra se tiver 2)

-COISAS A FAZER: DEIXAR POSSIVEL A NEGAÇÃO DAS PROPOSIÇÕES E TERMINAR DE PROGRAMAR TODOS OS RESULTADOS DOS IFS DE CONECTIVOS

*/

//Estabelecimento da expressão sem espaços vazios
var expressao = `p ⊕ q`
console.log(`EXPRESSÃO: ${expressao}`)
var array = expressao.split(" ")
var expressaoReformulada = array.join("")
var arrayEntradasProvisório = []
var arrayResultadosExpressao = []
var numeroEntradas = 0
var entrada1Linhas = []
var entrada2Linhas = []
var arrayEntradasNovo = []
var numeroLinhas = 0
var conectivo = ""

function RetirarEntradasEAdicionarValores(conectivo){
    //Retirada das entradas e ver se possui valores repetidos (importante saber isso pro número de colunas) 
    
    expressaoReformulada = expressaoReformulada.replace(conectivo,"")    
    arrayEntradasProvisório.push(expressaoReformulada.substring(0,1))
    arrayEntradasProvisório.push(expressaoReformulada.substring(1))

    for (contadorArrayEntradas = 0; contadorArrayEntradas < arrayEntradasProvisório.length; contadorArrayEntradas++){
        var EntradaCadastrada = arrayEntradasProvisório[contadorArrayEntradas]
        if (arrayEntradasNovo.indexOf(EntradaCadastrada) === -1){
            arrayEntradasNovo.push(EntradaCadastrada)
        }
    }
    console.log(`ENTRADAS: ${arrayEntradasNovo}`)

    //Criação das linhas e colocação de seus valores
    numeroEntradas = arrayEntradasNovo.length
    numeroLinhas = 2**numeroEntradas
    var CicloDeVeF = numeroLinhas/2
    var contadorLinhas = 0
    var contadorEntradas = 0

    while(contadorEntradas < numeroEntradas){
        while(contadorLinhas < numeroLinhas){
            var contadorCicloV = 0
            var contadorCicloF = 0
            while(contadorCicloF < CicloDeVeF){
                if (contadorEntradas == 0){
                    entrada1Linhas.push(false)
                    contadorCicloF++
                    contadorLinhas++
                } else {
                    entrada2Linhas.push(false)
                    contadorCicloF++
                    contadorLinhas++
                }
            }
            while(contadorCicloV < CicloDeVeF){
                if (contadorEntradas == 0){
                    entrada1Linhas.push(true)
                    contadorCicloV++
                    contadorLinhas++
                } else {
                    entrada2Linhas.push(true)
                    contadorCicloV++
                    contadorLinhas++
                }
            }
        }
        contadorEntradas++
        CicloDeVeF /= 2
        contadorLinhas = 0
    }
    console.log(`${arrayEntradasNovo[0]}: ${entrada1Linhas}`)
    
    if (numeroEntradas > 1){
        console.log(`${arrayEntradasNovo[1]}: ${entrada2Linhas}`)
    }
}


//Verificação de cada tipo de expressão

if (array.length > 3 || array.length < 3){
    console.log(`EXPRESSÃO INVÁLIDA! - REINSIRA POR FAVOR`)
} else {
    if (array[1] == "∧" || array[1] == "V" || array[1] == "⊕" || array[1] == "→" || array[1] == "↔"){
        
        var contadorResultados = 0
        //Conjunção
        if (expressaoReformulada.indexOf(`∧`) != -1){
            RetirarEntradasEAdicionarValores(`∧`) 
            //Caso as duas entradas sejam iguais
            if (numeroEntradas < 2){
                while (contadorResultados < numeroLinhas){
                    arrayResultadosExpressao.push(entrada1Linhas[contadorResultados])
                    contadorResultados++
                }   
            } else {
                //Caso as entradas sejam diferentes...
                //Eu usei o mesmo contadorResultados para todos, pois temos que analisar os valores das mesmas linhas. É como se o contadorResultados fosse o número da linha
                while (contadorResultados < numeroLinhas){
                    if (entrada1Linhas[contadorResultados] == true && entrada2Linhas[contadorResultados] == true){
                        arrayResultadosExpressao[contadorResultados] = true
                    } else {
                        arrayResultadosExpressao[contadorResultados] = false
                    }
                    contadorResultados++
                }
            }
            
        }

        //DISJUNÇÃO INCLUSIVA
        if (expressaoReformulada.indexOf(`V`) != -1){
            RetirarEntradasEAdicionarValores(`V`)
            //Caso as duas entradas sejam iguais
            if (numeroEntradas < 2){
                while (contadorResultados < numeroLinhas){
                    arrayResultadosExpressao.push(entrada1Linhas[contadorResultados])
                    contadorResultados++
                }   
            } else {
                //Caso as entradas sejam diferentes...

                //Eu usei o mesmo contadorResultados para todos, pois temos que analisar os valores das mesmas linhas. É como se o contadorResultados fosse o número da linha
                while (contadorResultados < numeroLinhas){
                    if (entrada1Linhas[contadorResultados] == true || entrada2Linhas[contadorResultados] == true){
                        arrayResultadosExpressao[contadorResultados] = true
                    } else {
                        arrayResultadosExpressao[contadorResultados] = false
                    }
                    contadorResultados++
                }
            }
            
        }

        //CONDICIONAL
        if (expressaoReformulada.indexOf(`→`) != -1){
            RetirarEntradasEAdicionarValores(`→`)
            //Caso as duas entradas sejam iguais
            if (numeroEntradas < 2){
                while (contadorResultados < numeroLinhas){
                    arrayResultadosExpressao.push(true)
                    contadorResultados++
                }
            } else {
                while (contadorResultados < numeroLinhas){
                    if (entrada1Linhas[contadorResultados] == true && entrada2Linhas[contadorResultados] == true || entrada1Linhas[contadorResultados] == false && entrada2Linhas[contadorResultados] == true || entrada1Linhas[contadorResultados] == false && entrada2Linhas[contadorResultados] == false){
                        arrayResultadosExpressao.push(true)
                    } else {
                        if (entrada1Linhas[contadorResultados] == true && entrada2Linhas[contadorResultados] == false){
                            arrayResultadosExpressao.push(false)
                        } 
                    }
                    contadorResultados++
                }
            }
        }

        //BICONDICIONAL
        if (expressaoReformulada.indexOf(`↔`) != -1){
            RetirarEntradasEAdicionarValores(`↔`)
            if (numeroEntradas < 2){
                while(contadorResultados < numeroLinhas){
                    arrayResultadosExpressao.push(true)
                    contadorResultados++
                }
            } else {
                while (contadorResultados < numeroLinhas){
                    if (entrada1Linhas[contadorResultados] == false && entrada2Linhas[contadorResultados] == true || entrada1Linhas[contadorResultados] == true && entrada2Linhas[contadorResultados] == false) {
                        arrayResultadosExpressao.push(false)
                    } else {
                        arrayResultadosExpressao.push(true)
                    }
                    contadorResultados++
                }
            }
        
        }

        //DISJUNÇÃO EXCLUSIVA
        if (expressaoReformulada.indexOf(`⊕`) != -1){
            RetirarEntradasEAdicionarValores("⊕")
            while(contadorResultados < numeroLinhas){
                if(numeroEntradas < 2){
                    arrayResultadosExpressao.push(false)
                } else {
                    if (entrada1Linhas[contadorResultados] == false && entrada2Linhas[contadorResultados] == false || entrada1Linhas[contadorResultados] == true && entrada2Linhas[contadorResultados] == true){
                        arrayResultadosExpressao.push(false)
                    } else {
                        arrayResultadosExpressao.push(true)
                    }
                }
            
            
                contadorResultados++

            }
        }

        //Apresentação dos resultados da expressão
        console.log(`RESULTADO: ${arrayResultadosExpressao}`)
        
    } else {
        console.log(`EXPRESSÃO INVÁLIDA`)
    }
}

