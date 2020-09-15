export interface ClientInterface{
    nome: string;
    sobrenome:string;
    celular: string;
    fixo: string;
    cnpjcpf: string;
    endereco:{
         rua:string;
         numero:string;
         bairro:string;
    };
}