function bubbleSort(vetorBubble: number[]): number {
  const startTime = performance.now();

  for (let i = 0; i < vetorBubble.length - 1; i++) {
    for (let j = 0; j < vetorBubble.length - 1; j++) {
      if (vetorBubble[j] > vetorBubble[j + 1]) {
        const temp = vetorBubble[j];
        vetorBubble[j] = vetorBubble[j + 1];
        vetorBubble[j + 1] = temp;
      }
    }
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return executionTime;
}

function particao(
  vetorQuickSort: number[],
  inicio: number,
  fim: number,
): number {
  let i = inicio;

  for (let j = inicio; j < fim; j++) {
    if (vetorQuickSort[j] <= vetorQuickSort[fim]) {
      swap(vetorQuickSort, i++, j);
    }
  }
  swap(vetorQuickSort, i, fim);

  return i;
}

function swap(vetorQuickSort: number[], i: number, j: number): void {
  const k = vetorQuickSort[i];
  vetorQuickSort[i] = vetorQuickSort[j];
  vetorQuickSort[j] = k;
}

function quicksort(
  vetorQuickSort: number[],
  inicio: number,
  fim: number,
): void {
  if (inicio >= fim) return;

  const pivot = particao(vetorQuickSort, inicio, fim);

  quicksort(vetorQuickSort, inicio, pivot - 1);
  quicksort(vetorQuickSort, pivot + 1, fim);
}

function ordenarComQuicksort(vetorQuickSort: number[]): number {
  const startTime = performance.now();

  quicksort(vetorQuickSort, 0, vetorQuickSort.length - 1);

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  return executionTime;
}

function gerarVetorAleatorio(tamanho: number): number[] {
  const vetor: number[] = [];

  for (let i = 0; i < tamanho; i++) {
    const randomValue = Math.floor(Math.random() * 1000000);
    vetor.push(randomValue);
  }

  return vetor;
}

function executarTeste(tamanho: number, numeroDeTestes: number): void {
  let totalTempoBubble = 0;
  let totalTempoQuickSort = 0;

  for (let i = 0; i < numeroDeTestes; i++) {
    const vetorAleatorio = gerarVetorAleatorio(tamanho);
    const vetorBubbleClone = [...vetorAleatorio];
    const vetorQuickSortClone = [...vetorAleatorio];

    totalTempoBubble += bubbleSort(vetorBubbleClone);
    totalTempoQuickSort += ordenarComQuicksort(vetorQuickSortClone);
  }

  const mediaTempoBubble = totalTempoBubble / numeroDeTestes;
  const mediaTempoQuickSort = totalTempoQuickSort / numeroDeTestes;
  console.log(`============ Tamanho: ${tamanho} =============`);
  console.log(
    'Média de tempo do Bubble Sort: ' +
      mediaTempoBubble.toFixed(2) +
      ' milissegundos',
  );
  console.log(
    'Média de tempo do Quick Sort: ' +
      mediaTempoQuickSort.toFixed(2) +
      ' milissegundos',
  );
}

executarTeste(125000, 50);
