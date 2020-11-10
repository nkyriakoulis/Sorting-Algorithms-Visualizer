async function heapify (A, n, i, speed) {
  //Color the items that are to be heapified
  for (let j = i; j < n; j++)
    $(`#element${j}`).css('background-color', '#FFFF00');

  let largest = i; //Initialize largest as root index
  await colorElement(i,'#3399FF', speed);

  let left = 2*i + 1; //Index of left child of the root
  let right = 2*i + 2; //Index of right child of the root

  //See if left child of root exists and is greater than root
  if (left < n) {
    await colorElement(left,'#D421C1', speed);

    if (A[largest] < A[left])
    {
      await colorLargest(left, largest, speed);
      largest = left;
    }
    else
    {
      await redThenYellow(left, speed);
    }
  }


  //See if right child of root exists and is greater than root
  if (right < n) {
    await colorElement(right,'#D421C1', speed);

    if (A[largest] < A[right])
    {
      await colorLargest(right, largest, speed);
      largest = right;
    }
    else
    {
      await redThenYellow(right, speed);
    }
  }


  //Change root if needed
  if (largest !== i) {
    await swap(A, i, largest, speed);

    //Heapify the root
    for (let j = i; j < n; j++)
      $(`#element${j}`).css('background-color', '#FFA500');
    await heapify(A, n, largest, speed);
  }
}

async function heapSort (A, speed) {
  let n = A.length;

  //Build a maxheap
  for (let i = Math.floor(n/2)-1; i > -1; i--) { //n/2 - 1 is the last non-leaf node index when trying to convert the tree to a heap
    await heapify(A, n, i, speed);
  }

  //One by one extract elements
  for (let i = n - 1; i > 0; i--) {
    await swap(A,0, i, speed);
    $(`#element${i}`).css('background-color', '#8B21D4');
    await sleep(1000 - (speed*100));
    await heapify(A, i, 0, speed);
  }
  $(`#element0`).css('background-color', '#8B21D4');
}


/////////////////////////////////////////////////////////////
//Functions for visualizing

async function colorElement(index, colorCode, speed) {
  $(`#element${index}`).css('background-color', colorCode);
  await sleep(1000 - (speed*100));
}

async function colorLargest(index, largest, speed) {
  await colorElement(index,'#00FF00', speed);
  $(`#element${index}`).css('background-color', '#3399FF');
  await colorElement(largest,'#FFFF00', speed);
}

async function redThenYellow(index, speed) {
  await colorElement(index,'#FF0000', speed);
  await colorElement(index,'#FFFF00', speed);
}