document.getElementById('convertBtn').addEventListener('click', convertCurrency);

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const result = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    result.innerText = '⚠️ Please enter a valid amount.';
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();

    if (!data.rates[to]) {
      result.innerText = '❌ Conversion not available.';
      return;
    }

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    result.innerHTML = `
      💰 ${amount} ${from} = <strong>${converted} ${to}</strong><br>
      🔁 Exchange Rate: 1 ${from} = ${rate.toFixed(2)} ${to}
    `;
  } catch (err) {
    result.innerText = '🚫 Error fetching data. Try again later.';
  }
}
