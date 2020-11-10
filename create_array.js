$(document).ready(function () {
    generateArray();
});

function generateArray(arr = null,array_len=12) {
    $('#array1').empty();
    $('#array2').empty();

    if (arr == null)
        arr = Array.from({length: array_len}, () => Math.floor((Math.random() * 59) + 1));

    let n = arr.length;
    for (let i=0; i<n; i++)
    {
        if (arr[i] > 6)
            $('#array1').append(
                `<div class="element-unsorted text-center mr-1" id="element${n-1-i}" style="height: ${arr[i]*5}px; width: ${$('#array1').width() / (arr.length + 3)}px">
                    <h5 class="element-label pb-2">${arr[i]}</h5>
                </div>`
            );
        else
            $('#array1').append(
                `<div class="element-unsorted text-center mr-1" id="element${n-1-i}" style="height: ${arr[i]*5}px; width: ${$('#array1').width() / (arr.length + 3)}px">
                    <h5 class="element-label-small pb-2">${arr[i]}</h5>
                </div>`

            );
    }
    $('#currentArray').val(arr.reverse());
}

function ghostArray(array_len) {
    $('#array2').empty();
    for (let i=0; i<array_len; i++)
        $('#array2').append(
            `<div class="element-ghost mr-1" id="ghost${array_len-1-i}" style="height: 10px; width: ${$('#array1').width() / (array_len + 3)}px"></div>`
        );
}