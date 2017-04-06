let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    if (answer.value == '' || attempt.value == '') {
        setHiddensFields();
    }
    if (!validateInput(input.value)) {
        return false;
    } else {
        attempt.value++;
    }
    let result = getResults(input.value);
    if (result) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if(!result && attempt.value >= 10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.")
    }
}

function setHiddensFields() {
    answer.value = Math.floor(Math.random() * 9999).toString();
    while (answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
    attempt.value = 0;
}

function setMessage(msg) {
    document.getElementById('message').innerHTML = msg;
}

function validateInput(input) {
    if (input.length == 4) {
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(val) {
    let result = '<div class="row"><span class="col-md-6">' + val + '</span><div class="col-md-6">';
    let count = 0;
    for (i = 0; val.length > i; i++) {
        console.log(val.charAt(i));
        if (val.charAt(i) == answer.value.charAt(i)) {
            result += '<span class="glyphicon glyphicon-ok"></span>';
            count++;
        } else if (answer.value.indexOf(val.charAt(i)) > -1) {
            result += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            result += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    result += '</div></div>';
    document.getElementById('results').innerHTML += result;
    if (count == 4) {
        return true;
    } else {
        return false;
    }
}

function showAnswer(result) {
    document.getElementById('code').innerHTML = answer.value;
    if (result) {
        document.getElementById('code').className += " success";
    } else {
        document.getElementById('code').className += " failure";
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}