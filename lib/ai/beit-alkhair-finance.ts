/**
 * 📈 BEIT_AL_KHAIR_FINANCIAL_ENGINE v1.0
 * Reducing Balance Amortization Protocol
 */

export interface LoanParameters {
    totalPrice: number
    areaSqm: number
    downPaymentPercent: number // 0.40
    annualInterestRate: number // 0.10
    years: number // 1, 2, or 3
}

export interface AmortizationResult {
    pricePerSqm: number
    downPayment: number
    principal: number
    monthlyPayment: number
    quarterlyPayment: number
    totalInterest: number
    totalPayment: number
}

export function calculateReducingBalance(params: LoanParameters): AmortizationResult {
    const { totalPrice, areaSqm, downPaymentPercent, annualInterestRate, years } = params

    const pricePerSqm = totalPrice / areaSqm
    const downPayment = totalPrice * downPaymentPercent
    const principal = totalPrice - downPayment
    
    const monthlyRate = annualInterestRate / 12
    const numberOfMonths = years * 12
    
    // 🧮 Annuity Formula: M = [P * i * (1 + i)^n] / [(1 + i)^n - 1]
    let monthlyPayment = 0
    if (annualInterestRate === 0) {
        monthlyPayment = principal / numberOfMonths
    } else {
        monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
                         (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
    }

    const totalPayment = (monthlyPayment * numberOfMonths) + downPayment
    const totalInterest = totalPayment - totalPrice

    return {
        pricePerSqm: Math.round(pricePerSqm),
        downPayment: Math.round(downPayment),
        principal: Math.round(principal),
        monthlyPayment: Math.round(monthlyPayment),
        quarterlyPayment: Math.round(monthlyPayment * 3),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment)
    }
}

export const BEIT_AL_KHAIR_RULES = {
    DOWN_PAYMENT: 0.40,
    ANNUAL_INTEREST: 0.10,
    MAX_YEARS: 3
}
