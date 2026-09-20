import "./App.css";
import { useState } from "react";

function App() {
  const menus = [
    { id: 1, name: "아메리카노", price: 4500,  image: "/images/americano.jpg" },
    { id: 2, name: "녹차라테", price: 5000, image: "/images/matcha.png" },
    { id: 3, name: "딸기 스무디", price: 5500, image: "/images/strawberry.jpg" },
  ];


  const [cart, setCart] = useState<
    { id: number; name: string; price: number; quantity: number }[]
  >([]);

  function addToCart(menu: { id: number; name: string; price: number }) {
    setCart((currentCart) => {
      const alreadyInCart = currentCart.find((item) => item.id === menu.id);
      if (alreadyInCart) {
        return currentCart.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...menu, quantity: 1 }];
    });
  }

  function increaseQuantity(id: number) {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    ),
  );
}

function decreaseQuantity(id: number) {
  setCart((currentCart) => {
    const targetItem = currentCart.find((item) => item.id === id);

    if (!targetItem) {
      return currentCart;
    }

    if (targetItem.quantity === 1) {
      return currentCart.filter((item) => item.id !== id);
    }

    return currentCart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
  });
}

const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
);

function handleOrder() {
  alert("주문이 완료되었습니다!");
  setCart([]);
}

  return (
    <main>
      <h1>미니 카페</h1>

      <section>
        <h2>메뉴</h2>

        {menus.map((menu) => (
          <article key={menu.id}>
            <h3>{menu.name}</h3>
            <img src={menu.image} alt={menu.name} />
            <p>{menu.price}원</p>
            <button onClick={() => addToCart(menu)}>장바구니에 담기</button>
          </article>
        ))}
      </section>

      <section>
        <h2>장바구니</h2>
        {cart.length === 0 ? (
          <p>아직 담긴 상품이 없습니다.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span className="item-name">{item.name}</span>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}개</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </li>
            ))}
          </ul>
        )}
        <p>총 금액: {totalPrice}원</p>
        <button disabled={cart.length === 0} onClick={handleOrder}>주문하기</button>
      </section>
    </main>
  );
}

export default App;