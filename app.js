$(document).ready(function () {
  let number;

  document.addEventListener("keyup", keyPush);

  $("#input-field").bind("input propertychange", function () {
    number = $(this).val();
  });

  $("#submit-button").click(function () {
    checkInput();
  });

  function keyPush(evt) {
    switch (evt.keyCode) {
      case 13:
        checkInput();
    }
  }

  function checkInput() {
    if (isNumeric(number)) {
      numberToText();
    } else {
      $("#number-text").html("Skriv in ett nummer");
    }
  }

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  function digitAsText(input) {
    console.log(`input: ${input}`);
    input = parseInt(input);
    switch (input) {
      case 0:
        return "noll";
      case 1:
        return "ett";
      case 2:
        return "två";
      case 3:
        return "tre";
      case 4:
        return "fyra";
      case 5:
        return "fem";
      case 6:
        return "sex";
      case 7:
        return "sju";
      case 8:
        return "åtta";
      case 9:
        return "nio";
      case 10:
        return "tio";
      case 11:
        return "elva";
      case 12:
        return "tolv";
      case 13:
        return "tretton";
      case 14:
        return "fjorton";
      case 15:
        return "femton";
      case 16:
        return "sexton";
      case 17:
        return "sjutton";
      case 18:
        return "arton";
      case 19:
        return "nitton";
    }
  }

  function tenAsText(input) {
    console.log(`input: ${input}`);
    input = parseInt(input);
    switch (input) {
      case 20:
        return "tjugo";
      case 30:
        return "trettio";
      case 40:
        return "fyrtio";
      case 50:
        return "femtio";
      case 60:
        return "sextio";
      case 70:
        return "sjuttio";
      case 80:
        return "åttio";
      case 90:
        return "nittio";
    }
  }

  function prefix(number) {
    n = parseInt(number.length - 1);

    let output = ` ${digitAsText(number.charAt(0))} `;
    switch (n) {
      case 2:
        output += "hundra";
        break;
      case 3:
        output += "tusen";
        break;
      case 6:
        if (number.charAt(0) === "1") {
          output += "miljon";
        } else {
          output += "miljoner";
        }
        break;
      case 9:
        if (number.charAt(0) === "1") {
          output += "miljard";
        } else {
          output += "miljarder";
        }
        break;
    }
    return `${output} `;
  }

  function numberToText() {
    let text = "";
    let intNumber;

    // loop
    /*     for (let i = 0; i < number.length; ++i) {
      text += digitAsText(number.charAt(i)) + " ";
    } */

    // reverse loop
    /*     for (let i = number.length - 1; i > -1; --i) {
      text += digitAsText(number.charAt(i)) + " ";
    }
 */

    // use modulo

    // number = "1234"
    // mindre än 21? nej.
    // lägger "fyra" i stack
    // ändrar number till "1230"
    // är 3 === 0? nej.
    // lägger till "trettio" i stack
    // ändrar number till "1200"
    // är 4 === 0? nej.
    // lägger till "två hundra" i stack
    // ändrar number till "1000"
    // är 1 === 0? nej.
    // lägger till "ett tusen" i stack
    // poppar stacken till let text -> text = "ett tusen två hundra trettiofyra"

    // text += prefix(number);

    if (parseInt(number) < 20) {
      text = digitAsText(number);
    } else {
      let stack = [];

      if (number.charAt(number.length - 1) != 0) {
        stack.push(digitAsText(number.charAt(number.length - 1)));
      }

      intNumber = parseInt(number.substring(number.length-2)) - parseInt(number.charAt(number.length - 1));
      stack.push(tenAsText(intNumber));

      stack.push(prefix(number.substring(1)));
      stack.push(prefix(number.substring(0)));  
      

      
      while (stack.length !== 0) {
        text += stack.pop();
      }
    }

    /* if (parseInt(number) < 20) {
      text = digitAsText(number);
    } else {
      let stack = [];

      if (number.charAt(number.length - 1) != 0) {
        stack.push(digitAsText(number.charAt(number.length - 1)));
      }
      intNumber = parseInt(number) - parseInt(number.charAt(number.length - 1));
      stack.push(tenAsText(intNumber));

      while (stack.length !== 0) {
        text += stack.pop();
      }
    } */

    $("#number-text").html(text);
  }
});
