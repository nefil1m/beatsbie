export const isMacLike = (navigator: Navigator) =>
  /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
