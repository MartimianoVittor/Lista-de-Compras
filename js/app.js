let valorTotal = 0;
limpar();

function adicionar(){
    let quantidade = document.getElementById('quantidade').value;
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split(' - ')[0];
    let valorProduto = produto.split('$')[1];
    let valorParcial = valorProduto * quantidade;
    total(valorParcial);    
    adicionarProduto(valorParcial, nomeProduto, quantidade);
}

function adicionarProduto(valorParcial, nomeProduto, quantidade) {
    let listaProdutos = document.getElementById('lista-produtos');
    let produtos = listaProdutos.querySelectorAll(".carrinho__produtos__produto");
    let existe = false;
    for (let i = 0; i < produtos.length; i++) {
        let nome = produtos[i].querySelector(".nome-produto").textContent;
        if (nome == nomeProduto) {
            let campoQuantidade = produtos[i].querySelector(".quantidade");
            let campoValor = produtos[i].querySelector(".valor-parcial");
            let novaQuantidade = Number(campoQuantidade.textContent) + Number(quantidade);
            let novoValor = Number(campoValor.dataset.valor) + Number(valorParcial);
            campoQuantidade.textContent = novaQuantidade;
            campoValor.dataset.valor = novoValor;
            campoValor.textContent = `Total: R$${novoValor.toFixed(2)}`;
            return;
        } 
    }
    listaProdutos.innerHTML += `
        <section class="carrinho__produtos__produto">
            <span class="texto-azul quantidade">${quantidade}</span>
            <span class="nome-produto">${nomeProduto}</span>
            <span class="texto-azul valor-parcial" data-valor="${valorParcial}">
                Total: R$${valorParcial.toFixed(2)}
            </span>
        </section>
    `;
}


function total(valorParcial){
    valorTotal = valorTotal + valorParcial;
    let campoTotal = document.getElementById('valor-total'); 
    campoTotal.textContent =  `R$ ${valorTotal.toFixed(2)}`;
    document.getElementById('quantidade').value = 1;
}

function limpar() {
    totalGeral = 0;
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0';
}