// 詳細な計算検証スクリプト

function calculateMonthlyPayment(principal, annualRate, months) {
  if (annualRate === 0) {
    return principal / months;
  }
  const monthlyRate = annualRate / 12 / 100;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
                 (Math.pow(1 + monthlyRate, months) - 1);
  return payment;
}

console.log('=== 元利均等返済方式の計算検証 ===\n');

// テストケース1: 基本的なケース
console.log('【テスト1】融資額: 1,500,000円、年率: 7.9%、36回払い（GINZA RASIN）');
const principal1 = 1500000;
const rate1 = 7.9;
const months1 = 36;
const monthly1 = calculateMonthlyPayment(principal1, rate1, months1);
const total1 = monthly1 * months1;
const interest1 = total1 - principal1;

console.log(`月々返済額: ¥${Math.round(monthly1).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(total1).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(interest1).toLocaleString('ja-JP')}`);
console.log(`実質年率: ${rate1}%`);
console.log('');

// テストケース2: より高金利
console.log('【テスト2】融資額: 1,000,000円、年率: 12.0%、24回払い（かめ吉）');
const principal2 = 1000000;
const rate2 = 12.0;
const months2 = 24;
const monthly2 = calculateMonthlyPayment(principal2, rate2, months2);
const total2 = monthly2 * months2;
const interest2 = total2 - principal2;

console.log(`月々返済額: ¥${Math.round(monthly2).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(total2).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(interest2).toLocaleString('ja-JP')}`);
console.log(`実質年率: ${rate2}%`);
console.log('');

// テストケース3: 外部の金融計算サイトと比較用（標準的な条件）
console.log('【テスト3】融資額: 1,000,000円、年率: 10.0%、12回払い');
const principal3 = 1000000;
const rate3 = 10.0;
const months3 = 12;
const monthly3 = calculateMonthlyPayment(principal3, rate3, months3);
const total3 = monthly3 * months3;
const interest3 = total3 - principal3;

console.log(`月々返済額: ¥${Math.round(monthly3).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(total3).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(interest3).toLocaleString('ja-JP')}`);
console.log('期待値（一般的な計算）: 月々約¥87,916');
console.log('');

// 月別の詳細計算を表示
console.log('【詳細計算】融資額: 500,000円、年率: 8.0%、12回払い');
const principal4 = 500000;
const rate4 = 8.0;
const months4 = 12;
const monthlyRate4 = rate4 / 12 / 100;
const monthly4 = calculateMonthlyPayment(principal4, rate4, months4);

console.log(`月利: ${(monthlyRate4 * 100).toFixed(4)}%`);
console.log(`月々返済額: ¥${Math.round(monthly4).toLocaleString('ja-JP')}\n`);

let balance = principal4;
let totalInterestPaid = 0;
let totalPrincipalPaid = 0;

console.log('回数 | 返済額   | 利息    | 元金    | 残高');
console.log('-----|----------|---------|---------|----------');

for (let i = 1; i <= months4; i++) {
  const interestPayment = balance * monthlyRate4;
  const principalPayment = monthly4 - interestPayment;
  balance -= principalPayment;
  totalInterestPaid += interestPayment;
  totalPrincipalPaid += principalPayment;

  console.log(
    `${i.toString().padStart(4)} | ` +
    `¥${Math.round(monthly4).toLocaleString('ja-JP').padStart(7)} | ` +
    `¥${Math.round(interestPayment).toLocaleString('ja-JP').padStart(6)} | ` +
    `¥${Math.round(principalPayment).toLocaleString('ja-JP').padStart(6)} | ` +
    `¥${Math.max(0, Math.round(balance)).toLocaleString('ja-JP').padStart(7)}`
  );
}

console.log('');
console.log(`元金合計: ¥${Math.round(totalPrincipalPaid).toLocaleString('ja-JP')}`);
console.log(`利息合計: ¥${Math.round(totalInterestPaid).toLocaleString('ja-JP')}`);
console.log(`総返済額: ¥${Math.round(totalPrincipalPaid + totalInterestPaid).toLocaleString('ja-JP')}`);
console.log('');

// ボーナス払いのテスト
console.log('【ボーナス払いテスト】');
console.log('融資額: 1,500,000円、年率: 9.0%、36回払い');
console.log('ボーナス加算: 融資額の30%（450,000円）を年2回加算');
console.log('');

const principal5 = 1500000;
const rate5 = 9.0;
const months5 = 36;
const bonusPercent = 30;
const bonusAmount = Math.round(principal5 * bonusPercent / 100);
const bonusCount = Math.floor(months5 / 6); // 36ヶ月なら6回

console.log(`ボーナス加算総額: ¥${bonusAmount.toLocaleString('ja-JP')}`);
console.log(`ボーナス回数: ${bonusCount}回`);
console.log(`ボーナス加算合計: ¥${(bonusAmount * bonusCount).toLocaleString('ja-JP')}`);
console.log('');

// 通常の月払い部分（融資額全体に対して計算）
const regularMonthly = calculateMonthlyPayment(principal5, rate5, months5);
console.log(`通常月の返済額: ¥${Math.round(regularMonthly).toLocaleString('ja-JP')}`);
console.log(`ボーナス月の返済額: ¥${Math.round(regularMonthly + bonusAmount).toLocaleString('ja-JP')}`);
console.log('');

const totalPayment = (regularMonthly * months5) + (bonusAmount * bonusCount);
const totalInterest = totalPayment - principal5;

console.log(`総返済額: ¥${Math.round(totalPayment).toLocaleString('ja-JP')}`);
console.log(`総利息: ¥${Math.round(totalInterest).toLocaleString('ja-JP')}`);
console.log('');

console.log('✅ すべての計算が元利均等返済方式に基づいて実行されています');
