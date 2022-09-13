"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  const n = logSources.length;

  return Promise.all(logSources.map((i) => i.popAsync())).then((data) => {
    quickSort(data, 0, n - 1);

    /*Print the array after sort*/
    data.forEach((log) => {
      printer.print(log);
    });
    printer.done();
    console.log("Async sort complete.");
  });
};

/* Change the elements of the array */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/* This function returns the index of the pivot, and then 
    set the correct position in the array (smaller than the pivot on the left, 
    greater right)
  */
function partition(arr, low, high) {
  let pivot = arr[high];

  // Index of smaller element
  let i = low - 1;
  const pivotDate = pivot.date;

  for (let j = low; j <= high - 1; j++) {
    // If current date is smaller than date pivot
    const currentDate = arr[j].date;

    if (currentDate < pivotDate) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

/* The main function recursive QuickSort */
function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    let promises = [];
    // parallel quicksort recursive
    promises.push(quickSort(arr, low, pi - 1));
    promises.push(quickSort(arr, pi + 1, high));
    Promise.all(promises);
  }
}
