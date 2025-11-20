// 修正後のボーナス払い計算を検証

function calculateMonthlyPayment(principal, annualRate, months) {
  if (annualRate === 0) {
    return principal / months;
  }
  const monthlyRate = annualRate / 12 / 100;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                 (Math.pow(1 + monthlyRate, months) - 1);
  return payment;
}

console.log('=== 修正後のボーナス払い計算テスト ===\n');

// テストケース
const loanAmount = 1500000;
const annualRate = 9.0;
const months = 36;
const bonusPercent = 30;
const bonusCount = Math.floor(months / 6); // 6回

console.log(`【条件】`);
console.log(`融資額: ¥${loanAmount.toLocaleString('ja-JP')}`);
console.log(`年率: ${annualRate}%`);
console.log(`返済回数: ${months}回`);
console.log(`ボーナス払い割合: ${bonusPercent}%`);
console.log(`ボーナス回数: ${bonusCount}回`);
console.log('');

// ボーナス払い分の元金を計算
const bonusPrincipal = Math.round(loanAmount * bonusPercent / 100);
// 月払い分の元金を計算
const monthlyPrincipal = loanAmount - bonusPrincipal;

console.log(`【元金の分割】`);
console.log(`月払い分の元金: ¥${monthlyPrincipal.toLocaleString('ja-JP')}`);
console.log(`ボーナス払い分の元金: ¥${bonusPrincipal.toLocaleString('ja-JP')}`);
console.log('');

// 月払い分を元利均等で計算
const monthlyPayment = calculateMonthlyPayment(monthlyPrincipal, annualRate, months);

// ボーナス払い分を元利均等で計算してから、ボーナス回数で割る
const bonusTotalPayment = calculateMonthlyPayment(bonusPrincipal, annualRate, months) * months;
const bonusAmount = Math.round(bonusTotalPayment / bonusCount);

console.log(`【返済額の計算】`);
console.log(`月々の返済額（通常月）: ¥${Math.round(monthlyPayment).toLocaleString('ja-JP')}`);
console.log(`ボーナス月の加算額: ¥${bonusAmount.toLocaleString('ja-JP')}`);
console.log(`ボーナス月の返済額合計: ¥${(Math.round(monthlyPayment) + bonusAmount).toLocaleString('ja-JP')}`);
console.log('');

// 総返済額を計算
const totalPayment = (monthlyPayment * months) + (bonusAmount * bonusCount);
const totalInterest = totalPayment - loanAmount;

console.log(`【総額】`);
console.log(`総返済額: ¥${Math.round(totalPayment).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(totalInterest).toLocaleString('ja-JP')}`);
console.log(`実質年率: ${annualRate}%`);
console.log('');

// 比較：ボーナス払いなしの場合
const normalPayment = calculateMonthlyPayment(loanAmount, annualRate, months);
const normalTotal = normalPayment * months;
const normalInterest = normalTotal - loanAmount;

console.log(`【比較：ボーナス払いなし】`);
console.log(`月々の返済額: ¥${Math.round(normalPayment).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(normalTotal).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(normalInterest).toLocaleString('ja-JP')}`);
console.log('');

console.log(`【差額】`);
console.log(`総返済額の差: ¥${Math.round(Math.abs(totalPayment - normalTotal)).toLocaleString('ja-JP')}`);
console.log(`(ボーナス払いの方が${totalPayment > normalTotal ? '多い' : '少ない'})`);
console.log('');

// 検証：元金が正しく返済されるか
console.log(`【検証】`);
const calculatedPrincipal = Math.round(totalPayment - totalInterest);
console.log(`計算上の元金: ¥${calculatedPrincipal.toLocaleString('ja-JP')}`);
console.log(`実際の融資額: ¥${loanAmount.toLocaleString('ja-JP')}`);
console.log(`差額: ¥${Math.abs(calculatedPrincipal - loanAmount).toLocaleString('ja-JP')}`);
console.log(calculatedPrincipal === loanAmount ? '✅ 正しく計算されています' : '⚠️ 計算に誤差があります');
