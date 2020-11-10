$(document).ready(function () {
    //Selecting the algorithm
    // $('.nav-link').click(function () {
    //     $('#algorithm').val($(this).text());
    //
    //     $('.nav-item').removeClass('active');
    //     $(this).parent('li').addClass('active');
    // });

    //When "Array length" slider changes
    $('#arrayLength').change(function () {
        generateArray(null, this.value);
    });

    //When "Show pseudocode" switch changes
    $('#pseudocodeSwitch').change(function () {
        if ($(this).is(':checked'))
            $('#pseudocode').removeClass('d-none');
        else
            $('#pseudocode').addClass('d-none');
    });

    //Generate random array
    $('#randomArray').click(function () {
        generateArray(null, $('#arrayLength').val());
    });

    //On modal show, display the current array as input value
    $('#customArrayModal').on('show.bs.modal', function (_) {
        $('#customArrayInput').val($('#currentArray').val());
    });

    //Validate and create array from custom input
    $('#submitArray').click(function () {
        let inputArray = $('#customArrayInput').val().replace(/ /g,'') ; //Removes all spaces from the input string
        let stringArray = inputArray.split(','); //Creates the custom array by splitting the comma separated values into array elements
        let n = stringArray.length;
        if (n<4 || n>20) //Validation rule #1: Array length should be between 4 and 20
        {
            invalidInput('Array length should be between 4 and 20');
            return;
        }
        let customArray = [];
        for (let i = 0; i < n; i++)
        {
            if (isNaN(parseInt(stringArray[i]))) //Validation rule #2: Array element should be an integer
            {
                invalidInput('Array elements should be integers separated by comma');
                return;
            }
            customArray[i] = parseInt(stringArray[i]);
            if (customArray[i] < 1 || customArray[i] > 60) //Validation rule #3: Array element should be between 1 and 60
            {
                invalidInput('Array element values should be between 1 and 60');
                return;
            }
        }

        $('#customArrayInput').removeClass('is-invalid');
        $('#invalidFeedback').addClass('d-none');
        generateArray(customArray.reverse());
        $('#arrayLength').val(n);
        $('#customArrayModal').modal('hide');

    });

    $('#sort').click(function () {
        let arr = $('#currentArray').val().split(',');
        let array = [];
        let n = arr.length;
        for (let i = 0; i < n; i++)
            array[i] = parseInt(arr[i]);

        let speed = $('#speed').val();
        // let algorithm = $('#algorithm').val();
        let algorithm = $('input:radio[name="algorithm"]:checked').val();

        $('input:radio').prop('disabled',true);
        $('#speed').prop('disabled',true);
        $('#arrayLength').prop('disabled',true);
        $('#randomArray').prop('disabled',true);
        $('#customArray').prop('disabled',true);
        $('#sort').prop('disabled',true);
        
        switch (algorithm) {
            case 'Bubble Sort':
                bubbleSort(array, speed).then(enableOptions);
                break;
            case 'Quick Sort':
                quickSort(array, 0, n - 1, speed).then(enableOptions);
                break;
            case 'Heap Sort':
                heapSort(array, speed).then(enableOptions);
                break;
            case 'Merge Sort':
                ghostArray(n);
                mergeSort(array, 0, n - 1, speed).then(enableOptions);
                break;
        }
    });

    //Invalid custom array input
    function invalidInput(message) {
        $('#customArrayInput').addClass('is-invalid');
        $('#invalidFeedback').text(message).removeClass('d-none');
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function enableOptions() {
    $('#speed').prop('disabled',false);
    $('#arrayLength').prop('disabled',false);
    $('input:radio').prop('disabled',false);
    $('#randomArray').prop('disabled',false);
    $('#customArray').prop('disabled',false);
    $('#sort').prop('disabled',false);
}