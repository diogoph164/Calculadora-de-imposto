// Pegando os elementos do HTML pelo id
const campoSalario = document.getElementById("salario");
const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");
const botao_inss = document.querySelectorAll(".botao-inss");
const sobre_inss = document.querySelectorAll(".sobre-inss");
const botao_fechar = document.querySelectorAll(".fechar")
const botao_renda = document.querySelectorAll(".botao-renda")
const sobre_renda = document.querySelectorAll(".renda")

// Função de abrir informações ao clicar no inss
botao_inss.forEach((botoes_inss, indice) => {
    botoes_inss.onclick = function () {
        sobre_inss[indice].showModal();
    }
});

// O botão para fechar as janela da informações

botao_fechar.forEach((fechar) => {
    fechar.onclick = function () {
        fechar.closest("dialog").close();
    }
});

// Função de abrir informações ao clicar no imposto de renda

botao_renda.forEach((botoes_renda, indice) => {
    botoes_renda.onclick = function () {
        sobre_renda[indice].showModal();
    }
});

// Quando clicar no botão, executa a função
botao.addEventListener("click", function () {

    // O campo devolve texto, então converto para número
    const salario = Number(campoSalario.value);

    // Se o valor for inválido, avisa e para
    if (salario <= 0) {
        alert("Digite um salário válido!");
        return;
    }

    // INSS (tabela 2026) - PROGRESSIVO:
    // cada alíquota só vale para a parte do salário dentro da faixa.
    let inss;
    if (salario <= 1621) {
        inss = salario * 0.075;
    } else if (salario <= 2902.84) {
        inss = 1621 * 0.075 + (salario - 1621) * 0.09;
    } else if (salario <= 4354.27) {
        inss = 1621 * 0.075 + (2902.84 - 1621) * 0.09 + (salario - 2902.84) * 0.12;
    } else if (salario <= 8475.55) {
        inss = 1621 * 0.075 + (2902.84 - 1621) * 0.09 + (4354.27 - 2902.84) * 0.12 + (salario - 4354.27) * 0.14;
    } else {
        inss = 988.09; // teto: acima de 8.475,55 não aumenta mais
    }

    // Imposto de Renda (2026)
    // A base de cálculo é o salário menos o INSS.
    const base = salario - inss;
    let ir;

    if (salario <= 5000) {
        ir = 0; // isento até R$ 5.000
    } else {
        // Tabela: base x alíquota - parcela a deduzir
        if (base <= 2428.80) {
            ir = 0;
        } else if (base <= 2826.65) {
            ir = base * 0.075 - 182.16;
        } else if (base <= 3751.05) {
            ir = base * 0.15 - 394.16;
        } else if (base <= 4664.68) {
            ir = base * 0.225 - 675.49;
        } else {
            ir = base * 0.275 - 908.73;
        }

        // Entre 5.000 e 7.350 existe uma redução que vai diminuindo
        if (salario <= 7350) {
            ir = ir - (978.62 - 0.133145 * salario);
        }

        // O imposto nunca pode ser negativo
        if (ir < 0) {
            ir = 0;
        }
    }

    //  Salário líquido
    const liquido = salario - inss - ir;

    // Mostra o resultado na tela
    resultado.innerHTML =
        "INSS: R$ " + inss.toFixed(2) + "<br>" +
        "Imposto de Renda: R$ " + ir.toFixed(2) + "<br>" +
        "<strong>Salário líquido: R$ " + liquido.toFixed(2) + "</strong>";
});
