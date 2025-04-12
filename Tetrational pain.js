function log(num)
  {return (Math.log(num)/2.302585092994046)}

function round(num, places)
  {return ((Math.round((num)/(10 ** places)))*(10 ** places))}
  
function floor(num, places)
  {return ((Math.floor((num)/(10 ** places)))*(10 ** places))}

function SLog(num)
{
  if (num < 1) {return (num - 1)}
  else if (num < 10) {return log(num)}
  else if (num < 1e10) {return (log(log(num))+1)}
  else if (num >= 1e10) {return (log(log(log(num)))+2)}
}

function UndoSLog(num)
{
  if (num < 0) {return (round((num + 1),-4))}
  else if (num < 1) {return (round((10 ** num)),-3)}
  else if (num < (1+log(3))) {return (round((10 ** (10 ** (num % 1))),-2))}
  else if (num < (1+log(6))) {return (round((10 ** (10 ** (num % 1))),0))}
  else if (num < 2) 
    {base = (floor((10 ** ((10 ** (num % 1)) % 1)),-2)).toFixed(2)
    exp = Math.floor(10**(num % 1))
    return (base + "e" + String(exp))}
  else if (num < (2+log(5)))
    {base = (floor((10**((10**(10**(num%1)))%1)),-2)).toFixed(2)
    exp = Math.floor(10**(10**(num % 1)))
    return (base + "e" + String(exp))}
  else if (num < (7+log(5)))
  {if (num%1 < log(5))
      {base = (floor((10**((10**(10**(num%1)))%1)),-2)).toFixed(2)
      exp = Math.floor(10**(10**(num % 1)))
      combined = (base + "e" + String(exp))
      for (let i = 0; i < ((floor(num,0))-2); i++) 
        {combined = "e"+combined}
      return combined} 
    else
      {base = (floor((10 ** ((10 ** (num % 1)) % 1)),-2)).toFixed(2)
      exp = Math.floor(10**(num % 1))
      combined = (base + "e" + String(exp))
      for (let i = 0; i < ((floor(num,0))-1); i++) 
        {combined = "e"+combined}
      return combined}}
  else if (num < 1e10)
    {base = (floor((10**(num%1)),-3)).toFixed(0)
     return ("E" + base + "#" + floor(num,0))}
  else 
    {return ("E#"+floor(num,0))}
  }
