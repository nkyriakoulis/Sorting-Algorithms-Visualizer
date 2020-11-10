async function bubbleSort (A, speed)
{
  let n = A.length;

  for (let i = 0; i < n; i++) {
    //Optimization to exit the algorithm if array is already sorted before all loops are executed
    let flag = false;
    //Inner loop doesn't compare the already sorted elements at the end of the array
    for (let j = 0; j < n-i-1; j++) {
      await duoColor(j, speed, '#21BCD4');

      if (A[j] > A[j+1]) {
        await duoColor(j, speed, '#FF0000');

        let tmp = A[j];
        A[j] = A[j+1];
        A[j+1] = tmp;
        flag = true;
        // Visually swap the elements and change color
        await swapVisually(j, speed);
      }
      else
      {
        await duoColor(j, speed, '#00FF00');
      }
      //Restore to original color
      await duoColor(j, speed, '#FFA500');
    }
    $(`#element${n-i-1}`).css('background-color', '#8B21D4');
    await sleep(1000 - (speed*100));
    //If no swaps performed in a pass, array is already sorted
    if (!flag) {
      $('.element-unsorted').css('background-color', '#8B21D4');
      break;
    }

  }
}


//////////////////////////////////////////////////
//Functions for visualizing

async function duoColor(index, speed, colorCode) {
  $(`#element${index}`).css('background-color', colorCode);
  $(`#element${index+1}`).css('background-color', colorCode);
  await sleep(1000 - (speed*100));
}

async function swapVisually(index, speed) {
  $(`#element${index}`).insertBefore($(`#element${index+1}`));
  $(`#element${index}`).css('background-color', '#00FF00');
  $(`#element${index+1}`).css('background-color', '#00FF00');
  //Swap their ids as well
  $(`#element${index}`).attr('id','aaaa');
  $(`#element${index+1}`).attr('id','bbbb');
  $('#aaaa').attr('id',`element${index+1}`);
  $('#bbbb').attr('id',`element${index}`);
  await sleep(1000 - (speed*100));
}