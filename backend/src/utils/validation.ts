import crypto from 'crypto';
export function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

export function validarCartao(numeroCartao: string): boolean {
    let soma = 0;
    let paridade = false;
    for (let i = numeroCartao.length - 1; i >= 0; i--) {
        let digito = parseInt(numeroCartao.charAt(i), 10);
        if (paridade) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }
        soma += digito;
        paridade = !paridade;
    }
    return (soma % 10) === 0;
}

export function gerarCodigoPix(prefixo: string = 'PIX-'): string {
    const codigoAleatorio = crypto.randomBytes(8).toString('hex');
    const timestamp = Date.now().toString();
    return `${prefixo}${timestamp}-${codigoAleatorio}`;
}