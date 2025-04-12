function log(num){return (Math.log(num)/2.302585092994046)}

function round(num, places) {return ((Math.round((num)/(10 ** places)))*(10 ** places))}
  
function floor(num, places) {return ((Math.floor((num)/(10 ** places)))*(10 ** places))}

function SLog(num) {
  if (num < 1) {return (num - 1)}
  else if (num < 10) {return log(num)}
  else if (num < 1e10) {return (log(log(num))+1)}
  else if (num >= 1e10) {return (log(log(log(num)))+2)}
}

function UndoSLog(num){
  if (num < 0) {return (round((num + 1),-4))}
  else if (num < 1) {return (round((10 ** num)),-3)}
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

function addSLogs(num1, num2)
{
  if (num2 > num1) {addSLog(num2, num1)}
  else 
  {class1 = Math.max(floor(num1,0),-1)
  class2 = Math.max(floor(num2,0),-1)
  PowDif = (num1-num2)
  Switch (class2) 
    {case -1:
      Switch (class1) {
        case -1:
          output = (num1+num2+1)
          if (output > 0) {return log(output+1)} else {return output}
          break;
        case 0:
          output = log((10**num1)+(num2+1))
          if (output > 1) {return (1+log(output))} else {return output}
          break;
        case 1:
          output = 1+log(log((10**(10**(num1-1)))+(num2+1)))
          if (output > 2) (return 2+log(output-1)) else {return output}
          break;
        default:
          return num1
          break;}
      break;
     case 0:
       Switch (class1) {
         case 0:
           output = log((10**num1)+(10**num2))
           if (output > 1) {return (1+log(output))} else {return output}
           break;
         case 1:
           output = 1+log(log((10**(10**(num1-1)))+(10**num2)))
           if (output > 2) {return 2+log(output-1)} else {return output}
           break;
         default:
           return num1
           break;}
        break;
     case 1:
       Switch (class1) {
         case 1:
           output = 1+log(log((10**(10**(num1-1)))+(10**(10**(num2-1)))))
           if (output > 2) {return 2+log(output-1)} else {return output}
           break;
         case 2:
           output = 2+log(log((10**(10**(num1-2)))+(log(1+(10**((10**(num2-1))-(10**(10**(num1-2)))))))))
           if (output > 3) {return 3+log(output-2)} else {return output}
           break;
         default:
           return num1
           break;}
       break;
     case 2:
       if (class1 = 2) {
         output = 2+log(log((10**(10**(num1-2)))+(log(1+(10**((10**(10**(num2-2)))-(10**(10**(num1-2)))))))))
         if (output > 3) {return 3+log(output-2)} else {return output}}
       else {return num1}
       break;
     default:
       return num1
       break;}
  }
}
