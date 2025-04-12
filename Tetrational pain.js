function SLog(num)
{
  if (num < 1) {return (num - 1)}
  else if (num >= 1 && num < 10) {return math.log(num)}
  else if (num >= 10 && num < 1e10) {return (math.log(math.log(num))+1)}
  else if (num >= 1e10) {return (math.log(math.log(math.log(num)))+2)}
}
