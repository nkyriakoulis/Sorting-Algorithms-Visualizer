async function merge (A, l, m, r, speed) {
  //Color the elements to be merge-sorted and set their opacity
  await colorGroup(l, r, A.length);

  //Lengths of the temp arrays
  let n1 = m - l + 1;
  let n2 = r - m;
  //Declare the temp arrays
  let L = new Array(n1);
  let R = new Array(n2);
  
  //Copy data to temp arrays
  for (let i = 0; i < n1; i++) {
    L[i] = A[l + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = A[m + 1 + j];
  }

  let i = 0; //Initial index of 1st subarray
  let j = 0; //Initial index of 2nd subarray
  let k = l; //Initial index of merged subarray


  //While both temp arrays still have elements that have not been merged
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      //Visualization
      await visualize(l+i, k, speed);

      A[k] = L[i];
      i++;
    }
    else {
      //Visualization
      await visualize(m+1+j, k, speed);

      A[k] = R[j];
      j++;
    }
    k++;
  }

  //When one of the two temp arrays has all elements merged, add the remaining elements of the other array
  while (i < n1) {
    //Visualization
    await visualize(l+i, k, speed);

    A[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    //Visualization
    await visualize(m+1+j, k, speed);

    A[k] = R[j];
    j++;
    k++;
  }

  //Move the elements back to the top (visualization)
  for (let index = l; index <= r; index++)
  {
    let cloneElement = $(`#cloneElement${index}`).clone().attr('id',`element${index}`);
    let cloneGhost = $(`#array1 div:nth-child(${A.length - index})`).clone().attr('id',`ghost${index}`);
    $(`#array1 div:nth-child(${A.length - index})`).replaceWith($(cloneElement));
    if (r-l == A.length - 1)
      $(cloneElement).css('background-color', '#8B21D4');
    $(`#array2 div:nth-child(${A.length - index})`).replaceWith($(cloneGhost));
    await sleep(1000 - (speed*100));
  }
  count++;
}

async function mergeSort (A, l, r, speed) {
  if (l < r) {
    let m = Math.floor((l + r)/2);
    await mergeSort(A, l, m, speed);
    await mergeSort(A, m+1, r, speed);

    await merge(A, l, m, r, speed);
  }
}

//////////////////////////////////////////////////
//Functions for visualizing

async function visualize(index1, index2, speed) {
  let cloneElement = $(`#element${index1}`).clone().attr('id',`cloneElement${index2}`);
  let cloneGhost = $(`#ghost${index2}`).clone().attr('id',`cloneGhost${index2}`);
  $(`#ghost${index2}`).replaceWith($(cloneElement));
  $(`#element${index1}`).replaceWith($(cloneGhost));
  await sleep(1000 - (speed*100));
}

async function colorGroup (l, r, n) {
  for (let index = l; index <= r; index++)
  {
    $(`#array1 div:nth-child(${n - index})`).css('background-color', colors[count%(colors.length)]);
  }
  await sleep(200);
}

const colors = ['#33CCCC', '#0066FF', '#996633', '#FF0000', '#FF5050', '#66FF33', '#006600', '#336699', '#FF66CC', '#999966'];
let count = 0;