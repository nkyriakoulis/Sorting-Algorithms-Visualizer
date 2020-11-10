async function swap (A, i, j, speed) { //swaps two elements in an array. i MUST be <= j to work
    let tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;

    // Visually swap the elements and change color
    $(`#element${j}`).insertAfter($(`#array1 div:nth-child(${A.length - i})`));
    $(`#element${i}`).insertBefore($(`#array1 div:nth-child(${A.length - j})`));
    //Swap their ids as well
    $(`#element${j}`).attr('id','aaaa');
    $(`#element${i}`).attr('id','bbbb');
    $('#aaaa').attr('id',`element${i}`);
    $('#bbbb').attr('id',`element${j}`);

    await sleep(1000 - (speed*100));
}