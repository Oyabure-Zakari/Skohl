function formatMessageCount(count: number) {
  if (count < 1000) return count.toString();
  if (count < 10000) return (count / 1000).toFixed(1) + "k";
  if (count < 1000000) return Math.round(count / 1000) + "k";
  return (count / 1000000).toFixed(1) + "M";
}

export default formatMessageCount;
