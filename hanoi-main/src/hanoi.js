// function to solve the hanoi tower and get the sequences of moves

const getHanoiSolutions = (nDiscs) => {
  const solutions = [];

  // Recursive function to decide solver based on disc parity (odd/even)
  const hanoi = (n, source, auxiliary, destination) => {
    if (n % 2 === 0) { // Even number of discs
      discEvenSolver(n, source, auxiliary, destination, solutions);
    } else { // Odd number of discs
      discOddSolver(n, source, auxiliary, destination, solutions);
    }
  };

  const source = Array.from({ length: nDiscs }, (_, i) => nDiscs - i); // Example: [3, 2, 1]
  const auxiliary = [];
  const destination = [];

  hanoi(nDiscs, source, auxiliary, destination);

  return solutions;
};

function move_disk(pole_one, pole_two) {
  if (pole_one.length && pole_two.length) {
    if (pole_one[pole_one.length - 1] < pole_two[pole_two.length - 1]) {
      pole_two.push(pole_one.pop());
      return 1;
    } else {
      pole_one.push(pole_two.pop());
      return 0;
    }
  } else if (pole_one.length && !pole_two.length) {
    pole_two.push(pole_one.pop());
    return 1;
  } else if (!pole_one.length && pole_two.length) {
    pole_one.push(pole_two.pop());
    return 0;
  }
}
function discEvenSolver(n, source, auxiliary, destination, solutions) {
  const total_moves = 2 ** n - 1; // Total moves for n discs
  for (let i = 1; i <= total_moves; i++) {
    if (i % 3 === 1) {
      if(move_disk(source, auxiliary) == 1){
        solutions.push({ disc: source.length, from: 0, to: 2});
      } else {
        solutions.push({ disc: source.length, from: 2, to: 0});
      }
    } else if (i % 3 === 2) {
      if(move_disk(source, destination) == 1){
        solutions.push({ disc: source.length, from: 0, to: 1});
      } else {
        solutions.push({ disc: source.length, from: 1, to: 0});
      }
    } else if (i % 3 === 0) {
      if(move_disk(auxiliary, destination) == 1){
        solutions.push({ disc: source.length, from: 2, to: 1});
      } else {
        solutions.push({ disc: source.length, from: 1, to: 2});
      }
    }
    // solutions.push({source: [...source],auxiliary:[...auxiliary], destination: [...destination] });
    // solutions.push({ disc: n, source, destination});
    // console.log(solutions)
  }
}

function discOddSolver(n, source, auxiliary, destination, solutions) {
  const total_moves = 2 ** n - 1;
  for (let i = 1; i <= total_moves; i++) {
    if (i % 3 === 1) {
      if(move_disk(source, destination) == 1){
        solutions.push({ disc: source.length, from: 0, to: 1});
      } else {
        solutions.push({ disc: source.length, from: 1, to: 0});
      }
    } else if (i % 3 === 2) {
      if(move_disk(source, auxiliary) == 1){
        solutions.push({ disc: source.length, from: 0, to: 2});
      } else {
        solutions.push({ disc: source.length, from: 2, to: 0});
      }
    } else if (i % 3 === 0) {
      if(move_disk(auxiliary, destination) == 1){
        solutions.push({ disc: source.length, from: 2, to: 1});
      } else {
        solutions.push({ disc: source.length, from: 1, to: 2});
      }
    }
    // solutions.push({source: [...source],auxiliary:[...auxiliary], destination: [...destination] });
    // solutions.push({ disc: n, source, destination});
    // console.log(solutions)
  }
}

export { getHanoiSolutions };







// // function to solve the hanoi tower and get the sequences of moves

// const getHanoiSolutions = (nDiscs) => {
//   const solutions = []

//   // recursive function to move the tower of discs from origin to destiny using aux as an auxiliary peg
//   const hanoi = (n, origin, destiny, aux) => {
//     if (n == 1) {
//       // Base case: If there's only one disc, move it directly to destiny
//       solutions.push({ disc: n, origin, destiny })
//       return;
//     }

//     // move n - 1 discs from origin to aux, using destiny as an auxiliary peg
//     hanoi(n - 1, origin, aux, destiny)

//     // Move the nth disc from origin to destiny
//     solutions.push({ disc: n, origin, destiny })
//     // console.log(solutions)
//     // Move n - 1 discs from aux to destiny, using origin as an auxiliary peg
//     hanoi(n - 1, aux, destiny, origin)
//   }

//   // start the recursive process with the initial call to the hanoi function
//   hanoi(nDiscs, 0, 1, 2)

//   return solutions;
// }

// export {
//   getHanoiSolutions
// }