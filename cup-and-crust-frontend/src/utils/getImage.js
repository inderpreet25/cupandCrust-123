const getImage = (name) => {
  try {
    return require(`../assets/${name}`);
  } catch (err) {
    console.error("Image not found:", name);
    return "";
  }
};

export default getImage;
