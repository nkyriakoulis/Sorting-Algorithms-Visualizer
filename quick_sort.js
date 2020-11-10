async function partition (A, low, high, speed) {
  //Always set the first element as pivot
  let pivot = A[low];
  let i = low + 1;
  await colorElement(low, '#FF8DC7', speed);

  for (let j = low + 1; j <= high; j++) {
    await colorElement(j, '#21BCD4', speed);

    if (A[j] < pivot) {
      await colorElement(j, '#00FF00', speed);
      //This will eventually gather all elements smaller than pivot at the left side of the array
      await swap(A, i, j, speed);
      i++;
    }
    else
    {
      await colorElement(j, '#FF0000', speed);
    }
  }
  //Move the pivot element at its correct position, by swapping it with the rightmost smaller element than pivot
  //located at position (i+1)
  await swap(A, low, i - 1, speed);
  // Restore original color to unsorted elements, keep purple color for already sorted elements and for current pivot element
  $('.element-unsorted').each(function () {
    if ( rgb2hex($(this).css('background-color')) !== '#FF8DC7' && rgb2hex($(this).css('background-color')) !== '#8B21D4')
      $(this).css('background-color', '#FFA500');
    else
      $(this).css('background-color', '#8B21D4');
  });
  return (i-1);
}

async function quickSort (A, low, high, speed) {
  if (low < high) {
    //This will place the pivot element in the right position (index)
    let index = await partition(A, low, high, speed);

    //Sort the two partitions, left and right of the pivot element (index) recursively
    await quickSort(A, low, index - 1, speed);
    //Visualize the low element
    if (low === index-1)
    {
      await colorEdge(low, speed);
    }

    await quickSort(A, index + 1, high, speed);
    //Visualize the high element sorting
    if (index+1 === high)
    {
      await colorEdge(high, speed);
    }
  }
}


///////////////////////////////////////////////////////
////Functions for visualizing

async function colorElement(index, colorCode, speed) {
  $(`#element${index}`).css('background-color', colorCode);
  await sleep(1000 - (speed*100));
}

async function colorEdge(index, speed) {
  await sleep(1000 - (speed*100));
  await colorElement(index, '#FF8DC7', speed);
  $(`#element${index}`).css('background-color', '#8B21D4');
}