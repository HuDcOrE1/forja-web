import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';

import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClienteResponse } from '../../../../core/models/cliente-response';
import { ProdutoResponse } from '../../../../core/models/produto-response';

import { ClienteService } from '../../../../core/services/cliente.service';
import { ProdutoService } from '../../../../core/services/produto.service';

import { VendaRequest } from '../../../../core/models/venda-request';

import { MoedaMaskUtil } from '../../../../shared/utils/moeda-mask.util';
import { ToastService } from '../../../../shared/services/toast.service';
import { ClienteLookupComponent } from '../../../../shared/components/cliente-lookup/cliente-lookup';
import { ProdutoLookupComponent } from '../../../../shared/components/produto-lookup/produto-lookup';

@Component({
  selector: 'app-venda-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClienteLookupComponent, ProdutoLookupComponent],
  templateUrl: './venda-form.html',
  styleUrl: './venda-form.scss',
})
export class VendaFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly clienteService = inject(ClienteService);

  private readonly produtoService = inject(ProdutoService);

  private readonly toastService = inject(ToastService);

  clientes: ClienteResponse[] = [];

  produtos: ProdutoResponse[] = [];
  clienteSelecionado?: ClienteResponse;

  @Output()
  salvar = new EventEmitter<VendaRequest>();

  readonly formasPagamento = [
    'PIX',
    'DINHEIRO',
    'DEBITO',
    'CREDITO',
    'TRANSFERENCIA',
    'BOLETO',
    'OUTROS',
  ];

  form = this.fb.group({
    clienteId: this.fb.control<number | null>(null, Validators.required),

    valorDesconto: ['R$ 0,00'],

    valorAcrescimo: ['R$ 0,00'],

    itens: this.fb.array([]),

    pagamentos: this.fb.array([]),
  });

  ngOnInit(): void {
    this.carregarClientes();

    this.carregarProdutos();

    this.adicionarItem();

    this.adicionarPagamento();
  }

  get itens(): FormArray<FormGroup> {
    return this.form.get('itens') as FormArray<FormGroup>;
  }

  get pagamentos(): FormArray<FormGroup> {
    return this.form.get('pagamentos') as FormArray<FormGroup>;
  }

  private carregarClientes(): void {
    this.clienteService.listar(0, 100, undefined, true).subscribe((pagina) => {
      this.clientes = pagina.content;
    });
  }

  private carregarProdutos(): void {
    this.produtoService.listar(0, 100).subscribe((pagina) => {
      this.produtos = pagina.content;
    });
  }

  selecionarCliente(cliente: ClienteResponse): void {
    this.clienteSelecionado = cliente;

    this.form.patchValue({
      clienteId: cliente.id,
    });
  }

  selecionarProduto(index: number, produto: ProdutoResponse): void {
    const item = this.itens.at(index);

    item.patchValue({
      produtoId: produto.id,
    });
  }

  adicionarItem(): void {
    this.itens.push(
      this.fb.group({
        produtoId: [null, Validators.required],

        quantidade: [1, [Validators.required, Validators.min(1)]],
      }),
    );
  }

  removerItem(index: number): void {
    this.itens.removeAt(index);
  }

  adicionarPagamento(): void {
    this.pagamentos.push(
      this.fb.group({
        formaPagamento: ['PIX', Validators.required],

        valor: ['R$ 0,00', Validators.required],
      }),
    );
  }

  removerPagamento(index: number): void {
    this.pagamentos.removeAt(index);
  }

  calcularSubtotal(index: number): number {
    const item = this.itens.at(index);

    const produtoId = item.get('produtoId')?.value;

    const quantidade = Number(item.get('quantidade')?.value ?? 0);

    const produto = this.produtos.find((p) => p.id === produtoId);

    if (!produto) {
      return 0;
    }

    return produto.valorVenda * quantidade;
  }

  get valorBruto(): number {
    return this.itens.controls.reduce((total, _, index) => {
      return total + this.calcularSubtotal(index);
    }, 0);
  }

  get valorLiquido(): number {
    const desconto = this.parseCurrency(this.form.value.valorDesconto);

    const acrescimo = this.parseCurrency(this.form.value.valorAcrescimo);

    return this.valorBruto - desconto + acrescimo;
  }

  get totalPagamentos(): number {
    return this.pagamentos.controls.reduce((total, pagamentoControl) => {
      const valor = this.parseCurrency(pagamentoControl.get('valor')?.value);

      return total + valor;
    }, 0);
  }

  get saldoRestante(): number {
    return this.valorLiquido - this.totalPagamentos;
  }

  get pagamentoCompleto(): boolean {
    return Math.abs(this.saldoRestante) < 0.01;
  }

  aplicarMascaraPagamento(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    const valorFormatado = MoedaMaskUtil.apply(input.value);

    this.pagamentos.at(index).patchValue(
      {
        valor: valorFormatado,
      },
      {
        emitEvent: false,
      },
    );
  }

  aplicarMascaraDesconto(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.form.patchValue(
      {
        valorDesconto: MoedaMaskUtil.apply(input.value),
      },
      {
        emitEvent: false,
      },
    );
  }

  aplicarMascaraAcrescimo(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.form.patchValue(
      {
        valorAcrescimo: MoedaMaskUtil.apply(input.value),
      },
      {
        emitEvent: false,
      },
    );
  }

  private parseCurrency(valor: unknown): number {
    if (!valor) {
      return 0;
    }

    return Number(String(valor).replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
  }

  onSubmit(): void {
    if (!this.possuiCliente()) {
      this.form.controls.clienteId.markAsTouched();
      this.toastService.error('Selecione um cliente para continuar.');

      return;
    }

    if (!this.possuiItens()) {
      this.toastService.error('Adicione ao menos um item na venda.');

      return;
    }

    if (!this.possuiPagamentos()) {
      this.toastService.error('Informe ao menos um pagamento.');

      return;
    }

    if (!this.pagamentoCompleto) {
      this.toastService.error('O total dos pagamentos deve ser igual ao valor líquido.');

      return;
    }

    const itemSemEstoque = this.itens.controls.findIndex(
      (_, index) => !this.estoqueSuficiente(index),
    );

    if (itemSemEstoque !== -1) {
      this.toastService.error('Existe produto sem estoque suficiente.');

      return;
    }

    const request: VendaRequest = {
      clienteId: Number(this.form.value.clienteId),

      valorDesconto: this.parseCurrency(this.form.value.valorDesconto),

      valorAcrescimo: this.parseCurrency(this.form.value.valorAcrescimo),

      itens: this.itens.getRawValue().map((item: any) => ({
        produtoId: Number(item['produtoId']),

        quantidade: Number(item['quantidade']),
      })),

      pagamentos: this.pagamentos.getRawValue().map((pagamento: any) => ({
        formaPagamento: pagamento['formaPagamento'],

        valor: this.parseCurrency(pagamento['valor']),
      })),
    };

    this.salvar.emit(request);
  }

  possuiItens(): boolean {
    return this.itens.controls.some((item) => item.get('produtoId')?.value);
  }

  possuiPagamentos(): boolean {
    return this.totalPagamentos > 0;
  }

  possuiCliente(): boolean {
    return !!this.form.value.clienteId;
  }

  estoqueSuficiente(index: number): boolean {
    const item = this.itens.at(index);

    const produtoId = item.get('produtoId')?.value;

    const quantidade = Number(item.get('quantidade')?.value ?? 0);

    const produto = this.produtos.find((p) => p.id === produtoId);

    if (!produto) {
      return true;
    }

    return produto.estoqueAtual >= quantidade;
  }

  get podeSalvar(): boolean {
    const possuiProdutoSelecionado = this.itens.controls.every(
      (item) => item.get('produtoId')?.value,
    );

    return (
      this.possuiCliente() &&
      possuiProdutoSelecionado &&
      this.possuiPagamentos() &&
      this.pagamentoCompleto
    );
  }

  getEstoqueAtual(index: number): number {
    const item = this.itens.at(index);

    const produtoId = item.get('produtoId')?.value;

    const produto = this.produtos.find((p) => p.id === produtoId);

    return produto?.estoqueAtual ?? 0;
  }

  getValorUnitario(index: number): number {
    const item = this.itens.at(index);

    const produtoId = item.get('produtoId')?.value;

    const produto = this.produtos.find((p) => p.id === produtoId);

    return produto?.valorVenda ?? 0;
  }
}
