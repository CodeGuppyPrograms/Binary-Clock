// #SKETCHNAME Binary BCD Clock
const colors = {
    ledOn : "Lime",
    ledOff : "Bisque",
    pnlHours : "SandyBrown",
    pnlMinutes : "Chocolate",
    pnlSeconds : "Maroon",
    background : "BlanchedAlmond",
    instructions : "Black"
}

const dotSize = 35;

var showNumbers = false;

noStroke();
background(colors.background);


function loop()
{
    clear();
    displayClock(100, 500);
}

function keyPressed()
{
    if (key.toLowerCase() === "x")
    {
        showNumbers = !showNumbers;
    }
}

function displayClock(x, y)
{
    displayFrame(x, y);
    displayTime(x + dotSize * 1.5, y - dotSize * 1.5);
}

function displayTime(x, y)
{
    var s = getTimeAsString();
    
    var bits = [2, 4, 3, 4, 3, 4];
    
    if (s.length !== 6)
        return;
        
    for(var i = 0; i < s.length; i++)
    {
        var n = parseInt(s[i]);
        displayNumber(n, bits[i], x + i * dotSize * 3, y);
    }
    
    if (!showNumbers)
    {
        displayDigitalTime(s, x, y);
    }
}

// Display the number as a series of dots (in binary)
function displayNumber(number, bits, x, y)
{
    var s = numberToBinary(number, bits);
    
    if (bits !== s.length)
        return;
    
    for(var i = 0; i < bits; i++)
    {
        var bit = s[bits - i - 1];
        
        var ledY = y - i * dotSize * 3;
        
        fill(bit === "1" ? colors.ledOn : colors.ledOff);
        circle(x, ledY, dotSize);
        
        if (showNumbers)
        {
            fill(0);
            text(parseInt(bit) * pow(2, i), x, ledY);
        }
    }
}

// Converts the number to a string of specified length
function numberToBinary(number, bits)
{
    var s = number.toString(2);
    
    if (s.length <= bits)
        s = s.padStart(bits, "0");
    else
        s = "".padStart(bits, "1");

    return s;    
}

// Returns the current time as a 6 character string
function getTimeAsString()
{
    var h = hour().toString().padStart(2, "0");
    var m = minute().toString().padStart(2, "0");
    var s = second().toString().padStart(2, "0");
    
    return h + m + s;
}

// Display the clock frame
function displayFrame(x, y)
{
    var w = 6 * dotSize;
    var h = 12 * dotSize;
    var topY = y - h;

    fill(colors.pnlHours);
    rect(x, topY, w, h);

    fill(colors.pnlMinutes);
    rect(x + w, topY, w, h);

    fill(colors.pnlSeconds);
    rect(x + 2 * w, topY, w, h);
    
    displayInstructions(x, topY, w, h);
}

// Display instructions...
function displayInstructions(x, topY, w, h)
{
    fill(colors.instructions);
    textAlign(CENTER, CENTER);
    
    text("Hours", x + w * 0.5, topY - 20);
    text("Minutes", x + w * 1.5, topY - 20);
    text("Seconds", x + w * 2.5, topY - 20);
    
    if(showNumbers)
    {
		text("8", x - 20, topY + dotSize * 1.5);
		text("4", x - 20, topY + dotSize * 4.5);
		text("2", x - 20, topY + dotSize * 7.5);
		text("1", x - 20, topY + dotSize * 10.5);

        text("Tens", x + w * 0.25, topY + h + 20);
        text("Units", x + w * 0.75, topY + h + 20);
    }
    
    text("Binary BCD clock. Press 'x' key to toggle explanations.", width / 2, height - 20);
}

function displayDigitalTime(s, x, y)
{
    textAlign(CENTER, CENTER);
    fill(colors.instructions);
    
    for(var i = 0; i < s.length; i++)
    {
        var digitX = x + i* dotSize * 3;
        text(s[i], digitX, y + dotSize * 1.5 + 20);
    }
}
