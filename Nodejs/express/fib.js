function fibonacci(n) {
    // Vérifie que n est supérieur à 0
    if (n <= 0) return [];
  
    // Initialise les deux premiers éléments de la suite
    const fib = [0, 1];
  
    // Génère la suite jusqu'à atteindre n éléments
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
  
    return fib.slice(0, n); // Renvoie la suite jusqu'à n éléments
  }

  // Exemple d'utilisation
  const n = 10;
  console.log(fibonacci(n)); // Affiche les 10 premiers nombres de Fibonacci
      