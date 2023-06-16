$(document).ready(function(){
    $('#cpf').inputmask('999.999.999-99');
});

function validaCPF(){
    const cpfFormatado = document.getElementById("cpf").value;
    const cpf = limpaFormatacao(cpfFormatado);

    if (cpf.length !== 11){
        mostraResultado('CPF inválido! Deve conter 11 dígitos', 'red');
        return;
    }

    if (verificaDigitosRepetidos(cpf)){
        mostraResultado('CPF não pode conter repetição do mesmo dígito.', 'red');
        return;
    }

    const digito1 = calcularDigitoVerificador(cpf, 9);
    if (!digito1){
        mostraResultado(`CPF inválido - ${cpfFormatado}`, 'red');
        return;
    }

    const digito2 = calcularDigitoVerificador(cpf, 10);
    if (!digito2){
        mostraResultado(`CPF inválido - ${cpfFormatado}`, 'red');
        return;
    }

    mostraResultado('CPF válido!', 'green');
}

function calcularDigitoVerificador(cpf, posicao){
    const sequencia = cpf.slice(0, posicao).split('');

    let soma = 0;
    let multiplicador = posicao + 1;

    for (const numero of sequencia){
        soma += multiplicador * Number(numero);
        multiplicador--;
    }

    const restoDivisao = soma % 11;
    const digito = cpf.slice(posicao, posicao + 1);

    if (restoDivisao < 2){
        return Number(digito) === 0;
    } else{
        return Number(digito) === 11 - restoDivisao;
    }
}

function limpaFormatacao(cpf){
    cpf = cpf.replace(/\D/g, '');
    return cpf;
}

function mostraResultado(texto, cor){
    const span = document.getElementById('resultado');
    span.innerHTML = texto;
    span.style.color = cor;
}

function verificaDigitosRepetidos(cpf){
    return cpf.split('').every((d) => d === cpf[0]);
}
