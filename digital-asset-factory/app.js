const $ = (id) => document.getElementById(id);
const money = (n) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number.isFinite(n)?n:0);
const pct = (n) => `${(Number.isFinite(n)?n:0).toFixed(1)}%`;
const num = (id) => Math.max(0, Number($(id)?.value || 0));

function saveInputs(){
  const values={};
  document.querySelectorAll('input[type="number"]').forEach(el=>values[el.id]=el.value);
  localStorage.setItem('spt-mvp-values',JSON.stringify(values));
}
function loadInputs(){
  try{
    const values=JSON.parse(localStorage.getItem('spt-mvp-values')||'{}');
    Object.entries(values).forEach(([id,value])=>{if($(id)) $(id).value=value});
  }catch{}
}

function quick(){
  const cost=num('quickCost');
  const margin=Math.min(num('quickMargin'),95)/100;
  const price=margin>=1?0:cost/(1-margin);
  $('quickPrice').textContent=money(price);
  $('quickNote').textContent=`At ${(margin*100).toFixed(1)}% margin, ${money(price-cost)} remains before tax.`;
}

function quote(){
  const materials=num('pMaterials');
  const hours=num('pHours');
  const labor=num('pLabor');
  const other=num('pOther');
  const overhead=num('pOverhead');
  const margin=Math.min(num('pMargin'),95)/100;
  const fee=Math.min(num('pFee'),20)/100;
  const minimum=num('pMinimum');
  const cost=materials+(hours*labor)+other+overhead;
  const denominator=1-margin-fee;
  const raw=denominator>0?cost/denominator:0;
  const price=Math.max(raw,minimum);
  const feeCost=price*fee;
  const profit=price-cost-feeCost;
  $('rCost').textContent=money(cost);
  $('rQuote').textContent=money(price);
  $('rProfit').textContent=money(profit);
  $('rPerHour').textContent=money(hours>0?price/hours:0);
}

function labor(){
  const wage=num('lWage');
  const burden=num('lBurden')/100;
  const paid=Math.max(1,num('lPaidHours'));
  const util=Math.min(Math.max(num('lUtil'),1),100)/100;
  const overhead=num('lOverhead');
  const margin=Math.min(num('lMargin'),95)/100;
  const annualLabor=wage*paid*(1+burden);
  const billableHours=paid*util;
  const breakEven=(annualLabor+overhead)/billableHours;
  const rate=breakEven/(1-margin);
  $('lAnnual').textContent=money(annualLabor);
  $('lBreakEven').textContent=money(breakEven);
  $('lRate').textContent=money(rate);
}

function marginCalc(){
  const cost=num('mCost');
  const markup=num('mMarkup')/100;
  const price=cost*(1+markup);
  const profit=price-cost;
  const margin=price>0?profit/price*100:0;
  $('mPrice').textContent=money(price);
  $('mProfit').textContent=money(profit);
  $('mMargin').textContent=pct(margin);
}

function jobProfit(){
  const price=num('jPrice');
  const feeRate=Math.min(num('jFee'),20)/100;
  const base=num('jMaterials')+num('jLabor')+num('jOther')+num('jOverhead');
  const fee=price*feeRate;
  const total=base+fee;
  const profit=price-total;
  const margin=price>0?profit/price*100:0;
  const markup=total>0?profit/total*100:0;
  $('jCost').textContent=money(total);
  $('jProfit').textContent=money(profit);
  $('jProfit').style.color=profit<0?'var(--danger)':'var(--text)';
  $('jMargin').textContent=pct(margin);
  $('jMarkup').textContent=pct(markup);
}

function calculateAll(){quick();quote();labor();marginCalc();jobProfit();saveInputs()}

document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tool-panel').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  $(`tab-${btn.dataset.tab}`).classList.add('active');
}));

document.querySelectorAll('input[type="number"]').forEach(el=>el.addEventListener('input',calculateAll));
loadInputs();
calculateAll();
