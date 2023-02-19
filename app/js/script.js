const getDollar = async () => {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD",
    {
      method: "GET",
    }
  );

  if (response.ok) {
    const json = await response.json();
    console.log(json);

    const pDollar = document.querySelector("#dollar");
    pDollar.innerHTML = JSON.stringify(json.USDBRL, null, 2);
  }
};
