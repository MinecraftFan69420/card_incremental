function log(num){return (Math.log(num)/2.302585092994046)}

function round(num, places) {return ((Math.round((num)/(10 ** places)))*(10 ** places))}
  
function floor(num, places) {return ((Math.floor((num)/(10 ** places)))*(10 ** places))}

function SLog(num) {
  if (num < 1) {return (num - 1)}
  else if (num < 10) {return log(num)}
  else if (num < 1e10) {return (log(log(num))+1)}
  else if (num >= 1e10) {return (log(log(log(num)))+2)}
}

function undoSLog(num){
  if (num < 0) {return (round((num + 1),-4))}
  else if (num < 1) {return (round((10 ** num),-3))}
  else if (num < (1+log(3))) {return (round((10 ** (10 ** (num % 1))),-2))}
  else if (num < (1+log(6))) {return (round((10 ** (10 ** (num % 1))),0))}
  else if (num < 2) {
    base = (floor((10 ** ((10 ** (num % 1)) % 1)), -2)).toFixed(2)
    exp = Math.floor(10**(num % 1))
    return (base + "e" + String(exp))
  }
  else if (num < (2 + log(5))) {
    base = (floor((10 ** ((10 ** (10 ** (num % 1))) % 1)), -2)).toFixed(2)
    exp = Math.floor(10**(10**(num % 1)))
    return (base + "e" + String(exp))
  }
  else if (num < (7 + log(5))) {
    if (num % 1 < log(5)) {
      base = (floor((10 ** ((10 ** (10 ** (num % 1))) % 1)), -2)).toFixed(2)
      exp = Math.floor(10**(10**(num % 1)))
      combined = (base + "e" + String(exp))
      for (let i = 0; i < ((floor(num,0))-2); i++) {combined = "e"+combined}
      return combined
    } else {
      base = (floor((10 ** ((10 ** (num % 1)) % 1)), -2)).toFixed(2)
      exp = Math.floor(10**(num % 1))
      combined = (base + "e" + String(exp))
      for (let i = 0; i < ((floor(num, 0)) - 1); i++) { combined = "e" + combined }; return combined
    }
  } 
  else if (num < 1e10) {base = (floor((10 ** (num % 1)), -3)).toFixed(0); return ("E" + base + "#" + floor(num, 0))}
  else return ("E#"+floor(num,0))
}

function addSLogs(num1, num2) {
  if (num2 > num1) {returned = addSLogs(num2, num1)}
  else 
  {class1 = Math.max(floor(num1,0),-1)
  class2 = Math.max(floor(num2,0),-1)
  PowDif = (num1-num2)
  switch (class2) {
    case -1:
      switch (class1) {
        case -1:
          output = (num1+num2+1)
          if (output > 0) {returned = log(output+1)} else {returned = output}
          break;
        case 0:
          output = log((10**num1)+(num2+1))
          if (output > 1) {returned = (1+log(output))} else {returned = output}
          break;
        case 1:
          output = 1+log(log((10**(10**(num1-1)))+(num2+1)))
          if (output > 2) {returned = 2+log(output-1)} else {returned = output}
          break;
        default:
          returned = num1
          break;}
      break;
     case 0:
       switch (class1) {
         case 0:
           output = log((10**num1)+(10**num2))
           if (output > 1) {returned = (1+log(output))} else {returned = output}
           break;
         case 1:
           output = 1+log(log((10**(10**(num1-1)))+(10**num2)))
           if (output > 2) {returned = 2+log(output-1)} else {returned = output}
           break;
         default:
           returned = num1
           break;}
        break;
     case 1:
       switch (class1) {
         case 1:
           output = 1+log(log((10**(10**(num1-1)))+(10**(10**(num2-1)))))
           if (output > 2) {returned = 2+log(output-1)} else {returned = output}
           break;
         case 2:
           output = 2+log(log((10**(10**(num1-2)))+(log(1+(10**((10**(num2-1))-(10**(10**(num1-2)))))))))
           if (output > 3) {returned = 3+log(output-2)} else {returned = output}
           break;
         default:
           returned = num1
           break;}
       break;
     case 2:
       if (class1 = 2) {
         output = 2+log(log((10**(10**(num1-2)))+(log(1+(10**((10**(10**(num2-2)))-(10**(10**(num1-2)))))))))
         if (output > 3) {returned = 3+log(output-2)} else {returned = output}}
       else {returned = num1}
       break;
     default:
       returned = num1
       break;}
  }
return returned}

function subtractSLogs(num1,num2) { //make sure that num1 is bigger than num2 because this system doesn't support negatives
  class1 = floor(num1,0)
  class2 = floor(num2,0)
  guess = 0
  if (class1 > 2.5) {returned = num1} else {
    guess = -1
    adder = 4
    for (i=0;i<30;i++) {
      adder /= 2
      guess += adder
      if (addSLogs(num2,guess) > num1) {guess -= adder}}
    if (guess === -1) {guess += adder}
    returned = guess}
  return returned}

function multiplySLogs(num1,num2) {
  if (num2 > num1) {runingtot = multiplySLogs(num2,num1)} 
  else {if (floor(num1,0)>3.5) {returned = num1} 
    else {if (num2 > 0) {runingtot = addSLogs(num1-1,num2-1)+1}
      else {if (num1 > 0) {recip = log(1/(num2+1))
        if (recip > 1) {recip = 1+(log(recip))}
        if (recip > 2) {recip = 2+(log(recip-1))}
        runingtot = 1+subtractSLogs(num1-1,recip-1)
        console.log(runingtot + "t")
        if (recip-1 > a-1) {runingtot = 1+subtractSLogs(recip-1,num1-1)
          console.log(runingtot + "t")
          if (runingtot < 1) {returned = (1/(10**(runingtot)))-1}
          else {if (runingtot < 2) {returned = (1/(10**(10**(runingtot-1))))-1}
              else {runingtot = (1/(10**(10**(10**(runingtot-2)))))-1}
            
              }
            }
          } else {returned = ((a+1)*(b+1))-1}
        }  
      }
    }
  return runingtot}

function divideSLogs(num1,num2) {
  if (floor(num1,1)>3.5) {returned = num1} 
    else {if (num2 > 0) {returned = subtractSLogs(num1-1,num2-1)+1
      if (num2>num1) {returned = subtractSLogs(num2-1,num1-1)
        if (returned < 1) {returned = (1/(10**returned))-1}
          else{if (returned < 2) {returned = (1/(10**(10**(returned-1))))-1}
            else{returned = (1/(10**(10**(10**(returned-2)))))-1}
              }
            }
          }
      else {if (num1 > 0) {recip = log(1/(num2+1))
        if (recip > 1) {recip = 1+(log(recip))}
        if (recip > 2) {recip = 2+(log(recip-1))}
        returned = 1+addSLogs(recip-1,num1-1)
            } else {recip = ((a+1)/(b+1))-1
              if (recip > 0) {recip = log(1/(recip+1))}
              if (recip > 1) {recip = 1+(log(recip))}
              if (recip > 2) {recip = 2+(log(recip-1))}
              returned = recip
              }
            } 
          }
  return returned} 

function expSLogs(num1,num2) {
  returned = multiplySLogs(num1-1,num2)+1
  return returned}

function tetrateSLogs(num1,num2) {
  if (num1 === 0) {runingtot = 0} 
  else {powertowerh = num2
       if (num2 === 0) {runingtot = 0}
       else {if (num2 === 1) {runingtot = num1}
            else {runingtot = 0
              do {if (runingtot > 10) {runingtot += powertowerh
                  powertowerh = 0}
                else {runingtot = expSLogs(num1,runingtot)
                    powertowerh -= 1}
              } while (powertowerh >= 1)}}}
  return runingtot} 
