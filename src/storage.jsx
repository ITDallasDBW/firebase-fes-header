useEffect(() => {
  const image = new Image();
  image.src = book.url;
  image.onload = () => {
    setTimeout(() => {
      setCustomSignals(image);
    }, 300);
  };
});
