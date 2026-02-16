document.getElementById('basic_salary').addEventListener("keyup", grossPay);
document.getElementById('house_allowance').addEventListener("keyup", grossPay);
document.getElementById('statutory_contribution').addEventListener("keyup", grossPay);

// Set current year
var year = new Date().getFullYear();
document.getElementById("current_year").innerHTML = year;

var idArray = ["basic_salary", "house_allowance", "statutory_contribution", "submit_button"];

function focusNext(e) {
    try {
        for (var i = 0; i < idArray.length; i++) {
            if (e.keyCode === 13 && e.target.id === idArray[i]) {
                document.querySelector(`#${idArray[i + 1]}`).focus();
            }
        }
    } catch (error) {}
}

function grossPay(e) {
    var salary = document.getElementById('basic_salary').value;
    var allowance = document.getElementById('house_allowance').value;
    var statutoryContribution = document.getElementById('statutory_contribution').value;

    var basic_salary = parseFloat(salary) || 0;
    var allowance = parseFloat(allowance) || 0;
    var statutoryContribution = parseFloat(statutoryContribution) || 0;

    // Gross pay
    var gross_pay = basic_salary + allowance;
    document.getElementById('gross_pay').innerHTML = gross_pay.toFixed(2);

    // Napsa (capped at 26840)
    var napsa;
    if (gross_pay < 26840.01) {
        napsa = gross_pay * 0.05;
    } else {
        napsa = 1342;
    }
    document.getElementById('napsa').innerHTML = napsa.toFixed(2);

    // National health insurance (1% of basic salary)
    var insurance = basic_salary * 0.01;
    document.getElementById('insurance').innerHTML = insurance.toFixed(2);

    // Total Contributions
    var totalContributions = statutoryContribution + napsa + insurance;
    document.getElementById('total_contributions').innerHTML = totalContributions.toFixed(2);

    // Total tax deductions (PAYE)
    var totalTaxDeductions;
    if (gross_pay <= 5100) {
        totalTaxDeductions = 0;
    } else if (gross_pay > 5100 && gross_pay <= 7100) {
        totalTaxDeductions = (gross_pay - 5100) * 0.20;
    } else if (gross_pay > 7100 && gross_pay <= 9200) {
        totalTaxDeductions = ((gross_pay - 7100) * 0.30) + (2000 * 0.2);
    } else {
        totalTaxDeductions = ((gross_pay - 9200) * 0.37) + (2000 * 0.2) + (2100 * 0.3);
    }
    document.getElementById('total_tax_deductions').innerHTML = totalTaxDeductions.toFixed(2);

    // Total deductions
    var totalDeductions = totalTaxDeductions + totalContributions;
    document.getElementById('total_deductions').innerHTML = totalDeductions.toFixed(2);

    // Net Salary
    var netSalary = gross_pay - totalDeductions;
    document.getElementById('net_salary').innerHTML = netSalary.toFixed(2);

    // Tax Bands Calculations
    var fourthBand = 0, thirdBand = 0, secondBand = 0, firstBand = 0;
    var band1 = 0, band2 = 0, band3 = 0, band4 = 0;

    // Band 1 (0%): First 5100
    if (gross_pay <= 5100) {
        band1 = gross_pay;
        firstBand = 0;
    } else {
        band1 = 5100;
        firstBand = 0;
    }

    // Band 2 (20%): 5100 - 7100
    if (gross_pay > 5100) {
        if (gross_pay <= 7100) {
            band2 = gross_pay - 5100;
            secondBand = band2 * 0.2;
        } else {
            band2 = 2000; // 7100 - 5100
            secondBand = 2000 * 0.2;
        }
    }

    // Band 3 (30%): 7100 - 9200
    if (gross_pay > 7100) {
        if (gross_pay <= 9200) {
            band3 = gross_pay - 7100;
            thirdBand = band3 * 0.3;
        } else {
            band3 = 2100; // 9200 - 7100
            thirdBand = 2100 * 0.3;
        }
    }

    // Band 4 (37%): Above 9200
    if (gross_pay > 9200) {
        band4 = gross_pay - 9200;
        fourthBand = band4 * 0.37;
    }

    // Update DOM with band values
    document.getElementById('band1').innerHTML = band1.toFixed(2);
    document.getElementById('band2').innerHTML = band2.toFixed(2);
    document.getElementById('band3').innerHTML = band3.toFixed(2);
    document.getElementById('band4').innerHTML = band4.toFixed(2);
    
    document.getElementById('first_band').innerHTML = firstBand.toFixed(2);
    document.getElementById('second_band').innerHTML = secondBand.toFixed(2);
    document.getElementById('third_band').innerHTML = thirdBand.toFixed(2);
    document.getElementById('fourth_band').innerHTML = fourthBand.toFixed(2);

    if (e) {
        e.preventDefault();
    }
}

// Initial calculation to display default values
window.onload = function() {
    grossPay();
};