function log(num)
  {return (Math.log(num)/2.302585092994046)}

function SLog(num)
{
  if (num < 1) {return (num - 1)}
  else if (num < 10) {return log(num)}
  else if (num < 1e10) {return (log(log(num))+1)}
  else if (num >= 1e10) {return (log(log(log(num)))+2)}
}

function UndoSLog(num)
{
  if (num < 0) {return (parseFloat((num + 1).toFixed[4]))}
  else if (num < 1) {return (parseFloat((10 ** num).toFixed[3]))}
  else if (num < (1+log(3))) {return (parseFloat((10 ** (10 ** (num % 1))).toFixed[2]))}
  else if (num < (1+log(6))) {return (parseFloat((10 ** (10 ** (num % 1))).toFixed[0]))}
  else if (num < 2) 
    {base = (parseFloat((10 ** ((10 ** (num % 1)) % 1)).toFixed[2]))
    exp = Math.floor(10**(num % 1))
    return (String(base) + "e" + String(exp))}
  else if (num < (2+log(5)))
    {base = (parseFloat(((10 ** (10 ** ((10 ** (num % 1)) % 1)) % 1)).toFixed[2]))
    exp = Math.floor(10**(10**(num % 1)))
    return (String(base) + "e" + String(exp))}
}
