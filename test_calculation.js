// Test loan calculation logic
function calculateMonthlyPayment(principal, annualRate, months) {
  if (annualRate === 0) {
    return principal / months;
  }
  const monthlyRate = annualRate / 12 / 100;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                 (Math.pow(1 + monthlyRate, months) - 1);
  return payment;
}

// Test case 1: Standard case
console.log('=== Test Case 1: 融資額 1,000,000円, 年率 10%, 12回払い ===');
const payment1 = calculateMonthlyPayment(1000000, 10, 12);
console.log(`月々返済額: ¥${Math.round(payment1).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(payment1 * 12).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(payment1 * 12 - 1000000).toLocaleString('ja-JP')}`);
console.log('期待値: 月々約¥87,916、総利息約¥54,992');
console.log('');

// Test case 2: GINZA RASIN (7.9%) with 1,500,000 over 36 months
console.log('=== Test Case 2: 商品価格 1,500,000円, 頭金0円, GINZA RASIN 7.9%, 36回 ===');
const payment2 = calculateMonthlyPayment(1500000, 7.9, 36);
console.log(`月々返済額: ¥${Math.round(payment2).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(payment2 * 36).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(payment2 * 36 - 1500000).toLocaleString('ja-JP')}`);
console.log('');

// Test case 3: With down payment
console.log('=== Test Case 3: 商品価格 2,000,000円, 頭金20% (400,000円), 年率8.5%, 48回 ===');
const price3 = 2000000;
const downPayment3 = 400000;
const loanAmount3 = price3 - downPayment3;
const payment3 = calculateMonthlyPayment(loanAmount3, 8.5, 48);
console.log(`融資額: ¥${loanAmount3.toLocaleString('ja-JP')}`);
console.log(`月々返済額: ¥${Math.round(payment3).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(payment3 * 48 + downPayment3).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(payment3 * 48 + downPayment3 - price3).toLocaleString('ja-JP')}`);
console.log('');

console.log('✅ All calculations completed successfully!');
