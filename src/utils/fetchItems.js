async function shoppingItems() {
  try {
    const result = await fetch("https://fakestoreapi.com/products");

    if (!result.ok) {
      throw new Error(`Response Status: ${result.status}`);
    }

    const items = await result.json();
    return { data: items };
  } catch (err) {
    console.error("Fetch failed: ", err);
    throw new Error(err);
  }
}

export default shoppingItems;
